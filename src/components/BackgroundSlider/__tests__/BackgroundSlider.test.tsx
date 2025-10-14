import { render, screen } from "@testing-library/react";
import { act } from "react";
import { BackgroundSlider } from "../slider";
import { BackgroundImage } from "@/types/backgroundImage.type";

// Mocking array of background images located in utils/backrounds.
jest.mock("../../../utils/backgrounds", (): BackgroundImage[] => [
  {
    src: "Stockholm_1.webp",
    place: "Stockholm, Sweden",
    author: "Jacob Lindgren",
    authorLink: "#",
  },
  {
    src: "Copenhagen_5.webp",
    place: "Copenhagen, Denmark",
    author: "Erik Laustrup",
    authorLink: "#",
  },
]);

// Mocking PicInfo component to avoid direct testing, as it is a tiny component.
jest.mock("../sub/PicInfo", () => ({
  PicInfo: () => <div data-testid="pic-info">PicInfoMock</div>,
}));

describe("BackgroundSlider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Renders all background images", () => {
    render(<BackgroundSlider />);
    const slides = screen.getAllByTestId("bg-image");
    expect(slides.length).toBe(2);
  });

  it("Displays first slide active at the start", () => {
    render(<BackgroundSlider />);
    const slides = screen.getAllByTestId("bg-image");
    expect(slides[0].style.backgroundImage).toContain("Stockholm_1.webp");
  });

  it("Shifts the slide after an interval", () => {
    render(<BackgroundSlider />);
    act(() => {
      jest.advanceTimersByTime(12000);
    });
    const slides = screen.getAllByTestId("bg-image");
    expect(slides[1].style.backgroundImage).toContain("Copenhagen_5.webp");
  });

  it("Clears interval after the end", () => {
    const clearSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = render(<BackgroundSlider />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
