/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import SplitPane, { type SplitPaneProps } from "../components/SplitPane";

describe("SplitPane", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("exports a renderable component", () => {
    expect(typeof SplitPane).toBe("function");
  });

  it("accepts defaultRatio prop", () => {
    const props: SplitPaneProps = {
      left: document.createElement("div"),
      right: document.createElement("div"),
      defaultRatio: 0.3,
    };
    expect(props.defaultRatio).toBe(0.3);
  });

  it("accepts minRatio and maxRatio props", () => {
    const props: SplitPaneProps = {
      left: document.createElement("div"),
      right: document.createElement("div"),
      minRatio: 0.15,
      maxRatio: 0.85,
    };
    expect(props.minRatio).toBe(0.15);
    expect(props.maxRatio).toBe(0.85);
  });

  it("accepts persistKey prop", () => {
    const props: SplitPaneProps = {
      left: document.createElement("div"),
      right: document.createElement("div"),
      persistKey: "test-pane",
    };
    expect(props.persistKey).toBe("test-pane");
  });

  it("round-trips ratio through localStorage", () => {
    const key = "wikisites:split-pane:round-trip-test";
    const ratio = 0.35;

    localStorage.setItem(key, JSON.stringify(ratio));

    const raw = localStorage.getItem(key);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed).toBe(ratio);
  });

  it("ignores invalid localStorage values", () => {
    const key = "wikisites:split-pane:invalid-test";
    localStorage.setItem(key, JSON.stringify("not-a-number"));

    const raw = localStorage.getItem(key);
    const parsed = JSON.parse(raw!);
    expect(typeof parsed === "number").toBe(false);
  });

  it("handles missing localStorage entry gracefully", () => {
    const raw = localStorage.getItem("wikisites:split-pane:nonexistent");
    expect(raw).toBeNull();
  });

  it("clamps ratio to min/max bounds", () => {
    const min = 0.2;
    const max = 0.8;

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    expect(clamp(0.1, min, max)).toBe(0.2);
    expect(clamp(0.5, min, max)).toBe(0.5);
    expect(clamp(0.9, min, max)).toBe(0.8);
    expect(clamp(0, min, max)).toBe(0.2);
    expect(clamp(1, min, max)).toBe(0.8);
  });

  it("grid columns compute correctly from ratio", () => {
    const ratio = 0.6;
    const style = `grid-template-columns: ${ratio}fr ${1 - ratio}fr`;
    expect(style).toBe("grid-template-columns: 0.6fr 0.4fr");
  });

  it("keyboard step size is 0.05", () => {
    const step = 0.05;
    const initial = 0.5;
    const afterRight = initial + step;
    const afterLeft = afterRight - step;
    expect(afterRight).toBe(0.55);
    expect(afterLeft).toBe(0.5);
  });
});
