import React, { Component } from 'react';

import './statistics.scss';

interface Props {
  userName: string;
  gamesTotal: number;
  gamesWon: number;
}

export default class Statistics extends Component<Props> {
  render() {
    const { userName, gamesTotal, gamesWon } = this.props;
    const winRatio = gamesTotal
      ? (gamesWon / gamesTotal).toFixed(2)
      : 0;
    return (
      <div className="statistics-container">
        <h3 className="statistics-title">{userName}</h3>
        <span className="statistics-text">
          Games total: 
          <span className="statistics-value">{gamesTotal}</span>
        </span>
        <span className="statistics-text">
          Games won: 
          <span className="statistics-value">{gamesWon}</span>
        </span>
        <span className="statistics-text">
          Win ratio: 
          <span className="statistics-value">{winRatio}</span>
        </span>
      </div>
    );
  }
}