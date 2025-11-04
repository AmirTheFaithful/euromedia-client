import type { JSX, FC } from "react";
import { useTranslation } from "react-i18next";

// Local imports:
import styles from "./picInfo.module.scss";
import type { BackgroundImage } from "@/types/backgroundImage.type"; // Props type.

interface Props {
  image: BackgroundImage;
}

export const PicInfo: FC<Props> = ({ image }): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.picInfo}>
      <h3>{t(image.place)}</h3>
      <a
        href={image.authorLink}
        target="_blank"
        rel="noopener noreferrer"
        title={t("picinfo.author-link", { author: image.author })}
      >
        {image.author}
      </a>
    </div>
  );
};
