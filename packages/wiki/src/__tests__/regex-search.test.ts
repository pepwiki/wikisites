/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import {
  compileRegex,
  highlightMatches,
  analyzeComplexity,
  analyzePattern,
  searchContent,
  type SearchQuery,
  type SearchableDocument,
  SearchQuerySchema,
} from "../lib/regex-search";

describe("regex-search", () => {
  // ---------------------------------------------------------------------------
  // Zod Schemas
  // ---------------------------------------------------------------------------

  describe("SearchQuerySchema", () => {
    it("validates a minimal query", () => {
      const result = SearchQuerySchema.safeParse({ pattern: "hello" });
      expect(result.success).toBe(true);
    });

    it("rejects empty pattern", () => {
      const result = SearchQuerySchema.safeParse({ pattern: "" });
      expect(result.success).toBe(false);
    });

    it("rejects pattern exceeding 200 chars", () => {
      const result = SearchQuerySchema.safeParse({ pattern: "a".repeat(201) });
      expect(result.success).toBe(false);
    });

    it("applies default fields", () => {
      const parsed = SearchQuerySchema.parse({ pattern: "test" });
      expect(parsed.fields).toEqual(["title", "body"]);
    });

    it("applies default caseSensitive=false", () => {
      const parsed = SearchQuerySchema.parse({ pattern: "test" });
      expect(parsed.caseSensitive).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // compileRegex
  // ---------------------------------------------------------------------------

  describe("compileRegex", () => {
    it("compiles a basic pattern", () => {
      const { regex, error } = compileRegex("hello", "");
      expect(regex).toBeInstanceOf(RegExp);
      expect(error).toBeNull();
    });

    it("compiles with flags", () => {
      const { regex, error } = compileRegex("hello", "i");
      expect(regex).toBeInstanceOf(RegExp);
      expect(error).toBeNull();
      expect(regex!.flags).toContain("i");
    });

    it("adds global flag automatically", () => {
      const { regex } = compileRegex("test", "");
      expect(regex!.flags).toContain("g");
    });

    it("returns error for invalid pattern", () => {
      const { regex, error } = compileRegex("[invalid", "");
      expect(regex).toBeNull();
      expect(error).not.toBeNull();
    });

    it("blocks patterns exceeding length limit", () => {
      const { regex, error } = compileRegex("a".repeat(201), "");
      expect(regex).toBeNull();
      expect(error).toContain("200");
    });
  });

  // ---------------------------------------------------------------------------
  // ReDoS defense — complexity analysis
  // ---------------------------------------------------------------------------

  describe("analyzeComplexity / ReDoS defense", () => {
    it("marks simple patterns as safe", () => {
      const score = analyzeComplexity("hello world");
      expect(score.rating).toBe("safe");
      expect(score.hasVulnerability).toBe(false);
    });

    it("detects nested quantifiers", () => {
      const score = analyzeComplexity("(a+)+b");
      expect(score.hasVulnerability).toBe(true);
      expect(["warn", "blocked"]).toContain(score.rating);
    });

    it("detects nested star quantifiers", () => {
      const score = analyzeComplexity("(a*)*b");
      expect(score.hasVulnerability).toBe(true);
    });

    it("detects alternation with quantifiers", () => {
      const score = analyzeComplexity("(a|a)+");
      expect(score.hasVulnerability).toBe(true);
    });

    it("penalizes backreferences", () => {
      const score = analyzeComplexity("(a+)\\1");
      expect(score.complexity).toBeGreaterThan(0);
    });

    it("blocks extremely complex patterns", () => {
      // Multiple nested quantifiers
      const score = analyzeComplexity("(a+)+|(b+)+|(c+)+");
      expect(score.rating).toBe("blocked");
    });

    it("scores within 0-100 range", () => {
      const patterns = ["a", "(a+)+", "(a|b|c|d|e)+", "a+b*c?", "(a*)*"];
      for (const p of patterns) {
        const score = analyzeComplexity(p);
        expect(score.complexity).toBeGreaterThanOrEqual(0);
        expect(score.complexity).toBeLessThanOrEqual(100);
      }
    });
  });

  describe("analyzePattern", () => {
    it("delegates to analyzeComplexity", () => {
      const score = analyzePattern("test");
      expect(score.rating).toBe("safe");
    });
  });

  // ---------------------------------------------------------------------------
  // searchContent
  // ---------------------------------------------------------------------------

  describe("searchContent", () => {
    const docs: SearchableDocument[] = [
      { id: "1", title: "Introduction to TypeScript", body: "TypeScript is a typed superset of JavaScript.", tags: ["ts", "js"] },
      { id: "2", title: "SolidJS Guide", body: "SolidJS is a declarative JavaScript framework.", tags: ["ui", "framework"] },
      { id: "3", title: "CSS Grid Layout", body: "CSS Grid enables two-dimensional layouts.", tags: ["css", "layout"] },
    ];

    it("finds matching documents", () => {
      const query: SearchQuery = { pattern: "TypeScript", fields: ["title", "body"] };
      const result = searchContent(query, docs);
      expect(result.results.length).toBeGreaterThan(0);
      expect(result.results[0]!.id).toBe("1");
    });

    it("returns empty results for no match", () => {
      const query: SearchQuery = { pattern: "nonexistent", fields: ["title", "body"] };
      const result = searchContent(query, docs);
      expect(result.results).toHaveLength(0);
      expect(result.totalMatches).toBe(0);
    });

    it("respects field selection", () => {
      const query: SearchQuery = { pattern: "JavaScript", fields: ["title"] };
      const result = searchContent(query, docs);
      // "JavaScript" only appears in body, not title
      expect(result.results).toHaveLength(0);
    });

    it("searches tags when specified", () => {
      const query: SearchQuery = { pattern: "css", fields: ["tags"] };
      const result = searchContent(query, docs);
      expect(result.results.length).toBeGreaterThan(0);
      expect(result.results[0]!.id).toBe("3");
    });

    it("performs case-insensitive search by default", () => {
      const query: SearchQuery = { pattern: "typescript", fields: ["title"] };
      const result = searchContent(query, docs);
      expect(result.results.length).toBeGreaterThan(0);
    });

    it("performs case-sensitive search when requested", () => {
      const query: SearchQuery = { pattern: "typescript", fields: ["title"], caseSensitive: true };
      const result = searchContent(query, docs);
      expect(result.results).toHaveLength(0);
    });

    it("includes match metadata", () => {
      const query: SearchQuery = { pattern: "SolidJS", fields: ["title", "body"] };
      const result = searchContent(query, docs);
      expect(result.results[0]!.matchMeta.totalMatches).toBeGreaterThanOrEqual(1);
      expect(result.results[0]!.matchMeta.field).toBe("title");
    });

    it("generates highlights", () => {
      const query: SearchQuery = { pattern: "CSS", fields: ["title"] };
      const result = searchContent(query, docs);
      const highlights = result.results[0]!.highlights;
      expect(highlights.length).toBeGreaterThan(0);
      const activeHighlights = highlights.filter(
        (h: { isActive: boolean }) => h.isActive,
      );
      expect(activeHighlights.length).toBe(1);
    });

    it("returns execution time", () => {
      const query: SearchQuery = { pattern: "Grid", fields: ["title"] };
      const result = searchContent(query, docs);
      expect(result.executionTimeMs).toBeGreaterThanOrEqual(0);
    });

    it("returns truncated=false for small result sets", () => {
      const query: SearchQuery = { pattern: "CSS", fields: ["title"] };
      const result = searchContent(query, docs);
      expect(result.truncated).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // highlightMatches
  // ---------------------------------------------------------------------------

  describe("highlightMatches", () => {
    it("returns escaped text with no matches", () => {
      const html = highlightMatches("hello <world>", []);
      expect(html).toBe("hello &lt;world&gt;");
    });

    it("wraps matches in <mark> tags", () => {
      const text = "hello world";
      const regex = /world/g;
      const matches = [...text.matchAll(regex)];
      const html = highlightMatches(text, matches);
      expect(html).toContain("<mark");
      expect(html).toContain("world");
      expect(html).toContain("</mark>");
    });

    it("preserves text around matches", () => {
      const text = "foo bar baz";
      const regex = /bar/g;
      const matches = [...text.matchAll(regex)];
      const html = highlightMatches(text, matches);
      expect(html).toContain("foo");
      expect(html).toContain("baz");
    });

    it("handles multiple matches", () => {
      const text = "aaa";
      const regex = /a/g;
      const matches = [...text.matchAll(regex)];
      const html = highlightMatches(text, matches);
      const markCount = (html.match(/<mark/g) ?? []).length;
      expect(markCount).toBe(3);
    });

    it("escapes HTML in non-matching text", () => {
      const text = "<script>alert('xss')</script>";
      const html = highlightMatches(text, []);
      expect(html).not.toContain("<script>");
      expect(html).toContain("&lt;script&gt;");
    });
  });
});
