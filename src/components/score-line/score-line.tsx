import React, { Component } from 'react';
import WinCounter from '../score-line-win-counter';
import { faStar as fullStar }  from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

import './score-line.scss';

export default class ScoreLine extends Component {
  render() {
    return (
      <div className="score-line border">
        <WinCounter faIcon={[fullStar, emptyStar]} />
        <WinCounter faIcon={[emptyStar, fullStar]} />
      </div>
    );
  }
}
