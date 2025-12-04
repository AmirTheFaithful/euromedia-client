import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SetupTheme } from "..";

import styles from "../setupTheme.module.scss";

describe("SetupTheme scene", (): void => {
  it("render section tag with 'scene' className", (): void => {
    const { container } = render(<SetupTheme />);
    const scene = container.firstElementChild;

    expect(scene).toHaveClass(styles.scene);
    expect(scene).toHaveAttribute("role", "region");
    expect(scene).toHaveAttribute("aria-label", "theme-scene");
  });

  it("contains CardStack and MetaContainer subcomponents", (): void => {
    render(<SetupTheme />);
    const scene = screen.getByLabelText("theme-scene");
    const cardStack = scene.firstElementChild;
    const metaContainer = scene.lastElementChild;

    expect(cardStack).toHaveAttribute("aria-label", "stack-container");
    expect(metaContainer).toHaveAttribute("aria-label", "meta-container");
  });
});
