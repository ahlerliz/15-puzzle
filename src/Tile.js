import React from "react";
import "./Tile.css";

/** A single tile on the board.
 *
 * This has no state --- just two props:
 *
 * - moveTilesHere: a function rec'd from the board which moves tiles 
 *        based on the clicked tile
 *
 * - value: number 1-15 or null
 *
 * This handles clicks --- by calling moveTilesHere
 *
 **/

function Tile({ moveTilesHere, value }) {
  const classes = `Tile ${value ? "" : "Tile-empty"}`;
  return <td className={classes} onClick={moveTilesHere} role="button" >{value}</td>;
}

export default Tile;
