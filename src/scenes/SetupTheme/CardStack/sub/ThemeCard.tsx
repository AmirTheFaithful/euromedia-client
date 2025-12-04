import type { FC, JSX } from "react";
import { motion } from "motion/react";

interface Props {
  color1: string;
  color2: string;
}

import styles from "./themeCard.module.scss";

export const ThemeCard: FC<Props> = ({ color1, color2 }): JSX.Element => {
  return (
    <motion.div
      className={styles.card}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})`,
      }}
    ></motion.div>
  );
};
