import Graz_1 from "@/assets/images/places/Graz_1.webp";
import Graz_2 from "@/assets/images/places/Graz_2.webp";
import Prague from "@/assets/images/places/Prague.webp";
import Hamburg from "@/assets/images/places/Hamburg.webp";

import { BackgroundImage } from "@/types/backgroundImage.type";

const Data: Array<BackgroundImage> = [
  {
    place: "picinfo.places.graz",
    author: "Margit Wallner",
    authorLink: "https://pixabay.com/users/wallner-974517/",
    src: Graz_1,
  },
  {
    place: "picinfo.places.graz",
    author: "Leonhard Niederwimmer",
    authorLink: "https://pixabay.com/users/leonhard_niederwimmer-1131094/",
    src: Graz_2,
  },
  {
    place: "picinfo.places.prague",
    author: "Thang Ha",
    authorLink: "https://pixabay.com/users/tomasha73-20895442/",
    src: Prague,
  },
  {
    place: "picinfo.places.hamburg",
    author: "Martin Klass",
    authorLink: "https://pixabay.com/users/martinklass-16996710/",
    src: Hamburg,
  },
] as const;

export default Data;
