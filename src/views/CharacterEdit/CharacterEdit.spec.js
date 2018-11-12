import React from "react";
import { shallow } from "enzyme";

import CharacterEdit from "./CharacterEdit";

describe("CharacterEdit component testing", () => {
  let component;

  beforeEach(() => {
    component = shallow(<CharacterEdit />);
  });

  it("Should render the component", () => {
    expect(component).toHaveLength(1);
  });
});
