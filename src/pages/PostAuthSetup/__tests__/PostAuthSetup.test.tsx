import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PostAuthSetup from "../";

/* Mocking parts of the page's body. */
jest.mock("../sub/DecoContainer/DecoContainer.tsx", () => ({
  DecoContainer: () => <section data-testid="deco-container" />,
}));

jest.mock("../sub/MetaContainer/MetaContainer.tsx", () => ({
  MetaContainer: () => <section data-testid="meta-container" />,
}));

describe("PostAuthSetup", (): void => {
  it("renders Deco and Meta сontainers", () => {
    render(<PostAuthSetup />);
    expect(screen.getByTestId("deco-container")).toBeInTheDocument();
    expect(screen.getByTestId("meta-container")).toBeInTheDocument();
  });
});
