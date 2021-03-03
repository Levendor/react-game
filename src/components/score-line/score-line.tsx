import React, { Component } from 'react';
import { faStar as fullStar }  from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

import './score-line.scss';

import WinCounter from '../score-line-win-counter';
import PlayerName from '../score-line-player-name';
import ScoreCounter from '../score-line-score-counter';

interface Props {
  bestOf: number | undefined;
  score: number[] | undefined;
  players: [(string | undefined), string];
}

export default class ScoreLine extends Component<Props> {
  render() {
    const { bestOf, score } = this.props;
    const [player1Score, player2Score] = score ? score : [];
    const starArr1 = new Array(bestOf)
      .fill(fullStar, 0, player1Score)
      .fill(emptyStar, player1Score);
    const starArr2 = new Array(bestOf)
      .fill(fullStar, 0, player2Score)
      .fill(emptyStar, player2Score)
      .reverse();
    const [player1Name, player2Name] = this.props.players
      ? this.props.players
      : [];
    return (
      <div className="score-line border">
        <WinCounter faIcon={starArr1} />
        <PlayerName playerName={player1Name} />
        <ScoreCounter score={score} />
        <PlayerName playerName={player2Name} />
        <WinCounter faIcon={starArr2} />
      </div>
    );
  }
}
