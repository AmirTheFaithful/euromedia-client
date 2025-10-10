import Graz_1 from "@/assets/images/Graz_1.webp";
import Graz_2 from "@/assets/images/Graz_2.webp";
import Prague from "@/assets/images/Prague.webp";
import Hamburg from "@/assets/images/Hamburg.webp";

import { BackgroundImage } from "@/types/backgroundImage.type";

const Data: Array<BackgroundImage> = [
  {
    place: "Graz, Austria",
    author: "Margit Wallner",
    authorLink: "https://pixabay.com/users/wallner-974517/",
    src: Graz_1,
  },
  {
    place: "Graz, Austria",
    author: "Leonhard Niederwimmer",
    authorLink: "https://pixabay.com/users/leonhard_niederwimmer-1131094/",
    src: Graz_2,
  },
  {
    place: "Prague, Check Republic",
    author: "Thang Ha",
    authorLink: "https://pixabay.com/users/tomasha73-20895442/",
    src: Prague,
  },
  {
    place: "Hamburg, Germany",
    author: "Martin Klass",
    authorLink: "https://pixabay.com/users/martinklass-16996710/",
    src: Hamburg,
  },
] as const;

export default Data;
