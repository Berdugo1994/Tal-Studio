import React from "react";
import ReactDOM from "react-dom";
import Basic from "./comps/basic_test";

import Enzyme, { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
it("renders correctly enzyme", () => {
  const wrapper = shallow(<Basic />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
