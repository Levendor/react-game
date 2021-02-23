import React, { Component } from 'react';
import './battlefield-left-line.scss';

import { leftLine } from '../../model/fieldTemplate';

interface Props {

}

export default class LeftLine extends Component<Props> {
  render() {
    return (
      <div className="left-line">
        {
          leftLine.map((cell) => {
            return <div className="cell disabled left-line-cell"
                        key={Math.floor(Math.random()*10000)}>
                        {cell.toUpperCase()}
                   </div>
          })
        }
      </div>
    );
  }
}