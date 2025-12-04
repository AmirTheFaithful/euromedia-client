import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import styles from "../button.module.scss";

import { Button } from "../";

describe("Button component", (): void => {
  it("renders provided label", (): void => {
    render(<Button label="Lego" />);
    expect(screen.getByRole("button", { name: "Lego" })).toBeInTheDocument();
  });

  it("calls onClick when enabled", (): void => {
    const clickHandler = jest.fn();
    render(<Button label="Test" onClick={clickHandler} />);
    fireEvent.click(screen.getByRole("button"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", (): void => {
    const clickHandler = jest.fn();
    render(<Button label="Test" disabled onClick={clickHandler} />);
    fireEvent.click(screen.getByRole("button"));
    expect(clickHandler).not.toHaveBeenCalled();
  });

  it("applies aria-label correctly", (): void => {
    render(<Button label="Un Croissant" ariaLabel="Eat an croissant" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Eat an croissant"
    );
  });

  it("does not render aria-label if not provided.", (): void => {
    render(<Button label="test" />);
    const button: HTMLButtonElement = screen.getByRole("button");
    expect(button).not.toHaveAttribute("aria-label");
  });

  it("applies disabled container class", (): void => {
    const { container } = render(<Button label="test" disabled />);
    const div = container.firstElementChild as HTMLDivElement;
    expect(div).toHaveClass(styles.buttonContainer_disabled);
  });

  it("sets CSS variables when enabled", (): void => {
    const { container } = render(<Button label="test" />);
    const div = container.firstElementChild as HTMLDivElement;
    expect(div.style.getPropertyValue("--color1")).not.toBe("");
    expect(div.style.getPropertyValue("--color2")).not.toBe("");
  });

  it("does not set css properties when disabled", (): void => {
    const { container } = render(<Button label="test" disabled />);
    const div = container.firstElementChild as HTMLDivElement;
    expect(div.style.getPropertyValue("--color1")).toBe("");
    expect(div.style.getPropertyValue("--color2")).toBe("");
  });
});
