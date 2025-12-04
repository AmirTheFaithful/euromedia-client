import type { FC, JSX, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

import { DecoContainer } from "./DecoContainer/DecoContainer";
import { MetaContainer } from "./MetaContainer/MetaContainer";

import styles from "./setup2FA.module.scss";

interface Prop {
  handleStage: MouseEventHandler;
}

export const Setup2FA: FC<Prop> = ({ handleStage }): JSX.Element => {
  const { t } = useTranslation(["auth", "common"]);

  return (
    <section
      className={styles.scene}
      role="region"
      aria-labelledby="setup2fa-title"
    >
      <DecoContainer />
      <MetaContainer handleStage={handleStage} t={t} />
    </section>
  );
};
