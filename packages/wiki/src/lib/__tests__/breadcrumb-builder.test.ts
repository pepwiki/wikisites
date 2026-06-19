import { describe, it, expect } from "vitest";
import {
  BreadcrumbItemSchema,
  BreadcrumbTrailSchema,
  SchemaOrgBreadcrumbSchema,
  trailFromPath,
  segmentToLabel,
  computeVisibleItems,
  toJsonLd,
} from "../breadcrumb-builder";
import type { BreadcrumbItem } from "../breadcrumb-builder";

// ─── Schema Validation ───────────────────────────────────────────────────────

describe("BreadcrumbItemSchema", () => {
  const validItem: BreadcrumbItem = {
    label: "Amino Acids",
    href: "/learn/amino-acids",
    current: false,
  };

  it("accepts a valid breadcrumb item", () => {
    const result = BreadcrumbItemSchema.parse(validItem);
    expect(result.label).toBe("Amino Acids");
    expect(result.href).toBe("/learn/amino-acids");
    expect(result.current).toBe(false);
  });

  it("defaults current to false", () => {
    const result = BreadcrumbItemSchema.parse({ label: "Home", href: "/" });
    expect(result.current).toBe(false);
  });

  it("rejects empty label", () => {
    expect(() =>
      BreadcrumbItemSchema.parse({ ...validItem, label: "" })
    ).toThrow();
  });

  it("rejects label exceeding 128 characters", () => {
    expect(() =>
      BreadcrumbItemSchema.parse({ ...validItem, label: "x".repeat(129) })
    ).toThrow();
  });

  it("accepts label at exactly 128 characters", () => {
    const result = BreadcrumbItemSchema.parse({
      ...validItem,
      label: "x".repeat(128),
    });
    expect(result.label).toHaveLength(128);
  });

  it("rejects empty href", () => {
    expect(() =>
      BreadcrumbItemSchema.parse({ ...validItem, href: "" })
    ).toThrow();
  });
});

describe("BreadcrumbTrailSchema", () => {
  it("accepts a valid trail", () => {
    const result = BreadcrumbTrailSchema.parse({
      items: [{ label: "Home", href: "/" }],
      maxItems: 5,
    });
    expect(result.items).toHaveLength(1);
    expect(result.maxItems).toBe(5);
  });

  it("defaults maxItems to 5", () => {
    const result = BreadcrumbTrailSchema.parse({
      items: [{ label: "Home", href: "/" }],
    });
    expect(result.maxItems).toBe(5);
  });

  it("rejects empty items array", () => {
    expect(() => BreadcrumbTrailSchema.parse({ items: [] })).toThrow();
  });

  it("rejects maxItems below 1", () => {
    expect(() =>
      BreadcrumbTrailSchema.parse({
        items: [{ label: "Home", href: "/" }],
        maxItems: 0,
      })
    ).toThrow();
  });

  it("rejects maxItems above 10", () => {
    expect(() =>
      BreadcrumbTrailSchema.parse({
        items: [{ label: "Home", href: "/" }],
        maxItems: 11,
      })
    ).toThrow();
  });
});

describe("SchemaOrgBreadcrumbSchema", () => {
  it("accepts a valid Schema.org breadcrumb", () => {
    const result = SchemaOrgBreadcrumbSchema.parse({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "/",
        },
      ],
    });
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toHaveLength(1);
  });

  it("rejects invalid @context", () => {
    expect(() =>
      SchemaOrgBreadcrumbSchema.parse({
        "@context": "https://example.com",
        "@type": "BreadcrumbList",
        itemListElement: [],
      })
    ).toThrow();
  });

  it("rejects invalid @type", () => {
    expect(() =>
      SchemaOrgBreadcrumbSchema.parse({
        "@context": "https://schema.org",
        "@type": "Article",
        itemListElement: [],
      })
    ).toThrow();
  });
});

// ─── segmentToLabel ──────────────────────────────────────────────────────────

describe("segmentToLabel", () => {
  it("capitalises a single word", () => {
    expect(segmentToLabel("alanine")).toBe("Alanine");
  });

  it("replaces hyphens with spaces and capitalises words", () => {
    expect(segmentToLabel("amino-acids")).toBe("Amino Acids");
  });

  it("handles uppercase abbreviations", () => {
    expect(segmentToLabel("ATP-synthase")).toBe("ATP Synthase");
  });

  it("handles single character segments", () => {
    expect(segmentToLabel("a")).toBe("A");
  });

  it("handles segments with no hyphens", () => {
    expect(segmentToLabel("glutathione")).toBe("Glutathione");
  });

  it("handles multiple consecutive hyphens", () => {
    expect(segmentToLabel("a--b")).toBe("A  B");
  });

  it("handles segment starting with a number", () => {
    expect(segmentToLabel("2peptides")).toBe("2peptides");
  });
});

// ─── trailFromPath ───────────────────────────────────────────────────────────

describe("trailFromPath", () => {
  it("returns single root item for empty path", () => {
    const trail = trailFromPath("/", "Home");
    expect(trail).toHaveLength(1);
    expect(trail[0]).toEqual({ label: "Home", href: "/", current: true });
  });

  it("returns single root item for empty string", () => {
    const trail = trailFromPath("", "Home");
    expect(trail).toHaveLength(1);
    expect(trail[0]).toEqual({ label: "Home", href: "/", current: true });
  });

  it("builds trail for root + one segment", () => {
    const trail = trailFromPath("/learn", "Home");
    expect(trail).toHaveLength(2);
    expect(trail[0]).toEqual({ label: "Home", href: "/", current: false });
    expect(trail[1]).toEqual({
      label: "Learn",
      href: "/learn",
      current: true,
    });
  });

  it("builds trail for deep nesting", () => {
    const trail = trailFromPath("/learn/amino-acids/alanine", "Home");
    expect(trail).toHaveLength(4);
    expect(trail[0]).toEqual({ label: "Home", href: "/", current: false });
    expect(trail[1]).toEqual({ label: "Learn", href: "/learn", current: false });
    expect(trail[2]).toEqual({
      label: "Amino Acids",
      href: "/learn/amino-acids",
      current: false,
    });
    expect(trail[3]).toEqual({
      label: "Alanine",
      href: "/learn/amino-acids/alanine",
      current: true,
    });
  });

  it("uses custom rootLabel", () => {
    const trail = trailFromPath("/learn", "WikiPept");
    expect(trail[0]?.label).toBe("WikiPept");
  });

  it("marks only the last item as current", () => {
    const trail = trailFromPath("/a/b/c");
    const currents = trail.filter((item) => item.current);
    expect(currents).toHaveLength(1);
    expect(currents[0]?.href).toBe("/a/b/c");
  });

  it("strips trailing slashes", () => {
    const trail = trailFromPath("/learn/");
    expect(trail).toHaveLength(2);
    expect(trail[1]?.href).toBe("/learn");
  });
});

// ─── computeVisibleItems ─────────────────────────────────────────────────────

describe("computeVisibleItems", () => {
  const makeItems = (count: number): BreadcrumbItem[] =>
    Array.from({ length: count }, (_, i) => ({
      label: `Item ${i}`,
      href: `/${i}`,
      current: i === count - 1,
    }));

  it("returns all items when under max", () => {
    const items = makeItems(3);
    const result = computeVisibleItems(items, 5);
    expect(result).toHaveLength(3);
    expect(result.every((item) => "href" in item)).toBe(true);
  });

  it("returns all items when exactly at max", () => {
    const items = makeItems(5);
    const result = computeVisibleItems(items, 5);
    expect(result).toHaveLength(5);
  });

  it("collapses middle items when over max", () => {
    const items = makeItems(7);
    const result = computeVisibleItems(items, 5);
    // first (1) + ellipsis (1) + last (maxItems-1=4) = 6 total elements
    expect(result).toHaveLength(6);
  });

  it("first item is always preserved", () => {
    const items = makeItems(8);
    const result = computeVisibleItems(items, 3);
    expect(result[0]).toEqual(items[0]);
  });

  it("contains ellipsis when overflowing", () => {
    const items = makeItems(6);
    const result = computeVisibleItems(items, 3);
    const hasEllipsis = result.some(
      (item) => "type" in item && item.type === "ellipsis"
    );
    expect(hasEllipsis).toBe(true);
  });

  it("last items are preserved in order", () => {
    const items = makeItems(8);
    const result = computeVisibleItems(items, 4);
    // lastCount = 3, so last 3 items of the original
    const nonEllipsis = result.filter(
      (item) => !("type" in item)
    ) as BreadcrumbItem[];
    const expectedLast = items.slice(-3);
    expect(nonEllipsis).toEqual([items[0], ...expectedLast]);
  });
});

// ─── toJsonLd ────────────────────────────────────────────────────────────────

describe("toJsonLd", () => {
  it("generates valid Schema.org BreadcrumbList", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", current: false },
      { label: "Learn", href: "/learn", current: true },
    ];
    const result = toJsonLd(items);

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toHaveLength(2);
  });

  it("sets correct positions (1-indexed)", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", current: false },
      { label: "A", href: "/a", current: false },
      { label: "B", href: "/a/b", current: true },
    ];
    const result = toJsonLd(items);

    expect(result.itemListElement[0]?.position).toBe(1);
    expect(result.itemListElement[1]?.position).toBe(2);
    expect(result.itemListElement[2]?.position).toBe(3);
  });

  it("maps label to name and href to item", () => {
    const items: BreadcrumbItem[] = [
      { label: "Amino Acids", href: "/learn/amino-acids", current: true },
    ];
    const result = toJsonLd(items);

    expect(result.itemListElement[0]?.name).toBe("Amino Acids");
    expect(result.itemListElement[0]?.item).toBe("/learn/amino-acids");
  });

  it("uses ListItem type for each element", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", current: false },
    ];
    const result = toJsonLd(items);

    expect(result.itemListElement[0]?.["@type"]).toBe("ListItem");
  });

  it("handles single-item trail", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", current: true },
    ];
    const result = toJsonLd(items);
    expect(result.itemListElement).toHaveLength(1);
  });

  it("output passes SchemaOrgBreadcrumbSchema validation", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", current: false },
      { label: "Learn", href: "/learn", current: false },
      { label: "Alanine", href: "/learn/alanine", current: true },
    ];
    const result = toJsonLd(items);
    expect(() => SchemaOrgBreadcrumbSchema.parse(result)).not.toThrow();
  });
});
