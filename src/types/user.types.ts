/**
 * Represents a registered user in the system.
 *
 * This interface extends Mongoose's `Document` to provide access to model methods.
 *
 * @interface User
 *
 * @property {UserMeta} meta - Public-facing profile information of the user.
 * @property {UserAuth} auth - Credentials and verification status.
 * @property {UserLocation} [location] - Optional geographical location of the user.
 */
export interface User {
  meta: UserMeta;
  location?: UserLocation;
}

/**
 * Represents an array of `User` documents.
 *
 * Useful for query results and bulk operations.
 *
 * @typedef {User[]} Users
 */
export type Users = User[];

/**
 * Contains the user's name-related metadata.
 *
 * @interface UserMeta
 * @property {string} firstname - The user's given name.
 * @property {string} lastname - The user's family name.
 */
export interface UserMeta {
  firstname: string;
  lastname: string;
}

/**
 * Optional geographical information for a user.
 *
 * @interface UserLocation
 * @property {string} country - Country of residence.
 * @property {string} city - City of residence.
 */
export interface UserLocation {
  country: string;
  city: string;
}
