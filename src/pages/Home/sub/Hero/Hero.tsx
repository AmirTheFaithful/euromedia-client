import styles from "./hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroText}>Euro</h1>
      <p className={styles.heroDescription}>
        A modern european social network.
      </p>
    </section>
  );
};
