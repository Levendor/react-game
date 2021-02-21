import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './score-line-win-counter.scss';

interface Props {
  faIcon: IconProp[]
}

export default class WinCounter extends Component<Props> {
  render() {
    const [ star1, star2 ] = this.props.faIcon;
    return (
      <div className="win-counter">
        <FontAwesomeIcon icon={star1} size="2x" />
        <FontAwesomeIcon icon={star2} size="2x" />
      </div>
    );
  }
}