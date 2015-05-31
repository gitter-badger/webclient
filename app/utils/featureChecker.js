/**
 * List required features and check if available in browser
 */

import Modernizr from "modernizr";

// Feature list
const requiredFeatures = [
  // CSS features
  Modernizr.flexbox,

  // Html5 features
  Modernizr.websockets,
  Modernizr.boxshadow
];

// Browser checker function
export function browserIsCompatible() {
  let compatible = true;
  for (let i = 0; i < requiredFeatures.length; i++) {
    compatible = compatible && requiredFeatures[i];
    if (!compatible) {
      break;
    }
  }

  return compatible;
}
