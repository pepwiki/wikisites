/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import {
  detectMathSegments,
  escapeHtml,
  extractExpressions,
  renderLatexSync,
  renderDocumentSync,
  LaTeXExpressionSchema,
  MathSegmentSchema,
} from "../latex-renderer";

describe("latex-renderer", () => {
  // ---------------------------------------------------------------------------
  // escapeHtml
  // ---------------------------------------------------------------------------

  describe("escapeHtml", () => {
    it("escapes ampersands", () => {
      expect(escapeHtml("a & b")).toBe("a &amp; b");
    });

    it("escapes angle brackets", () => {
      expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
    });

    it("escapes double quotes", () => {
      expect(escapeHtml('"quoted"')).toBe("&quot;quoted&quot;");
    });

    it("escapes single quotes", () => {
      expect(escapeHtml("it's")).toBe("it&#39;s");
    });

    it("handles empty string", () => {
      expect(escapeHtml("")).toBe("");
    });

    it("escapes multiple special characters", () => {
      expect(escapeHtml('<div class="a">&\'b</div>')).toBe(
        "&lt;div class=&quot;a&quot;&gt;&amp;&#39;b&lt;/div&gt;",
      );
    });
  });

  // ---------------------------------------------------------------------------
  // detectMathSegments
  // ---------------------------------------------------------------------------

  describe("detectMathSegments", () => {
    it("detects inline math", () => {
      const segments = detectMathSegments("The formula is $a + b$ here.");
      expect(segments).toHaveLength(3);
      expect(segments[0]!.type).toBe("text");
      expect(segments[0]!.content).toBe("The formula is ");
      expect(segments[1]!.type).toBe("math");
      expect(segments[1]!.expression!.raw).toBe("a + b");
      expect(segments[1]!.expression!.displayMode).toBe(false);
      expect(segments[2]!.type).toBe("text");
      expect(segments[2]!.content).toBe(" here.");
    });

    it("detects display math", () => {
      const segments = detectMathSegments("Before $$x^2 + y^2 = z^2$$ after.");
      expect(segments).toHaveLength(3);
      expect(segments[1]!.type).toBe("math");
      expect(segments[1]!.expression!.raw).toBe("x^2 + y^2 = z^2");
      expect(segments[1]!.expression!.displayMode).toBe(true);
    });

    it("detects mixed inline and display math", () => {
      const text = "A $a$ and B $$b$$ and C $c$";
      const segments = detectMathSegments(text);
      const mathSegments = segments.filter((s) => s.type === "math");
      expect(mathSegments).toHaveLength(3);
      expect(mathSegments[0]!.expression!.raw).toBe("a");
      expect(mathSegments[0]!.expression!.displayMode).toBe(false);
      expect(mathSegments[1]!.expression!.raw).toBe("b");
      expect(mathSegments[1]!.expression!.displayMode).toBe(true);
      expect(mathSegments[2]!.expression!.raw).toBe("c");
      expect(mathSegments[2]!.expression!.displayMode).toBe(false);
    });

    it("does not match escaped dollar signs", () => {
      const segments = detectMathSegments("Price is \\$5 not math.");
      const mathSegments = segments.filter((s) => s.type === "math");
      expect(mathSegments).toHaveLength(0);
    });

    it("handles text with no math", () => {
      const segments = detectMathSegments("No math here at all.");
      expect(segments).toHaveLength(1);
      expect(segments[0]!.type).toBe("text");
      expect(segments[0]!.content).toBe("No math here at all.");
    });

    it("handles empty string", () => {
      const segments = detectMathSegments("");
      expect(segments).toHaveLength(0);
    });

    it("handles math at start and end of text", () => {
      const segments = detectMathSegments("$a$ text $b$");
      expect(segments).toHaveLength(3);
      expect(segments[0]!.type).toBe("math");
      expect(segments[0]!.expression!.raw).toBe("a");
      expect(segments[2]!.type).toBe("math");
      expect(segments[2]!.expression!.raw).toBe("b");
    });

    it("handles consecutive math expressions", () => {
      const segments = detectMathSegments("$a$$b$");
      expect(segments).toHaveLength(2);
      expect(segments[0]!.expression!.raw).toBe("a");
      expect(segments[1]!.expression!.raw).toBe("b");
    });

    it("preserves correct character positions", () => {
      const text = "ab $cd$ ef";
      const segments = detectMathSegments(text);
      expect(segments[0]!.start).toBe(0);
      expect(segments[0]!.end).toBe(3);
      expect(segments[1]!.start).toBe(3);
      expect(segments[1]!.end).toBe(7);
      expect(segments[2]!.start).toBe(7);
      expect(segments[2]!.end).toBe(10);
    });

    it("handles multiline display math", () => {
      const text = "Before\n$$\nx^2\n$$\nAfter";
      const segments = detectMathSegments(text);
      const mathSegments = segments.filter((s) => s.type === "math");
      expect(mathSegments).toHaveLength(1);
      expect(mathSegments[0]!.expression!.displayMode).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // extractExpressions
  // ---------------------------------------------------------------------------

  describe("extractExpressions", () => {
    it("extracts all expressions from text", () => {
      const exprs = extractExpressions("$a$ and $$b$$ and $c$");
      expect(exprs).toHaveLength(3);
      expect(exprs[0]!.raw).toBe("a");
      expect(exprs[0]!.displayMode).toBe(false);
      expect(exprs[1]!.raw).toBe("b");
      expect(exprs[1]!.displayMode).toBe(true);
      expect(exprs[2]!.raw).toBe("c");
      expect(exprs[2]!.displayMode).toBe(false);
    });

    it("returns empty array for text without math", () => {
      const exprs = extractExpressions("no math here");
      expect(exprs).toHaveLength(0);
    });
  });

  // ---------------------------------------------------------------------------
  // renderLatexSync
  // ---------------------------------------------------------------------------

  describe("renderLatexSync", () => {
    it("returns fallback HTML for inline math", () => {
      const html = renderLatexSync("x^2", false);
      expect(html).toContain('role="math"');
      expect(html).toContain("aria-label");
      expect(html).toContain("x^2");
      expect(html).toContain("latex-fallback");
    });

    it("returns fallback HTML for display math", () => {
      const html = renderLatexSync("\\frac{1}{2}", true);
      expect(html).toContain('role="math"');
      expect(html).toContain("\\frac{1}{2}");
      expect(html).toContain("<div");
    });

    it("escapes HTML in fallback output", () => {
      const html = renderLatexSync("<script>alert('xss')</script>", false);
      expect(html).not.toContain("<script>");
      expect(html).toContain("&lt;script&gt;");
    });

    it("uses <code> tag for inline fallback", () => {
      const html = renderLatexSync("E = mc^2", false);
      expect(html).toContain("<code");
      expect(html).toContain("</code>");
    });

    it("uses <div> tag for display fallback", () => {
      const html = renderLatexSync("E = mc^2", true);
      expect(html).toContain("<div");
      expect(html).toContain("</div>");
    });
  });

  // ---------------------------------------------------------------------------
  // renderDocumentSync
  // ---------------------------------------------------------------------------

  describe("renderDocumentSync", () => {
    it("renders text with no math", () => {
      const html = renderDocumentSync("plain text");
      expect(html).toContain("plain text");
    });

    it("renders mixed text and math", () => {
      const html = renderDocumentSync("before $x$ after");
      expect(html).toContain("before ");
      expect(html).toContain("latex-fallback");
      expect(html).toContain(" after");
    });

    it("escapes surrounding text", () => {
      const html = renderDocumentSync("<b>$x$</b>");
      expect(html).toContain("&lt;b&gt;");
      expect(html).toContain("&lt;/b&gt;");
    });
  });

  // ---------------------------------------------------------------------------
  // Zod Schemas
  // ---------------------------------------------------------------------------

  describe("LaTeXExpressionSchema", () => {
    it("validates a valid expression", () => {
      const result = LaTeXExpressionSchema.safeParse({
        raw: "x^2",
        displayMode: false,
        start: 1,
        end: 4,
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing fields", () => {
      const result = LaTeXExpressionSchema.safeParse({ raw: "x^2" });
      expect(result.success).toBe(false);
    });

    it("rejects negative start", () => {
      const result = LaTeXExpressionSchema.safeParse({
        raw: "x^2",
        displayMode: false,
        start: -1,
        end: 4,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("MathSegmentSchema", () => {
    it("validates a text segment", () => {
      const result = MathSegmentSchema.safeParse({
        type: "text",
        content: "hello",
        start: 0,
        end: 5,
      });
      expect(result.success).toBe(true);
    });

    it("validates a math segment with expression", () => {
      const result = MathSegmentSchema.safeParse({
        type: "math",
        content: "$x^2$",
        expression: {
          raw: "x^2",
          displayMode: false,
          start: 1,
          end: 4,
        },
        start: 0,
        end: 5,
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid type", () => {
      const result = MathSegmentSchema.safeParse({
        type: "invalid",
        content: "hello",
        start: 0,
        end: 5,
      });
      expect(result.success).toBe(false);
    });
  });
});
