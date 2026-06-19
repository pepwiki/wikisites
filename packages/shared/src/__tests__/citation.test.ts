import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  validateDOI,
  validatePMID,
  validateCitation,
  isCitationResolvable,
} from "../validation/citation";

// ---------------------------------------------------------------------------
// validateDOI
// ---------------------------------------------------------------------------
describe("validateDOI", () => {
  it("accepts valid DOI format", () => {
    expect(validateDOI("10.1016/j.redox.2024.103101")).toBe(true);
    expect(validateDOI("10.1234/test")).toBe(true);
    expect(validateDOI("10.1000/182")).toBe(true);
  });

  it("rejects DOI without 10. prefix", () => {
    expect(validateDOI("1234/test")).toBe(false);
  });

  it("rejects DOI with spaces", () => {
    expect(validateDOI("10.1234/test value")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateDOI("")).toBe(false);
  });

  it("rejects non-DOI strings", () => {
    expect(validateDOI("not-a-doi")).toBe(false);
    expect(validateDOI("https://doi.org/10.1234/test")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// validatePMID
// ---------------------------------------------------------------------------
describe("validatePMID", () => {
  it("accepts numeric strings", () => {
    expect(validatePMID("12345678")).toBe(true);
    expect(validatePMID("1")).toBe(true);
    expect(validatePMID("0")).toBe(true);
  });

  it("rejects non-numeric strings", () => {
    expect(validatePMID("abc")).toBe(false);
    expect(validatePMID("12ab")).toBe(false);
    expect(validatePMID("PMID123")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validatePMID("")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// validateCitation
// ---------------------------------------------------------------------------
describe("validateCitation", () => {
  it("accepts valid DOI only", () => {
    const result = validateCitation({ doi: "10.1234/test" });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts valid PMID only", () => {
    const result = validateCitation({ pmid: "12345" });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts valid URL only", () => {
    const result = validateCitation({ url: "https://example.com" });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts citation with all fields", () => {
    const result = validateCitation({
      doi: "10.1234/test",
      pmid: "12345",
      url: "https://example.com",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects citation with no fields", () => {
    const result = validateCitation({});
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("at least one");
  });

  it("reports invalid DOI format", () => {
    const result = validateCitation({ doi: "invalid" });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("DOI"))).toBe(true);
  });

  it("reports invalid PMID format", () => {
    const result = validateCitation({ pmid: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("PMID"))).toBe(true);
  });

  it("reports multiple errors", () => {
    const result = validateCitation({ doi: "bad", pmid: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// isCitationResolvable
// ---------------------------------------------------------------------------
describe("isCitationResolvable", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns resolvable=true for successful DOI fetch", async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }));
    const result = await isCitationResolvable({ doi: "10.1234/test" });
    expect(result.resolvable).toBe(true);
    expect(result.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://doi.org/10.1234/test",
      expect.objectContaining({ method: "HEAD" }),
    );
  });

  it("returns resolvable=false for failed DOI fetch", async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 404 }));
    const result = await isCitationResolvable({ doi: "10.1234/missing" });
    expect(result.resolvable).toBe(false);
    expect(result.status).toBe(404);
  });

  it("returns resolvable=true for successful PMID fetch", async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }));
    const result = await isCitationResolvable({ pmid: "12345" });
    expect(result.resolvable).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://pubmed.ncbi.nlm.nih.gov/12345/",
      expect.objectContaining({ method: "HEAD" }),
    );
  });

  it("returns resolvable=false on network error", async () => {
    fetchSpy.mockRejectedValue(new Error("Network error"));
    const result = await isCitationResolvable({ doi: "10.1234/test" });
    expect(result.resolvable).toBe(false);
    expect(result.status).toBe(0);
  });

  it("returns resolvable=false when no identifiers provided", async () => {
    const result = await isCitationResolvable({});
    expect(result.resolvable).toBe(false);
    expect(result.status).toBe(0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches URL citation", async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }));
    const result = await isCitationResolvable({ url: "https://example.com" });
    expect(result.resolvable).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://example.com",
      expect.objectContaining({ method: "HEAD" }),
    );
  });
});
