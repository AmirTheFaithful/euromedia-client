import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DecoContainer } from "../DecoContainer";

describe("DecoContainer", (): void => {
  it("renders image with correct alt text", () => {
    render(<DecoContainer />);
    const image = screen.getByAltText("Setup 2FA");
    expect(image).toBeInTheDocument();
  });

  it("contains picture sources for laptop and cellphone", () => {
    render(<DecoContainer />);
    const sources = screen.getAllByRole("img", { hidden: true });
    expect(sources).toBeTruthy();
  });
});
