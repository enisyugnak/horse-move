import React from 'react';
import { useEffect } from 'react';
import './style.css';
import { nanoid } from 'nanoid';
import BoardItem from './components/BoardItem';
import GameButton from './components/GameButton';

function App() {
  const boardSize = 64;
  const [tiles, setTiles] = React.useState(allItemsIn2D());
  const [showReset, setShowReset] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [showUndo, setShowUndo] = React.useState(false);

  /** check all tiles and availability */
  useEffect(() => {
    const captured = tiles.filter((item) => item.status === 'captured');
    const choosen = tiles.filter((item) => item.status === 'chosen');
    const left = tiles.length - captured.length;
    let msg = '';

    if (choosen.length === 0) {
      if (left < boardSize) {
        msg = 'oooopsss, there are still ' + left + ' pieces left';
      }
      if (left < boardSize / 2) {
        msg = 'HALF IS DONE ' + left + ' pieces left';
      }
      if (left < boardSize - 10) {
        msg = 'SUPER...  but still ' + left + ' pieces left';
      }
      if (left < 5) {
        msg = 'ALMOST DONE, only ' + left + ' pieces left';
      }
      setMessage(msg);
    }

    if (left === 0) {
      setMessage('perfect... you win');
    }
  }, [tiles]);

  /** check history and undo */
  useEffect(() => {
    if (history.length) {
      setShowUndo(true);
    } else {
      setShowReset(false);
      setShowUndo(false);
    }
    return () => {};
  }, [history]);

  function resetGame() {
    setMessage('');
    setShowUndo(false);
    setShowReset(false);
    setTiles(allItemsIn2D());
    setHistory([]);
  }

  function allItemsIn2D() {
    return Array.from({ length: boardSize }).map((item, index) =>
      returnNewItem(Math.floor(index / 8), index % 8)
    );
  }

  function returnNewItem(row, col) {
    return {
      id: nanoid(),
      row: row,
      col: col,
      disabled: false,
      status: 'free',
    };
  }

  function itemClicked(id) {
    const items = tiles.filter((item) => item.id === id);
    const item = items[0];
    const row = item.row;
    const col = item.col;

    setTiles((oldTiles) =>
      oldTiles.map((tile) => {
        if (tile.status !== 'captured' && tile.status !== 'first-captured') {
          if (tile.id === item.id) {
            return { ...tile, status: 'first-captured', disabled: true };
          } else if (
            (tile.row === row - 2 && tile.col === col + 1) ||
            (tile.row === row - 2 && tile.col === col - 1) ||
            (tile.row === row - 1 && tile.col === col + 2) ||
            (tile.row === row - 1 && tile.col === col - 2) ||
            (tile.row === row + 1 && tile.col === col + 2) ||
            (tile.row === row + 1 && tile.col === col - 2) ||
            (tile.row === row + 2 && tile.col === col + 1) ||
            (tile.row === row + 2 && tile.col === col - 1)
          ) {
            return { ...tile, disabled: false, status: 'chosen' };
          } else {
            return { ...tile, disabled: true, status: 'free' };
          }
        } else {
          return { ...tile, status: 'captured' };
        }
      })
    );
    setHistory((oldHistory) => [...oldHistory, tiles]);
    setShowUndo(true);
    setShowReset(true);
  }

  function undoMove() {
    setTiles(history[history.length - 1]);
    setHistory((oldHistory) =>
      oldHistory.filter((item, index) => {
        return index !== oldHistory.length - 1;
      })
    );
    setMessage('');
  }

  const elements = tiles.map((tile) => (
    <BoardItem
      key={tile.id}
      disabled={tile.disabled}
      status={tile.status}
      itemClicked={() => itemClicked(tile.id)}
    />
  ));

  return (
    <main>
      <div className="game">
        <div className="board"> {elements}</div>
        <div className="message">{message}</div>
        <div className="buttons">
          {showReset && <GameButton title="RESET" clicked={resetGame} />}
          {showUndo && <GameButton title="UNDO" clicked={undoMove} />}
        </div>
      </div>
    </main>
  );
}

export default App;
