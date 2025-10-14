import type { JSX, FC } from "react";
import { useEffect, useState } from "react";
import { PicInfo } from "./sub/PicInfo";
import styles from "./slider.module.scss";

import images from "../../utils/backgrounds";

const SLIDE_INTERVAL_MS: number = 12000;

export const BackgroundSlider: FC = (): JSX.Element => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.backgroundSlider}
      role="region"
      aria-roledescription="slideshow"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.bgImage} ${
            index === current ? `${styles.active}` : ""
          }`}
          style={{ backgroundImage: `url(${image.src})` }}
          data-testid="bg-image"
          aria-label={`${image.place} by ${image.author}`}
        >
          <PicInfo image={image} />
        </div>
      ))}
    </div>
  );
};
