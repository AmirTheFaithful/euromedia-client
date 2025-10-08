import type { JSX, FC } from "react";

import E from "@/icons/e.svg?react";
import U from "@/icons/u.svg?react";
import R from "@/icons/r.svg?react";
import O from "@/icons/o.svg?react";

import styles from "./loadingFallback.module.scss";

export const LoadingFallback: FC = (): JSX.Element => {
  return (
    <main className={styles.page} role="status" aria-label="Loading content...">
      <div className={styles.signature}>
        <E />
        <U />
        <R />
        <O />
      </div>
    </main>
  );
};
