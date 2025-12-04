import type { JSX } from "react";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { usePhaseContext, PhaseContext } from "../PhaseContext";
import { Button } from "@/components/Button";
import { TextContainer } from "./sub/TextContainer";

import styles from "./metaContainer.module.scss";

export const MetaContainer = (): JSX.Element => {
  const { t } = useTranslation(["colors", "common"]);
  const { phase } = usePhaseContext(PhaseContext);

  return (
    <div className={styles.metaContainer} aria-label="meta-container">
      <TextContainer />
      <motion.div
        initial={{
          y: -60,
          opacity: 0,
        }}
        animate={
          phase === 5 && {
            y: 0,
            opacity: 1,
          }
        }
        transition={{ duration: 1.2, type: "spring" }}
        className={styles.buttonsContainer}
      >
        <Button label={t("colors.setup.confirm")} />
        <Button label={t("common:components.button.skip")} />
      </motion.div>
    </div>
  );
};
