import React, { Component } from 'react';
import './battlefield-grid.scss';

import { fieldTemplate } from '../../model/fieldTemplate';
import Line from '../battlefield-line';
import Cell from '../battlefield-cell';

interface Props {
  onCellClick: Function;
  side: string;
}

export default class Grid extends Component<Props> {

  render() {
    const { side } = this.props;
    return (
      <div className="battlefield-grid">
        <Line position="top" />
        <Line position="left" />
        {
          fieldTemplate.map((row, i) => {
            return (
              row.map((cell, j) => {
                return <Cell value={cell}
                             side={side}
                             coordinates={[i, j]}
                             onCellClick={console.log}
                             key={Math.floor(Math.random()*10000)} />
              })
            )
          })
        }
      </div>
    );
  }
}