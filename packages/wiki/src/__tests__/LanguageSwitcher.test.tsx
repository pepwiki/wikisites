// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "solid-testing-library";
import LanguageSwitcher from "../components/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders without crashing", () => {
    const { container } = render(() => <LanguageSwitcher />);
    expect(container).toBeTruthy();
  });

  it("contains a button", () => {
    const { getByRole } = render(() => <LanguageSwitcher />);
    const button = getByRole("button", { name: /select language/i });
    expect(button).toBeTruthy();
  });

  it("has aria-expanded attribute", () => {
    const { getByRole } = render(() => <LanguageSwitcher />);
    const button = getByRole("button", { name: /select language/i });
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });
});
