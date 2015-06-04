/**
 * List required features and check if available in the browser.
 * Uses
 *
 * @class featureChecker
 * @requires Modernizr
 * @author wilbert.ridder@gmail.com (Wilbert van de Ridder)
 */
import Modernizr from "modernizr";

/**
 * List of required features.
 *
 * @attribute requiredFeatures
 * @type {string[]}
 * @private
 */
const requiredFeatures = [
  // CSS features
  "flexbox", // http://caniuse.com/#feat=flexbox
  "boxshadow", // http://caniuse.com/#feat=css-boxshadow

  // Html5 features
  "websockets" // http://caniuse.com/#feat=websockets
];

/**
 * Returns true if the browser supports all required features.
 *
 * @method browserIsCompatible
 * @return {boolean} True if browser is compatible.
 */
export function browserIsCompatible() {
  let compatible = true;
  for (let i = 0; i < requiredFeatures.length; i++) {
    compatible = compatible && Modernizr[requiredFeatures[i]];
    if (!compatible) {
      break;
    }
  }

  return compatible;
}

/**
 * Return list of required features
 *
 * @method getRequiredFeatures
 * @return {string[]} Array of feature strings.
 */
export function getRequiredFeatures() {
  return requiredFeatures;
}
