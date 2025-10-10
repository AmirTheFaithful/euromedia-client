/**
 * Represents metadata for a background image used within the application.
 * Provides both source and attribution information to ensure proper crediting.
 *
 * @interface BackgroundImage
 * @property src - The file path or URL of the background image.
 * @property place - A short description or name of the location depicted in the image.
 * @property author - The full name or username of the photographer or creator.
 * @property authorLink - A direct link to the author’s profile or source page.
 *
 * @example
 * const bg: BackgroundImage = {
 *   src: "/assets/images/vienna.webp",
 *   place: "Vienna, Austria",
 *   author: "John Doe",
 *   authorLink: "https://unsplash.com/@johndoe",
 * };
 */
export interface BackgroundImage {
  src: string;
  place: string;
  author: string;
  authorLink: string;
}
