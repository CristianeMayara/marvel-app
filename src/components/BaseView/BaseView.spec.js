import React from "react";
import { shallow } from "enzyme";

import BaseView from "./BaseView";

describe("BaseView component testing", () => {
  let component;

  beforeEach(() => {
    component = shallow(<BaseView />);
  });

  it("Should render the component", () => {
    expect(component).toHaveLength(1);
  });
});
