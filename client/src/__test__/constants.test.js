import React from "react";
import ReactDOM from "react-dom";
import * as DEBUG_CONSTANTS from "../constants/debug";
import { render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("LAN constant should be false on production", () => {
  expect(DEBUG_CONSTANTS.LAN).toBe("false");
});
it("DEBUG constant should be false on production", () => {
  expect(DEBUG_CONSTANTS.DEBUG).toBe(false);
});
