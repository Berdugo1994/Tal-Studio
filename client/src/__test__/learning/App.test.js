import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

it("simplest test ", () => {
  expect(2 + 2).toEqual(4);
});
