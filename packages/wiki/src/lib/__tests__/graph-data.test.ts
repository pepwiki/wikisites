import { describe, it, expect } from "vitest";
import {
  GraphNodeSchema,
  GraphEdgeSchema,
  GraphDataSchema,
  buildGraphFromPages,
  computeDegrees,
  truncateData,
} from "../graph-data";
import type { GraphNode, PageEntry } from "../graph-data";

// ─── Schema Validation ───────────────────────────────────────────────────────

describe("GraphNodeSchema", () => {
  const validNode: GraphNode = {
    id: "amino-acids",
    label: "Amino Acids",
    group: "concept",
    degree: 3,
  };

  it("accepts a valid node", () => {
    const result = GraphNodeSchema.parse(validNode);
    expect(result.id).toBe("amino-acids");
    expect(result.label).toBe("Amino Acids");
    expect(result.group).toBe("concept");
    expect(result.degree).toBe(3);
  });

  it("defaults group to 'default'", () => {
    const result = GraphNodeSchema.parse({ id: "a", label: "A" });
    expect(result.group).toBe("default");
  });

  it("defaults degree to 0", () => {
    const result = GraphNodeSchema.parse({ id: "a", label: "A" });
    expect(result.degree).toBe(0);
  });

  it("rejects empty id", () => {
    expect(() => GraphNodeSchema.parse({ ...validNode, id: "" })).toThrow();
  });

  it("rejects empty label", () => {
    expect(() => GraphNodeSchema.parse({ ...validNode, label: "" })).toThrow();
  });

  it("rejects negative degree", () => {
    expect(() => GraphNodeSchema.parse({ ...validNode, degree: -1 })).toThrow();
  });
});

describe("GraphEdgeSchema", () => {
  it("accepts a valid edge", () => {
    const result = GraphEdgeSchema.parse({
      source: "a",
      target: "b",
      weight: 2,
    });
    expect(result.source).toBe("a");
    expect(result.target).toBe("b");
    expect(result.weight).toBe(2);
  });

  it("defaults weight to 1", () => {
    const result = GraphEdgeSchema.parse({ source: "a", target: "b" });
    expect(result.weight).toBe(1);
  });

  it("rejects empty source", () => {
    expect(() =>
      GraphEdgeSchema.parse({ source: "", target: "b" })
    ).toThrow();
  });

  it("rejects zero weight", () => {
    expect(() =>
      GraphEdgeSchema.parse({ source: "a", target: "b", weight: 0 })
    ).toThrow();
  });
});

describe("GraphDataSchema", () => {
  it("accepts valid graph data", () => {
    const result = GraphDataSchema.parse({
      nodes: [{ id: "a", label: "A" }],
      edges: [{ source: "a", target: "a", weight: 1 }],
    });
    expect(result.nodes).toHaveLength(1);
    expect(result.edges).toHaveLength(1);
  });

  it("accepts empty graph", () => {
    const result = GraphDataSchema.parse({ nodes: [], edges: [] });
    expect(result.nodes).toHaveLength(0);
  });
});

// ─── computeDegrees ─────────────────────────────────────────────────────────

describe("computeDegrees", () => {
  it("sets degree 0 for isolated nodes", () => {
    const data = computeDegrees({
      nodes: [{ id: "a", label: "A", group: "default", degree: 0 }],
      edges: [],
    });
    expect(data.nodes[0]?.degree).toBe(0);
  });

  it("counts edge incidents correctly", () => {
    const data = computeDegrees({
      nodes: [
        { id: "a", label: "A", group: "default", degree: 0 },
        { id: "b", label: "B", group: "default", degree: 0 },
        { id: "c", label: "C", group: "default", degree: 0 },
      ],
      edges: [
        { source: "a", target: "b", weight: 1 },
        { source: "a", target: "c", weight: 1 },
      ],
    });

    const degrees = new Map(data.nodes.map((n) => [n.id, n.degree]));
    expect(degrees.get("a")).toBe(2);
    expect(degrees.get("b")).toBe(1);
    expect(degrees.get("c")).toBe(1);
  });

  it("returns the same reference for chaining", () => {
    const input = {
      nodes: [{ id: "a", label: "A", group: "default" as const, degree: 0 }],
      edges: [] as { source: string; target: string; weight: number }[],
    };
    const result = computeDegrees(input);
    expect(result).toBe(input);
  });
});

// ─── buildGraphFromPages ────────────────────────────────────────────────────

describe("buildGraphFromPages", () => {
  const pages: PageEntry[] = [
    { id: "1", slug: "amino-acids", title: "Amino Acids", links: ["alanine"] },
    { id: "2", slug: "alanine", title: "Alanine", links: ["amino-acids"] },
    { id: "3", slug: "atp", title: "ATP", links: ["amino-acids", "glucose"] },
    { id: "4", slug: "glucose", title: "Glucose", links: [] },
  ];

  it("creates one node per page", () => {
    const graph = buildGraphFromPages(pages);
    expect(graph.nodes).toHaveLength(4);
  });

  it("generates edges for resolved links", () => {
    const graph = buildGraphFromPages(pages);
    expect(graph.edges.length).toBeGreaterThanOrEqual(2);
  });

  it("deduplicates bidirectional edges", () => {
    const graph = buildGraphFromPages(pages);
    const aminoToAlanine = graph.edges.filter(
      (e) =>
        (e.source === "1" && e.target === "2") ||
        (e.source === "2" && e.target === "1")
    );
    expect(aminoToAlanine).toHaveLength(1);
  });

  it("ignores links to unknown slugs", () => {
    const graph = buildGraphFromPages(pages);
    const unknownEdges = graph.edges.filter(
      (e) => e.source === "4" || e.target === "4"
    );
    // glucose has no outbound links, and no other page links to glucose except ATP
    expect(unknownEdges).toHaveLength(1); // 3->4 only
  });

  it("ignores self-links", () => {
    const selfPages: PageEntry[] = [
      { id: "1", slug: "a", title: "A", links: ["a"] },
    ];
    const graph = buildGraphFromPages(selfPages);
    expect(graph.edges).toHaveLength(0);
  });

  it("computes degrees after building", () => {
    const graph = buildGraphFromPages(pages);
    const nodeA = graph.nodes.find((n) => n.id === "1");
    expect(nodeA!.degree).toBeGreaterThanOrEqual(1);
  });

  it("handles empty page list", () => {
    const graph = buildGraphFromPages([]);
    expect(graph.nodes).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });

  it("applies custom group from page entry", () => {
    const customPages: PageEntry[] = [
      { id: "1", slug: "a", title: "A", group: "concept" },
    ];
    const graph = buildGraphFromPages(customPages);
    expect(graph.nodes[0]?.group).toBe("concept");
  });

  it("defaults group when not provided", () => {
    const graph = buildGraphFromPages([
      { id: "1", slug: "a", title: "A" },
    ]);
    expect(graph.nodes[0]?.group).toBe("default");
  });
});

// ─── truncateData ───────────────────────────────────────────────────────────

describe("truncateData", () => {
  const graph = buildGraphFromPages([
    { id: "1", slug: "a", title: "A", links: ["b", "c"] },
    { id: "2", slug: "b", title: "B", links: ["a", "c"] },
    { id: "3", slug: "c", title: "C", links: ["a", "b"] },
    { id: "4", slug: "d", title: "D" },
    { id: "5", slug: "e", title: "E" },
  ]);

  it("returns all nodes when maxNodes exceeds count", () => {
    const result = truncateData(graph, 100);
    expect(result.nodes).toHaveLength(5);
  });

  it("returns all nodes when maxNodes is 0", () => {
    const result = truncateData(graph, 0);
    expect(result.nodes).toHaveLength(5);
  });

  it("keeps only maxNodes highest-degree nodes", () => {
    const result = truncateData(graph, 2);
    expect(result.nodes).toHaveLength(2);
    // highest-degree nodes should be kept (a, b, c have degree 2)
    const ids = result.nodes.map((n) => n.id);
    expect(ids).toContain("1");
  });

  it("removes edges to pruned nodes", () => {
    const result = truncateData(graph, 2);
    const nodeIds = new Set(result.nodes.map((n) => n.id));
    for (const edge of result.edges) {
      expect(nodeIds.has(edge.source)).toBe(true);
      expect(nodeIds.has(edge.target)).toBe(true);
    }
  });

  it("returns original data reference when no truncation needed", () => {
    const result = truncateData(graph, 5);
    expect(result).toBe(graph);
  });
});
