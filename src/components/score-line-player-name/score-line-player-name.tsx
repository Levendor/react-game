import React, { Component } from 'react';

import './score-line-player-name.scss';

interface Props {
  playerName: string | undefined;
}

export default class PlayerName extends Component<Props> {
  render() {
    let { playerName } = this.props;
    const length = playerName ? playerName.length : 0;
    if (length > 11) {
      playerName = `${playerName?.slice(0, 10)}...`;
    }
    return (
      <div className="player-name">
        <span className="player-name_text">
          {playerName}
        </span>
      </div>
    );
  }
}