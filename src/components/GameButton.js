import React from 'react';

export default function GameButton({ title, clicked }) {
  return (
    <button className="roll--btn" onClick={clicked}>
      {title}
    </button>
  );
}
