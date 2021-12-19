import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

let size = {nrows: 0, ncols: 0}
describe("<Board /> rendering", function () {
  describe("inital board and win state", function () {
    it("renders without crashing", function () {
      render(<Board />);
    });

    it("doesn't match snapshot for full board as nums are random", function () {
      const { asFragment } = render(<Board size />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("tile click", function () {
    it("moves tiles correctly", function () {
      const { getAllByRole } = render(
          <Board nrows={4} ncols={4} />,
      );
      const tiles = getAllByRole("button");

      // click on the second tile
      fireEvent.click(tiles[15]);

      // second and fourth tile should switch places
      let numberedIndices = [15];
      tiles.forEach((tile, idx) => {
        if (numberedIndices.includes(idx)) {
          expect(tile).toHaveClass("Tile-empty");
        } else {
          expect(tile).not.toHaveClass("Tile-empty");
        }
      });
    });
  });
});
