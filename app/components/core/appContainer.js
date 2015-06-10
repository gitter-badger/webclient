/**
 * Main container.
 * @class appContainer
 */
import React from "react";

// Material ui
import Mui from "material-ui";
const ThemeManager = Mui.Styles.ThemeManager();

// Application container
const AppContainer = React.createClass({
  displayName: "AppContainer",
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Mui.Styles.Colors.deepOrange500
    });
  },
  render: function() {
    return (
      <div>
        <p>Hello world!</p>
        <Mui.RaisedButton disabled={true} label="Register now!"/>
      </div>
    );
  }
});

export default AppContainer;
