import React, { Component } from 'react';
import { faStar as fullStar }  from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

import './score-line.scss';

import WinCounter from '../score-line-win-counter';
import PlayerName from '../score-line-player-name';
import ScoreCounter from '../score-line-score-counter';

export default class ScoreLine extends Component {
  render() {
    return (
      <div className="score-line border">
        <WinCounter faIcon={[fullStar, emptyStar]} />
        <PlayerName playerName="player" />
        <ScoreCounter score={[1, 1]} />
        <PlayerName playerName="AI 1" />
        <WinCounter faIcon={[emptyStar, fullStar]} />
      </div>
    );
  }
}
