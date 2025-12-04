import type { JSX } from "react";

import { motion } from "motion/react";

import { usePhaseContext, PhaseContext } from "../../PhaseContext";

import styles from "./textContainer.module.scss";

export const TextContainer = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Title />
      <Subtitle />
    </div>
  );
};

export const Title = (): JSX.Element => {
  const { phase, setPhase } = usePhaseContext(PhaseContext);

  return (
    <motion.p
      onAnimationComplete={() => setPhase(4)}
      className={styles.title}
      animate={
        phase >= 3 && {
          opacity: 1,
          y: 0,
        }
      }
      initial={{
        opacity: 0,
        y: -40,
      }}
      transition={{ duration: 1.2, type: "spring" }}
    >
      Select coloristic signature
    </motion.p>
  );
};

export const Subtitle = (): JSX.Element => {
  const { phase, setPhase } = usePhaseContext(PhaseContext);

  return (
    <motion.p
      className={styles.subtitle}
      onAnimationComplete={() => setPhase(5)}
      animate={
        phase === 4 && {
          opacity: 1,
          y: 0,
        }
      }
      initial={{
        opacity: 0,
        y: -40,
      }}
      transition={{ duration: 1.2, type: "spring" }}
    >
      As you prefer
    </motion.p>
  );
};
