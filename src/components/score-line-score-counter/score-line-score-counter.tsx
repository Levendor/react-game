import React, { Component } from 'react';

import './score-line-score-counter.scss';

interface Props {
  score: number[];
}

export default class ScoreCounter extends Component<Props> {
  render() {
    const [player1Score, player2Score] = this.props.score;
    return (
      <div className="score-counter">
        <span className="score-counter_score">
          <span>{player1Score}</span>
          <span>:</span>
          <span>{player2Score}</span>
        </span>
      </div>
    );
  }
}