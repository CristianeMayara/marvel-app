import React from "react";
import { shallow } from "enzyme";

import CharacterDetails from "./CharacterDetails";

describe("CharacterDetails component testing", () => {
  let component;

  beforeEach(() => {
    component = shallow(<CharacterDetails />);
  });

  it("Should render the component", () => {
    expect(component).toHaveLength(1);
  });
});
