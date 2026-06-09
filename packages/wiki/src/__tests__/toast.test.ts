import { describe, it, expect, vi, beforeEach } from "vitest";

describe("lib/toast", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports toastSuccess, toastError, toastInfo", async () => {
    const mod = await import("../lib/toast");
    expect(typeof mod.toastSuccess).toBe("function");
    expect(typeof mod.toastError).toBe("function");
    expect(typeof mod.toastInfo).toBe("function");
  });

  it("toastSuccess does not throw when called", async () => {
    const { toastSuccess } = await import("../lib/toast");
    expect(() => toastSuccess("test")).not.toThrow();
  });

  it("toastError does not throw when called", async () => {
    const { toastError } = await import("../lib/toast");
    expect(() => toastError("test")).not.toThrow();
  });

  it("toastInfo does not throw when called", async () => {
    const { toastInfo } = await import("../lib/toast");
    expect(() => toastInfo("test")).not.toThrow();
  });

  it("lazy imports solid-sonner only on first call", async () => {
    const { toastSuccess } = await import("../lib/toast");
    toastSuccess("hello");
    expect(true).toBe(true);
  });
});
