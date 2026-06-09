import { describe, it, expect } from "vitest";
import { formatTime } from "../components/SessionStats";

describe("formatTime", () => {
  it("returns seconds for < 60s", () => {
    expect(formatTime(0)).toBe("0s");
    expect(formatTime(1000)).toBe("1s");
    expect(formatTime(30000)).toBe("30s");
    expect(formatTime(59000)).toBe("59s");
  });

  it("returns minutes and seconds for 1-59min", () => {
    expect(formatTime(60000)).toBe("1m 0s");
    expect(formatTime(90000)).toBe("1m 30s");
    expect(formatTime(300000)).toBe("5m 0s");
    expect(formatTime(3599000)).toBe("59m 59s");
  });

  it("returns hours and minutes for >= 1h", () => {
    expect(formatTime(3600000)).toBe("1h 0m");
    expect(formatTime(3660000)).toBe("1h 1m");
    expect(formatTime(7200000)).toBe("2h 0m");
    expect(formatTime(86400000)).toBe("24h 0m");
  });

  it("handles negative values gracefully", () => {
    // Math.round(-0.5) = 0, so negative ms < 60000 returns "0s"
    expect(formatTime(-1000)).toBe("-1s");
  });

  it("handles very large values", () => {
    expect(formatTime(86400000 * 7)).toBe("168h 0m");
  });
});
