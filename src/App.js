import {useState} from 'react';

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true);
  const [values, setValues] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (values[i] || checkWin(values)) {
      return;
    }

    const nextValues = values.slice();

    if (xIsNext) {
      nextValues[i] = "X";
    }
    else {
      nextValues[i] = "O";
    }

    setValues(nextValues)
    setXIsNext(!xIsNext);
  }

  const winner = checkWin(values);
  let status;
  if (winner) {
    status = "The winner is: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={values[0]} onSquareClick={() => handleClick(0)} />
        <Square value={values[1]} onSquareClick={() => handleClick(1)} />
        <Square value={values[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={values[3]} onSquareClick={() => handleClick(3)} />
        <Square value={values[4]} onSquareClick={() => handleClick(4)} />
        <Square value={values[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={values[6]} onSquareClick={() => handleClick(6)} />
        <Square value={values[7]} onSquareClick={() => handleClick(7)} />
        <Square value={values[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({value, onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function checkWin(values) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (values[a] && values[a] === values[b] && values[a] === values[c]) {
      return values[a];
    }
  }
  return null;
}