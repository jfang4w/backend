import validator from "validator";

import {
    getData
} from "../data.js";

/** Check if the given email is valid
 *
 * @param {string} email - The email that is being tested
 * @return {boolean} Returns true if the email is valid, otherwise false
 */
export function isValidEmail(email) {
    return validator.isEmail(email);
}
  
/** Check if the given password is valid
 * (6 or more characters and must includes at least one letter and one number)
 *
 * @param {string} password - The password that is being tested
 * @return {boolean} Return true if the password is valid, otherwise false
 */
export function isValidPassword(password) {
    return /^(?=.{6,})(?=.*[0-9])(?=.*[A-Za-z])/.test(password);
}

export function isValidUsername(username) {
    return /^[a-zA-Z0-9-]{3,}/.test(username);
}

/** Check if the given name is valid
 * (2 to 20 characters and only includes letters, spaces, hyphens, and apostrophes)
 *
 * @param {string} name - The name that is being tested
 * @return {boolean} Returns true if the name is valid, otherwise false
 */
export function isValidName(name) {
    return /^[a-zA-Z-' ]{2,20}$/.test(name);
}
