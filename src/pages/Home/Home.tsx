import type { JSX } from "react";

import styles from "./home.module.scss";

import { Hero } from "./sub/Hero";

const Home = (): JSX.Element => {
  return (
    <main className={styles.home}>
      <Hero />
    </main>
  );
};

export default Home;
