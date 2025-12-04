import type { TFunction } from "i18next";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MetaContainer } from "../MetaContainer";

describe("MetaContainer", () => {
  const t = ((key: string) => key) as unknown as TFunction<"auth", unknown>;

  it("renders title and two buttons", () => {
    const handleStage = jest.fn();
    render(<MetaContainer t={t} handleStage={handleStage} />);

    expect(screen.getByText("post-auth.title")).toBeInTheDocument();
    expect(screen.getByText("post-auth.setup-btn")).toBeInTheDocument();
    expect(screen.getByText("post-auth.skip-btn")).toBeInTheDocument();
  });
});
