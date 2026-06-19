/**
 * Graph data builder for Astro content collections.
 *
 * Reads content collections and extracts nodes/edges for the knowledge graph.
 * Handles cross-references between docs and articles.
 *
 * @module lib/graph-data-build
 */

import type { GraphData, GraphNode, GraphEdge } from "./graph-data";
import { GraphDataSchema } from "./graph-data";

/**
 * Minimal frontmatter shape for docs collection.
 */
export interface DocFrontmatter {
  title?: string;
  description?: string;
  tags?: string[];
}

/**
 * Minimal frontmatter shape for articles collection.
 */
export interface ArticleFrontmatter {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  relatedArticles?: string[];
}

/**
 * Minimal page entry for a content collection item.
 */
export interface CollectionEntry {
  id: string;
  slug: string;
  body?: string;
  data: DocFrontmatter | ArticleFrontmatter;
}

/**
 * Result of building graph from collections.
 */
export interface CollectionGraphResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/**
 * Generate a consistent slug from a title.
 *
 * Converts to lowercase, replaces spaces with hyphens,
 * removes special characters, and collapses multiple hyphens.
 *
 * @param title - The page title
 * @returns URL-safe slug
 *
 * @example
 * ```ts
 * generateSlug("Peptide Bond Chemistry") // "peptide-bond-chemistry"
 * generateSlug("Amino Acids & Proteins") // "amino-acids-proteins"
 * ```
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Extract internal links from markdown content.
 *
 * Finds markdown links like [text](url) where the url
 * points to another page in the wiki.
 *
 * @param content - Raw markdown content
 * @returns Array of extracted link targets
 *
 * @example
 * ```ts
 * const links = extractInternalLinks("See [peptide bonds](/learn/peptide-bonds) for more.");
 * // ["/learn/peptide-bonds"]
 * ```
 */
export function extractInternalLinks(content: string): string[] {
  const links: string[] = [];

  // Match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2]!;
    // Skip external links, anchors, and non-page links
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("#") ||
      url.startsWith("mailto:") ||
      url.startsWith("ftp:")
    ) {
      continue;
    }

    // Remove query params and hash
    const cleanUrl = url.split("?")[0]!.split("#")[0]!;

    // Skip empty urls
    if (!cleanUrl || cleanUrl === "/") continue;

    links.push(cleanUrl);
  }

  return links;
}

/**
 * Extract tags from frontmatter.
 *
 * @param frontmatter - Page frontmatter object
 * @returns Array of tags (lowercased, deduplicated)
 *
 * @example
 * ```ts
 * const tags = extractTags({ tags: ["amino-acids", "beginner"] });
 * // ["amino-acids", "beginner"]
 * ```
 */
export function extractTags(
  frontmatter: DocFrontmatter | ArticleFrontmatter,
): string[] {
  const rawTags = frontmatter.tags ?? [];
  const seen = new Set<string>();

  for (const tag of rawTags) {
    const normalized = tag.toLowerCase().trim();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
    }
  }

  return Array.from(seen);
}

/**
 * Determine the group for a page based on its frontmatter.
 *
 * @param frontmatter - Page frontmatter
 * @param collection - Collection type ("docs" or "articles")
 * @returns Group name
 */
function getGroup(
  frontmatter: DocFrontmatter | ArticleFrontmatter,
  collection: "docs" | "articles",
): string {
  // Use category if available
  if ("category" in frontmatter && frontmatter.category) {
    return frontmatter.category.toLowerCase();
  }

  // Use first tag if available
  const tags = extractTags(frontmatter);
  if (tags.length > 0) {
    return tags[0]!;
  }

  // Default to collection type
  return collection;
}

/**
 * Normalize a link target to a slug.
 *
 * Handles various link formats:
 * - Absolute paths: /learn/peptide-bonds -> peptide-bond
 * - Relative paths: ./peptide-bonds -> peptide-bonds
 * - Just slugs: peptide-bonds -> peptide-bonds
 *
 * @param link - The link target from markdown
 * @returns Normalized slug
 */
function normalizeLinkToSlug(link: string): string {
  // Remove leading slash if present
  let slug = link.replace(/^\//, "");

  // Remove ./ or ../ prefixes
  slug = slug.replace(/^\.\//, "");
  slug = slug.replace(/^\.\.\//, "");

  // Remove .md extension if present
  slug = slug.replace(/\.md$/, "");

  // Remove trailing slashes
  slug = slug.replace(/\/$/, "");

  return slug;
}

/**
 * Build graph data from docs and articles content collections.
 *
 * Each page becomes a node. Links between pages create edges.
 * Cross-references between docs and articles are supported.
 *
 * @param docs - Array of docs collection entries
 * @param articles - Array of articles collection entries
 * @returns GraphData conforming to GraphDataSchema
 *
 * @example
 * ```ts
 * import { getCollection } from "astro:content";
 *
 * const docs = await getCollection("docs");
 * const articles = await getCollection("articles");
 * const graph = buildGraphFromCollections(docs, articles);
 * ```
 */
export function buildGraphFromCollections(
  docs: readonly CollectionEntry[],
  articles: readonly CollectionEntry[],
): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const slugToId = new Map<string, string>();

  // Process docs
  for (const doc of docs) {
    const title = doc.data.title ?? doc.slug;
    const slug = doc.slug.replace(/\/index$/, ""); // Remove index suffix
    const group = getGroup(doc.data, "docs");

    nodes.push({
      id: doc.id,
      label: title,
      group,
      degree: 0,
    });

    slugToId.set(slug, doc.id);
  }

  // Process articles
  for (const article of articles) {
    const title = article.data.title ?? article.slug;
    const slug = article.slug;
    const group = getGroup(article.data, "articles");

    nodes.push({
      id: article.id,
      label: title,
      group,
      degree: 0,
    });

    slugToId.set(slug, article.id);
  }

  // Build edges from links
  const edgeSet = new Set<string>();

  // Process doc links
  for (const doc of docs) {
    const content = doc.body ?? "";
    const links = extractInternalLinks(content);

    for (const link of links) {
      const targetSlug = normalizeLinkToSlug(link);
      const targetId = slugToId.get(targetSlug);

      if (!targetId || targetId === doc.id) continue;

      const key = [doc.id, targetId].sort().join("::");
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);

      edges.push({ source: doc.id, target: targetId, weight: 1 });
    }

    // Also process relatedArticles in frontmatter
    if ("relatedArticles" in doc.data && doc.data.relatedArticles) {
      for (const relatedSlug of doc.data.relatedArticles) {
        const targetId = slugToId.get(relatedSlug);
        if (!targetId || targetId === doc.id) continue;

        const key = [doc.id, targetId].sort().join("::");
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);

        edges.push({ source: doc.id, target: targetId, weight: 1 });
      }
    }
  }

  // Process article links
  for (const article of articles) {
    const content = article.body ?? "";
    const links = extractInternalLinks(content);

    for (const link of links) {
      const targetSlug = normalizeLinkToSlug(link);
      const targetId = slugToId.get(targetSlug);

      if (!targetId || targetId === article.id) continue;

      const key = [article.id, targetId].sort().join("::");
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);

      edges.push({ source: article.id, target: targetId, weight: 1 });
    }

    // Also process relatedArticles in frontmatter
    if ("relatedArticles" in article.data && article.data.relatedArticles) {
      for (const relatedSlug of article.data.relatedArticles) {
        const targetId = slugToId.get(relatedSlug);
        if (!targetId || targetId === article.id) continue;

        const key = [article.id, targetId].sort().join("::");
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);

        edges.push({ source: article.id, target: targetId, weight: 1 });
      }
    }
  }

  // Compute degrees
  const degreeMap = new Map<string, number>();
  for (const edge of edges) {
    degreeMap.set(edge.source, (degreeMap.get(edge.source) ?? 0) + 1);
    degreeMap.set(edge.target, (degreeMap.get(edge.target) ?? 0) + 1);
  }

  for (const node of nodes) {
    node.degree = degreeMap.get(node.id) ?? 0;
  }

  // Validate with schema
  const graphData: GraphData = { nodes, edges };
  return GraphDataSchema.parse(graphData);
}