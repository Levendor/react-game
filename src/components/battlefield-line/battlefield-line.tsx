import React, { Component } from 'react';
import './battlefield-line.scss';

import { LEFT_LINE_TEMPLATE, TOP_LINE_TEMPLATE } from '../../model/constants';

interface Props {
  position: string;
}

export default class Line extends Component<Props> {
  render() {
    const { position } = this.props;
    const line = position === 'top'
      ? TOP_LINE_TEMPLATE
      : LEFT_LINE_TEMPLATE;

    return (
      <div className={`${position}-line`}>
        {
          line.map((cell) => {
            return <div className={`cell disabled ${position}-line-cell`}
                        key={`${position}${cell}`}>
                        {cell.toUpperCase()}
                   </div>
          })
        }
      </div>
    );
  }
}