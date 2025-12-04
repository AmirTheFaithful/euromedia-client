import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TFunction } from "i18next";

import styles from "../setup2FA.module.scss";

import { Setup2FA } from "../Setup2FAScene";
import { DecoContainer } from "../DecoContainer/DecoContainer";
import { MetaContainer } from "../MetaContainer/MetaContainer";

describe("Setup2FA Scene", (): void => {
  it("renders section with Deco and Meta containers", (): void => {
    const handleStage = jest.fn();
    const { container } = render(<Setup2FA handleStage={handleStage} />);

    const scene = container.firstElementChild;
    const deco = scene.firstElementChild as HTMLDivElement;
    const meta = scene.lastElementChild as HTMLDivElement;

    expect(container.querySelector("section")).toHaveClass(styles.scene);
    expect(screen.getByText("post-auth.title")).toBeInTheDocument();

    expect(scene).toHaveClass(styles.scene);
    expect(deco).toHaveClass(styles.decoContainer);
    expect(meta).toHaveClass(styles.metaContainer);
  });

  it("MetaContainer buttons trigger stage change handler", (): void => {
    const handleStage = jest.fn();
    const t = ((key: string) => key) as unknown as TFunction<"auth", unknown>;
    render(<MetaContainer t={t} handleStage={handleStage} />);

    const skipButton = screen.getByRole("button", {
      name: "post-auth.skip-btn",
    });
    fireEvent.click(skipButton);
    expect(handleStage).toHaveBeenCalledTimes(1);
  });

  it("DecoContainer renders picture and img with alt", (): void => {
    render(<DecoContainer />);
    expect(screen.getByAltText("Setup 2FA")).toBeInTheDocument();
  });
});
