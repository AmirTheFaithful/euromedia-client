import type { FC, JSX } from "react";

import authLaptop from "@/assets/images/static/auth-laptop.webp";
import authPhone from "@/assets/images/static/auth-phone.webp";

import styles from "./decoContainer.module.scss";

export const DecoContainer: FC = (): JSX.Element => {
  return (
    <div className={styles.decoContainer}>
      <div className={styles.illustration}>
        <picture>
          <source srcSet={authLaptop} media="(min-width: 1024px)" />
          <source srcSet={authPhone} media="(max-width: 1024px)" />
          <img src={authPhone} alt="Setup 2FA" />
        </picture>
      </div>
    </div>
  );
};
