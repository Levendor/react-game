import React, { Component } from 'react';
import './battlefield.scss';

import Line from '../battlefield-line';
import Cell from '../battlefield-cell';

interface Props {
  side: string;
  field: Array<number[]>;
  onCellClick?: Function;
  isAutoGame?: boolean
}

export default class Battlefield extends Component<Props> {
  render() {
    const { side, field, onCellClick, isAutoGame } = this.props;
    const className = isAutoGame
      ? "battlefield disabled"
      : side === "foe"
        ? "battlefield"
        : "battlefield disabled";
    return (
      <div className={className} style={{gridArea: `${side}`}}>
        <Line position="top" />
        <Line position="left" />
        {
          field.map((row, i) => {
            return (
              row.map((cell, j) => {
                return <Cell value={cell}
                             side={side}
                             isAutoGame={isAutoGame}
                             coordinates={[i, j]}
                             onCellClick={onCellClick}
                             key={`${i}${j}`} />
              })
            )
          })
        }
      </div>
    );
  }
}