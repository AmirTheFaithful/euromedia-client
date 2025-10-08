import { render } from "@testing-library/react";

import { LoadingFallback } from "../LoadingFallback";

describe("LoadingFallback", (): void => {
  it("renders correctly", (): void => {
    const { container } = render(<LoadingFallback />);
    expect(container).toMatchSnapshot();
  });
});
