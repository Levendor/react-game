import React from 'react';
import './moves-counter.scss';

interface Props {
  player1Counter: number;
  player2Counter: number;
}

export default function MovesCounter(props: Props) {
  return (
    <div className="moves-counter">
      <span className="moves-counter_title">
        Ходов:
      </span>
      <span className="moves-counter_text">
        твоих:
      </span>
      <span className="moves-counter_numbers">
        {props.player1Counter}
      </span>
      <span className="moves-counter_text">
        компа:
      </span>
      <span className="moves-counter_numbers">
        {props.player2Counter}
      </span>
    </div>
  );
}