import type { JSX } from "react";
import type {
  TargetAndTransition,
  VariantLabels,
  LegacyAnimationControls,
} from "motion/react";
import { motion } from "motion/react";

import { usePhaseContext, PhaseContext } from "../PhaseContext";
import { useOrientation } from "@/hooks/useOrientation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "./cardsStack.module.scss";

const colors: string[][] = [
  ["#d0246eff", "#27ff"],
  ["#4ee556ff", "#fe941aff"],
  ["#2268ffff", "#e04c51ff"],
  ["#121826", "#a0bcfdff"],
  ["#1893eaff", "#f48200ff"],
] as const;

type AnimationConfig =
  | boolean
  | TargetAndTransition
  | VariantLabels
  | LegacyAnimationControls;

const spreadAnimationConfig = (
  index: number,
  portrait: boolean
): AnimationConfig => {
  return portrait ? { y: index * 30 } : { x: index * 50 };
};

const rotateAnimationConfig = (index: number): AnimationConfig => ({
  rotate: index * -22,
  x: index * 50,
  y: index * 50,
});

// Container of the Card elements, which renders either desktop/portrait layout, otherwise landscape for mobile's landscape mode.
export const CardsStack = (): JSX.Element => {
  const isPortrait = useOrientation();
  const isDesktop = useMediaQuery();

  return (
    <div className={styles.stack} aria-label="stack-container">
      {isPortrait || isDesktop ? <PortraitOrDesktop /> : <Landscape />}
    </div>
  );
};

// Shows only two steps of the cards animations: spread and rotate.
const PortraitOrDesktop = (): JSX.Element => {
  const { phase, setPhase } = usePhaseContext(PhaseContext);

  return (
    <div className={styles.stack} aria-label="stack-portrait-desktop">
      {colors.map((colorsPair, index) => (
        <motion.div
          // Handle two phases - spread and rotate.
          onAnimationComplete={() => {
            // On initial phase, before all animation plays,
            // only the last card triggers switch to the second
            // and last phase - rotate animation..
            if (index === colors.length - 1) {
              setPhase(2);
            } else {
              // On the next cycle, launch third phase, which
              // is animatoin of texts into another component.
              if (phase === 2) {
                setPhase(3);
              }
            }
          }}
          animate={
            phase === 1
              ? spreadAnimationConfig(index, true)
              : rotateAnimationConfig(index)
          }
          key={index}
          transition={{ duration: 1.2 }}
          className={styles.card}
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${colorsPair[0]}, ${colorsPair[1]})`,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

// Shows a single step of animation - spread only, due to small height of the screen.
const Landscape = (): JSX.Element => {
  const { phase, setPhase } = usePhaseContext(PhaseContext);

  return (
    <div className={styles.stack} aria-label="stack-landscape">
      {colors.map((colorsPair, index) => (
        <motion.div
          // When the animation is completed -
          // set third phase that triggers text
          // animations in another component.
          onAnimationComplete={() => {
            if (index === colors.length - 1) {
              setPhase(3);
            }
          }}
          animate={phase === 2 && spreadAnimationConfig(index, false)}
          key={index}
          transition={{ duration: 1.2 }}
          className={styles.card}
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${colorsPair[0]}, ${colorsPair[1]})`,
          }}
        ></motion.div>
      ))}
    </div>
  );
};
