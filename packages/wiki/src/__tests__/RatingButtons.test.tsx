// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "solid-testing-library";
import RatingButtons from "../components/ui/RatingButtons";
import { Rating } from "@wikisites/query/fsrs";

afterEach(cleanup);

describe("RatingButtons", () => {
  it("renders all four rating buttons", () => {
    render(() => <RatingButtons onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: /Rate: Again/ })).toBeDefined();
    expect(screen.getByRole("button", { name: /Rate: Hard/ })).toBeDefined();
    expect(screen.getByRole("button", { name: /Rate: Good/ })).toBeDefined();
    expect(screen.getByRole("button", { name: /Rate: Easy/ })).toBeDefined();
  });

  it("calls onSelect with correct rating when button clicked", () => {
    const onSelect = vi.fn();
    render(() => <RatingButtons onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /Rate: Again/ }));
    expect(onSelect).toHaveBeenCalledWith(Rating.Again);
    fireEvent.click(screen.getByRole("button", { name: /Rate: Good/ }));
    expect(onSelect).toHaveBeenCalledWith(Rating.Good);
    fireEvent.click(screen.getByRole("button", { name: /Rate: Easy/ }));
    expect(onSelect).toHaveBeenCalledWith(Rating.Easy);
  });

  it("applies sm size classes when size=sm", () => {
    const { container } = render(() => <RatingButtons onSelect={() => {}} size="sm" />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(4);
    for (const btn of buttons) {
      expect(btn.className).toContain("text-sm");
    }
  });

  it("applies md size classes by default", () => {
    const { container } = render(() => <RatingButtons onSelect={() => {}} />);
    const buttons = container.querySelectorAll("button");
    for (const btn of buttons) {
      expect(btn.className).toContain("font-medium");
    }
  });
});
