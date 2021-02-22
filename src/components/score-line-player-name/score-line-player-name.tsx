import React, { Component } from 'react';

import './score-line-player-name.scss';

interface Props {
  playerName: string
}

export default class PlayerName extends Component<Props> {
  render() {
    return (
      <div className="player-name">
        <span className="player-name_text">
          {this.props.playerName}
        </span>
      </div>
    );
  }
}