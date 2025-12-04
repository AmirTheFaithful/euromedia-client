import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import type { AnimationPhase } from "../../types";
import { normalizeZero } from "@/utils/numbers";

// "lever" variables to simulate multiple mocks scenarios.
let mockOrientation: boolean;
let mockMediaQuery: boolean;
let mockPhase: number;
let mockSetPhase: jest.Mock<any, any, any>;

// Mocking custom-defined media hooks.
// Simulate desktop or portrait viewport.
jest.mock("@/hooks/useOrientation", () => ({
  useOrientation: () => mockOrientation,
}));

jest.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => mockMediaQuery,
}));

// Mock custom-defined usePhaseContext hook.
jest.mock("../../PhaseContext", () => ({
  usePhaseContext: () => ({
    phase: mockPhase,
    setPhase: mockSetPhase,
  }),
  PhaseContext: {},
}));

// Mock framer-motion's onAnimationComplete callback.
jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    motion: {
      div: ({ animate, children, ...rest }: any) => {
        return (
          <div {...rest} data-animate={JSON.stringify(animate)}>
            {children}
          </div>
        );
      },
    },
  };
});

import { CardsStack } from "..";

import styles from "../cardsStack.module.scss";

describe("CardsStack in desktop or portrait mode", (): void => {
  beforeEach(() => {
    // Reset mock variables values before every test.
    mockMediaQuery = false;
    mockOrientation = true;
    mockPhase = 1;
    mockSetPhase = jest.fn();
  });

  it("renders PortraitOrDesktop subcomponent when portrait or desktop", (): void => {
    // Simulate desktop or portrait viewport.
    mockMediaQuery = false;
    mockOrientation = true;

    render(<CardsStack />);
    const container = screen.getByLabelText("stack-container");
    const stack = container.firstElementChild;

    expect(stack).toHaveAttribute("aria-label", "stack-portrait-desktop");
  });

  it("renders PortraitOrDesktop when desktop even if not portrait", () => {
    mockOrientation = false;
    mockMediaQuery = true;
    render(<CardsStack />);
    expect(screen.getByLabelText("stack-portrait-desktop")).toBeInTheDocument();
  });

  it("renders Landscape subcomponent", (): void => {
    // Simulate landscape mobile viewport behavior.
    mockMediaQuery = false;
    mockOrientation = false;

    render(<CardsStack />);
    const container = screen.getByLabelText("stack-container");
    const stack = container.firstElementChild;

    expect(stack).toHaveAttribute("aria-label", "stack-landscape");
  });

  it("renders correct amount of cards", (): void => {
    const { container } = render(<CardsStack />);
    expect(container.getElementsByClassName(styles.card)).toHaveLength(5);
  });

  it("uses spreadAnimationConfig for phase=1", (): void => {
    mockPhase = 1;
    mockOrientation = true;

    const { container } = render(<CardsStack />);
    const cardsCollection: HTMLCollectionOf<Element> =
      container.getElementsByClassName(styles.card);
    const cards: Element[] = Array.from(cardsCollection);

    cards.forEach((card, index) => {
      const animateAttribute = JSON.parse(card.getAttribute("data-animate"));
      expect(animateAttribute).toEqual({ y: index * 30 });
    });
  });

  it("uses rotateAnimationConfig for phase=2", (): void => {
    mockPhase = 2;
    mockOrientation = true;

    const { container } = render(<CardsStack />);
    const cardsCollection: HTMLCollectionOf<Element> =
      container.getElementsByClassName(styles.card);
    const cards: Element[] = Array.from(cardsCollection);

    cards.forEach((card, index) => {
      const animateAttribute = JSON.parse(card.getAttribute("data-animate"));
      expect(animateAttribute).toEqual({
        rotate: normalizeZero(index * -22),
        x: index * 50,
        y: index * 50,
      });
    });
  });

  it("sets next phase after last animation frame", (): void => {
    interface Scenario {
      phase: AnimationPhase;
      nextPhase?: AnimationPhase;
    }

    const scenarios: Scenario[] = [
      {
        phase: 1,
        nextPhase: 2,
      },
      {
        phase: 2,
        nextPhase: 3,
      },
      {
        phase: 3,
        nextPhase: 4,
      },
      {
        phase: 4,
        nextPhase: 5,
      },
      {
        phase: 5,
        nextPhase: 6,
      },
    ];

    scenarios.forEach(({ phase, nextPhase }) => {
      render(<CardsStack />);
      mockSetPhase(phase + 1);
      expect(mockSetPhase).toHaveBeenCalledWith(nextPhase);
    });

    expect(mockSetPhase).toHaveBeenCalledTimes(5);
  });
});
