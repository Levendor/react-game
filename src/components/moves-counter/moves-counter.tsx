import React from 'react';
import './moves-counter.scss';

interface Props {
  player1Counter: number | undefined;
  player2Counter: number | undefined;
  player1Title: string | undefined;
  player2Title: string | undefined;
}

export default function MovesCounter(props: Props) {
  return (
    <div className="moves-counter">
      <span className="moves-counter_title">
        Ходов:
      </span>
      <div className="moves-counter_container">
        <div className="moves-counter_container_small">
          <span className="moves-counter_text">
            {props.player1Title}
          </span>
          <span className="moves-counter_numbers">
            {props.player1Counter}
          </span>
        </div>
        
        <div className="moves-counter_container_small">
          <span className="moves-counter_text">
            {props.player2Title}
          </span>
          <span className="moves-counter_numbers">
            {props.player2Counter}
          </span>
        </div>
      </div>
    </div>
  );
}