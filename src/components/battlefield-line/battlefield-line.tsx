import React, { Component } from 'react';
import { v4 } from 'uuid';
import './battlefield-line.scss';

import { leftLine, topLine } from '../../model/fieldTemplate';

interface Props {
  position: string;
}

export default class Line extends Component<Props> {
  render() {
    const { position } = this.props;
    const line = position === 'top'
      ? topLine
      : leftLine;

    return (
      <div className={`${position}-line`}>
        {
          line.map((cell) => {
            return <div className={`cell disabled ${position}-line-cell`}
                        key={v4()}>
                        {cell.toUpperCase()}
                   </div>
          })
        }
      </div>
    );
  }
}