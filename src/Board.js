import React, {useState} from "react";
import Tile from "./Tile";
import "./Board.css";

/** Game board of 15 puzzle.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 *
 * State:
 *
 * - board: array-of-arrays of numbers 1-15, & null
 *
 *    For this board:
 *       1   4  12
 *       10  7  3     (where * is null)
 *       15  *  11  
 *
 *    This would be: [[1, 4, 12], [10, 7, 3], [15, null, 11]]
 *
 *  This should render an HTML table of individual <Tile /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual tiles
 *
 **/

 function Board({nrows = 4, ncols = 4}) {
  const [board, setBoard] = useState(createBoard);

  /** Create an array of unique random integers 1-15, and add null to array */
  function createRandomNums(){
    let nums = new Set();
    nums.add(null);
    while (nums.size < 16){
      let num = Math.floor(Math.random() * 100) + 1;
        if (num <= 15){
          nums.add(num);
        }
    }
    return Array.from(nums);
  }

  /** Create a board nrows high/ncols wide, each tile given a num 1-15 or null */
  function createBoard() {
    let nums = createRandomNums()
    return Array.from({length: nrows}).map(
        row => Array.from({length: ncols}).map(
            tile => nums.pop()
        )
    );
  }

  /** Check if the player has won */
  function hasWon() {
    let num = 1;
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        if (board[y][x] !== num ){
          return false;
        }
        if (num === 15) return true;
        num += 1;
      }
    }
  }

  /** Returns the [y, x] coord of the empty space on board */
  function findEmpty(){
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        if (board[y][x] === null){
          return {emptyY: y, emptyX: x};
        }
      }
    }
  }

  /** Move tiles based on clicked tile; returns new board configuration */
  function moveTiles({coord}) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const {emptyY, emptyX} = findEmpty()

      if ((emptyY !== y && emptyX !== x) || (emptyY === y && emptyX === x)){
        // if user tries to move empty space or tile that isn't in same col/row, do nothing
        return oldBoard;
      }
      const boardCopy = oldBoard.map(row => [...row]);

      if (emptyY === y){
        // moving tiles in column
        let direction = x-emptyX > 0 ? 1 : -1;
        let oppDirection = x-emptyX > 0 ? -1 : 1;
        for (let i = Math.abs(x-emptyX); i > 0; i--){
          boardCopy[y][x+(i*oppDirection)] = boardCopy[y][x+(i*oppDirection)+direction]
        }
        boardCopy[y][x] = null;
      }

      if (emptyX === x){
        //moving tiles in row
        let direction = y-emptyY > 0 ? 1 : -1;
        let oppDirection = y-emptyY > 0 ? -1 : 1;
        for (let i = Math.abs(y-emptyY); i > 0; i--){
          boardCopy[y+(i*oppDirection)][x] = boardCopy[y+(i*oppDirection)+direction][x]
        }
        boardCopy[y][x] = null;
      }

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board: rows of Tile components

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Tile
              key={coord}
              value={board[y][x]}
              moveTilesHere={evt => moveTiles({coord, value: board[y][x]})}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
  );
}

export default Board;
