import React from "react";
import { render } from "@testing-library/react";
import Tile from "./Tile";

describe("<Tile /> rendering", function () {
  let container: any;

  beforeEach(function () {
    // add a TR to the document created by the test
    // to avoid warnings in the test output
    // about appending a TD to a DIV
    let tr = document.createElement("tr");
    container = document.body.appendChild(tr);
  });

  it("renders without crashing", function () {
    render(<Tile value/>, { container });
  });

  it("matches snapshot when numbered", function () {
    const { asFragment } = render(<Tile value />, { container });
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when empty", function () {
    const { asFragment } = render(<Tile value/>, { container });
    expect(asFragment()).toMatchSnapshot();
  });
});
