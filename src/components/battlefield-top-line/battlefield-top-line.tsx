import React, { Component } from 'react';
import './battlefield-top-line.scss';

import { topLine } from '../../model/fieldTemplate';

interface Props {

}

export default class TopLine extends Component<Props> {
  render() {
    return (
      <div className="top-line">
        {
          topLine.map((cell) => {
            return <div className="cell disabled top-line-cell"
                        key={Math.floor(Math.random()*10000)}>
                        {cell.toUpperCase()}
                   </div>
          })
        }
      </div>
    );
  }
}