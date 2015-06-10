// Fetch polyfill
import "fetch";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import React from "react";
import AppContainer from "./components/core/appContainer";

/**
 * Starts the leavylip application and attaches it to the document body.
 * @method init
 */
export function init() {
  React.render(<AppContainer/>, document.body);
}
