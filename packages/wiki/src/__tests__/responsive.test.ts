import { describe, it, expect } from "vitest";
import { breakpoints, type BreakpointName } from "../lib/responsive";

describe("responsive", () => {
  describe("breakpoints", () => {
    it("has correct sm value", () => {
      expect(breakpoints.sm).toBe(640);
    });

    it("has correct md value", () => {
      expect(breakpoints.md).toBe(768);
    });

    it("has correct lg value", () => {
      expect(breakpoints.lg).toBe(1024);
    });

    it("has correct xl value", () => {
      expect(breakpoints.xl).toBe(1280);
    });

    it("has correct 2xl value", () => {
      expect(breakpoints["2xl"]).toBe(1536);
    });

    it("breakpoints are in ascending order", () => {
      const values = Object.values(breakpoints);
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]!);
      }
    });
  });

  describe("BreakpointName type", () => {
    it("includes all expected names", () => {
      const names: BreakpointName[] = ["sm", "md", "lg", "xl", "2xl"];
      expect(names).toHaveLength(5);
    });
  });

  describe("SSR safety", () => {
    it("breakpoints object is available at module scope (SSR-safe)", () => {
      expect(breakpoints).toBeDefined();
      expect(typeof breakpoints.sm).toBe("number");
    });
  });
});
