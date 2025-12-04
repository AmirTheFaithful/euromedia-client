import type { JSX, FC, MouseEventHandler } from "react";
import type { TFunction } from "i18next";

import styles from "./metaContainer.module.scss";

import { Button } from "@/components/Button";

interface Prop {
  t: TFunction<"auth", unknown>;
  handleStage: MouseEventHandler<HTMLButtonElement>;
}

export const MetaContainer: FC<Prop> = ({ t, handleStage }): JSX.Element => {
  return (
    <div className={styles.metaContainer}>
      <h3 className={styles.title} id="setup2fa-title">
        {t("post-auth.title")}
      </h3>

      <div className={styles.buttonsContainer}>
        <Button label={t("post-auth.setup-btn")} />
        <Button
          label={t("common:components.button.skip")}
          onClick={handleStage}
        />
      </div>
    </div>
  );
};
