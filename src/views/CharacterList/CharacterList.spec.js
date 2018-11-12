import React from "react";
import { shallow } from "enzyme";

import CharacterList from "./CharacterList";

describe("CharacterList component testing", () => {
  let component;

  beforeEach(() => {
    component = shallow(<CharacterList />);
  });

  it("Should render the component", () => {
    expect(component).toHaveLength(1);
  });
});
