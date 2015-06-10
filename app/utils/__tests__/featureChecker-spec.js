import Modernizr from "modernizr";
import {browserIsCompatible, getRequiredFeatures} from "../featureChecker";
describe("A featureChecker", function() {
  beforeEach(function() {
    Modernizr.flexbox = true;
    Modernizr.boxshadow = true;
    Modernizr.websockets = true;
  });

  it("should return true for modernizr checks assuming all are available", function() {
    let compatible = browserIsCompatible();
    expect(compatible).toBe(true);
  });

  it("should return false if a feature is missing", function() {
    // Set flexbox feature to false
    Modernizr.flexbox = false;

    // Check browser compatibility again.
    let compatible = browserIsCompatible();
    expect(compatible).toBe(false);
  });

  it("should return an array of required features", function() {
    let required = getRequiredFeatures();
    expect(required).toBeNonEmptyArray();
    expect(required).toBeArrayOfStrings();
  });
});
