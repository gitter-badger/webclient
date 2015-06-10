// Feature checker
import {browserIsCompatible} from "./utils/featureChecker";

// Loading message update
document.getElementById("placeholder").innerHTML = "Checking browser compatibility";

// Check browser compatible
if (browserIsCompatible()) {
  document.getElementById("placeholder").innerHTML = "Loading LeavyLip...";
  System.import("./app/app").then(function(app) {
    app.init();
  });
}
else {
  console.warn("Browser does not support all required features.");
}
