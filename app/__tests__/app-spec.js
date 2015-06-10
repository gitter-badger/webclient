import {init} from "../app";
import React from "react";

describe("The main application file", function() {
  it("should have an init function", function() {
    expect(init).toBeFunction();
  });

  it("should call react render", function() {
    spyOn(React, "render");
    init();
    expect(React.render).toHaveBeenCalled();
  });
});
