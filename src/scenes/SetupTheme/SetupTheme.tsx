import type { JSX } from "react";

import { PhaseContextProvider } from "./PhaseContext";
import { CardsStack } from "./CardStack";
import { MetaContainer } from "./MetaContainer";

import styles from "./setupTheme.module.scss";

export const SetupTheme = (): JSX.Element => {
  return (
    <section className={styles.scene} role="region" aria-label="theme-scene">
      <PhaseContextProvider>
        <CardsStack />
        <MetaContainer />
      </PhaseContextProvider>
    </section>
  );
};
