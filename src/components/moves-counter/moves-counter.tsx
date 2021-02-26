import React from 'react';
import './moves-counter.scss';

interface Props {
  counter: number;
}

export default function MovesCounter(props: Props) {
  return (
    <div className="moves-counter">
      <span className="moves-counter_text">
        Ходов:
      </span>
      <span className="moves-counter_numbers">
        {props.counter}
      </span>
    </div>
  );
}