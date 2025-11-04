import { useTranslation } from "react-i18next";

import styles from "./hero.module.scss";

export const Hero = () => {
  const { t, i18n } = useTranslation("home");

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroText}>Euro</h1>
      <p className={styles.heroDescription}>{t("hero.subtitle")}</p>
    </section>
  );
};
