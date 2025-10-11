import type { JSX, FC } from "react";

// Local imports:
import styles from "./picInfo.module.scss";
import type { BackgroundImage } from "@/types/backgroundImage.type"; // Props type.

interface Props {
  image: BackgroundImage;
}

export const PicInfo: FC<Props> = ({ image }): JSX.Element => {
  return (
    <div className={styles.picInfo}>
      <h3>{image.place}</h3>
      <a
        href={image.authorLink}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${image.author}'s page`}
      >
        {image.author}
      </a>
    </div>
  );
};
