// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "solid-testing-library";
import FlipCard from "../components/ui/FlipCard";

afterEach(cleanup);

describe("FlipCard", () => {
  it("renders front and back content", () => {
    render(() => (
      <FlipCard
        flipped={false}
        front={<span>Front content</span>}
        back={<span>Back content</span>}
      />
    ));
    expect(screen.getByText("Front content")).toBeDefined();
    expect(screen.getByText("Back content")).toBeDefined();
  });

  it("applies rotate-y-180 class when flipped=true", () => {
    const { container } = render(() => (
      <FlipCard flipped={true} front={<span>Front</span>} back={<span>Back</span>} />
    ));
    const inner = container.querySelector("[class*='preserve-3d']");
    expect(inner?.className).toContain("rotate-y-180");
  });

  it("does not apply rotate-y-180 class when flipped=false", () => {
    const { container } = render(() => (
      <FlipCard flipped={false} front={<span>Front</span>} back={<span>Back</span>} />
    ));
    const inner = container.querySelector("[class*='preserve-3d']");
    expect(inner?.className).not.toContain("rotate-y-180");
  });

  it("calls onFlip when clicked", () => {
    const onFlip = vi.fn();
    render(() => (
      <FlipCard
        flipped={false}
        front={<span>Front</span>}
        back={<span>Back</span>}
        onFlip={onFlip}
      />
    ));
    fireEvent.click(screen.getByRole("button"));
    expect(onFlip).toHaveBeenCalledOnce();
  });

  it("has role=button when interactive", () => {
    render(() => (
      <FlipCard
        flipped={false}
        front={<span>Front</span>}
        back={<span>Back</span>}
        interactive={true}
      />
    ));
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("applies custom height class", () => {
    const { container } = render(() => (
      <FlipCard flipped={false} front={<span>Front</span>} back={<span>Back</span>} height="h-64" />
    ));
    const card = container.firstElementChild;
    expect(card?.className).toContain("h-64");
  });

  it("sets aria-label", () => {
    render(() => (
      <FlipCard
        flipped={false}
        front={<span>Front</span>}
        back={<span>Back</span>}
        ariaLabel="Test card"
      />
    ));
    expect(screen.getByRole("button").getAttribute("aria-label")).toBe("Test card");
  });
});
