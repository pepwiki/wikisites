import { describe, it, expect } from "vitest";
import {
  generateSlug,
  extractInternalLinks,
  extractTags,
  buildGraphFromCollections,
} from "../graph-data-build";
import type { CollectionEntry } from "../graph-data-build";

// ─── generateSlug ─────────────────────────────────────────────────────────────

describe("generateSlug", () => {
  it("converts title to lowercase slug", () => {
    expect(generateSlug("Peptide Bond Chemistry")).toBe("peptide-bond-chemistry");
  });

  it("removes special characters", () => {
    expect(generateSlug("Amino Acids & Proteins")).toBe("amino-acids-proteins");
  });

  it("replaces spaces with hyphens", () => {
    expect(generateSlug("hello world")).toBe("hello-world");
  });

  it("collapses multiple hyphens", () => {
    expect(generateSlug("a   b")).toBe("a-b");
  });

  it("trims leading/trailing hyphens", () => {
    expect(generateSlug(" Hello ")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(generateSlug("")).toBe("");
  });

  it("handles already slugified text", () => {
    expect(generateSlug("peptide-bond")).toBe("peptide-bond");
  });

  it("handles numbers", () => {
    expect(generateSlug("20 Standard Amino Acids")).toBe("20-standard-amino-acids");
  });
});

// ─── extractInternalLinks ─────────────────────────────────────────────────────

describe("extractInternalLinks", () => {
  it("extracts markdown links", () => {
    const content = "See [peptide bonds](/learn/peptide-bonds) for more.";
    const links = extractInternalLinks(content);
    expect(links).toEqual(["/learn/peptide-bonds"]);
  });

  it("extracts multiple links", () => {
    const content = `
      [Link 1](/page-1)
      [Link 2](/page-2)
      [Link 3](/page-3)
    `;
    const links = extractInternalLinks(content);
    expect(links).toEqual(["/page-1", "/page-2", "/page-3"]);
  });

  it("skips external links", () => {
    const content = `
      [External](https://example.com)
      [Another](http://test.com)
      [Email](mailto:user@example.com)
    `;
    const links = extractInternalLinks(content);
    expect(links).toEqual([]);
  });

  it("skips anchor links", () => {
    const content = "[Section](#section-1)";
    const links = extractInternalLinks(content);
    expect(links).toEqual([]);
  });

  it("removes query params and hash", () => {
    const content = "[Link](/page?ref=home#section)";
    const links = extractInternalLinks(content);
    expect(links).toEqual(["/page"]);
  });

  it("handles relative links", () => {
    const content = "[Relative](./relative-page)";
    const links = extractInternalLinks(content);
    expect(links).toEqual(["./relative-page"]);
  });

  it("skips empty links", () => {
    const content = "[Empty]()";
    const links = extractInternalLinks(content);
    expect(links).toEqual([]);
  });

  it("skips root link", () => {
    const content = "[Root](/)";
    const links = extractInternalLinks(content);
    expect(links).toEqual([]);
  });

  it("handles markdown with no links", () => {
    const content = "Just plain text with no links.";
    const links = extractInternalLinks(content);
    expect(links).toEqual([]);
  });
});

// ─── extractTags ──────────────────────────────────────────────────────────────

describe("extractTags", () => {
  it("extracts tags from frontmatter", () => {
    const frontmatter = { tags: ["amino-acids", "beginner", "fundamentals"] };
    const tags = extractTags(frontmatter);
    expect(tags).toEqual(["amino-acids", "beginner", "fundamentals"]);
  });

  it("lowercases tags", () => {
    const frontmatter = { tags: ["AMINO-ACIDS", "Beginner"] };
    const tags = extractTags(frontmatter);
    expect(tags).toEqual(["amino-acids", "beginner"]);
  });

  it("deduplicates tags", () => {
    const frontmatter = { tags: ["amino-acids", "amino-acids", "beginner"] };
    const tags = extractTags(frontmatter);
    expect(tags).toEqual(["amino-acids", "beginner"]);
  });

  it("trims whitespace from tags", () => {
    const frontmatter = { tags: ["  amino-acids  ", " beginner "] };
    const tags = extractTags(frontmatter);
    expect(tags).toEqual(["amino-acids", "beginner"]);
  });

  it("handles missing tags", () => {
    const frontmatter = {};
    const tags = extractTags(frontmatter);
    expect(tags).toEqual([]);
  });

  it("filters empty tags", () => {
    const frontmatter = { tags: ["", "amino-acids", ""] };
    const tags = extractTags(frontmatter);
    expect(tags).toEqual(["amino-acids"]);
  });
});

// ─── buildGraphFromCollections ────────────────────────────────────────────────

describe("buildGraphFromCollections", () => {
  const createDoc = (
    id: string,
    slug: string,
    title: string,
    body?: string,
    tags?: string[],
  ): CollectionEntry => ({
    id,
    slug,
    body,
    data: { title, tags },
  });

  const createArticle = (
    id: string,
    slug: string,
    title: string,
    body?: string,
    relatedArticles?: string[],
  ): CollectionEntry => ({
    id,
    slug,
    body,
    data: { title, relatedArticles },
  });

  it("creates nodes from docs and articles", () => {
    const docs = [createDoc("1", "amino-acids", "Amino Acids")];
    const articles = [createArticle("2", "peptide-bonds", "Peptide Bonds")];

    const graph = buildGraphFromCollections(docs, articles);

    expect(graph.nodes).toHaveLength(2);
    expect(graph.nodes.map((n) => n.id)).toContain("1");
    expect(graph.nodes.map((n) => n.id)).toContain("2");
  });

  it("creates edges from markdown links", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", "See [peptide bonds](/peptide-bonds) for more."),
    ];
    const articles = [createArticle("2", "peptide-bonds", "Peptide Bonds")];

    const graph = buildGraphFromCollections(docs, articles);

    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0]).toEqual({ source: "1", target: "2", weight: 1 });
  });

  it("creates edges from relatedArticles", () => {
    const docs = [createDoc("1", "amino-acids", "Amino Acids")];
    const articles = [
      createArticle("2", "peptide-bonds", "Peptide Bonds", undefined, ["amino-acids"]),
    ];

    const graph = buildGraphFromCollections(docs, articles);

    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0]).toEqual({ source: "2", target: "1", weight: 1 });
  });

  it("deduplicates bidirectional edges", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", "See [peptide bonds](/peptide-bonds)"),
    ];
    const articles = [
      createArticle("2", "peptide-bonds", "Peptide Bonds", "See [amino acids](/amino-acids)"),
    ];

    const graph = buildGraphFromCollections(docs, articles);

    // Should only have one edge, not two
    expect(graph.edges).toHaveLength(1);
  });

  it("ignores self-links", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", "See [self](/amino-acids)"),
    ];

    const graph = buildGraphFromCollections(docs, []);

    expect(graph.edges).toHaveLength(0);
  });

  it("ignores links to unknown pages", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", "See [unknown](/unknown-page)"),
    ];

    const graph = buildGraphFromCollections(docs, []);

    expect(graph.edges).toHaveLength(0);
  });

  it("handles empty collections", () => {
    const graph = buildGraphFromCollections([], []);

    expect(graph.nodes).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });

  it("computes degrees correctly", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", "See [peptide bonds](/peptide-bonds)"),
      createDoc("2", "peptide-bonds", "Peptide Bonds", "See [amino acids](/amino-acids)"),
    ];

    const graph = buildGraphFromCollections(docs, []);

    const node1 = graph.nodes.find((n) => n.id === "1");
    const node2 = graph.nodes.find((n) => n.id === "2");

    expect(node1?.degree).toBe(1);
    expect(node2?.degree).toBe(1);
  });

  it("assigns groups from tags", () => {
    const docs = [
      createDoc("1", "amino-acids", "Amino Acids", undefined, ["fundamentals"]),
    ];

    const graph = buildGraphFromCollections(docs, []);

    expect(graph.nodes[0]?.group).toBe("fundamentals");
  });

  it("assigns default group when no tags", () => {
    const docs = [createDoc("1", "amino-acids", "Amino Acids")];

    const graph = buildGraphFromCollections(docs, []);

    expect(graph.nodes[0]?.group).toBe("docs");
  });

  it("uses title as label", () => {
    const docs = [createDoc("1", "amino-acids", "Amino Acids")];

    const graph = buildGraphFromCollections(docs, []);

    expect(graph.nodes[0]?.label).toBe("Amino Acids");
  });

  it("handles docs with index slug", () => {
    const docs = [createDoc("1", "learn/index", "Learn")];

    const graph = buildGraphFromCollections(docs, []);

    // Should normalize the slug
    expect(graph.nodes).toHaveLength(1);
  });
});