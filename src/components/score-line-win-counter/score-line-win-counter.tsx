import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './score-line-win-counter.scss';

interface Props {
  faIcon: IconProp[]
}

export default class WinCounter extends Component<Props> {
  render() {
    const arr = this.props.faIcon;
    // const [ star1, star2 ] = arr;
    return (
      <div className="win-counter">
        {
          arr.map((star: IconProp, index) => {
            return <FontAwesomeIcon icon={star} size="2x" key={index} />
          })
        }
      </div>
    );
  }
}