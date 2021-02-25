import React, { Component } from 'react';
import './battlefield-cell.scss';

interface Props {
  onCellClick: Function;
  side: string;
  value: number;
  coordinates: number[];
}

export default class Cell extends Component<Props> {
  
  cellContent(cellValue: number) {
    const { side } = this.props;
    switch(cellValue) {
      case 0:
        return '';
      case 1:
        if (side === 'foe') return '';
        return 'O';
      case 2:
        return 'X';
      case 3:
        return '.';
      default:
        return '';
    }
  }

  render() {
    const { side, value, coordinates } = this.props;
    return (
      <div className={side ==='foe' ? "cell" : "cell disabled"}
           onClick={() => this.props.onCellClick(coordinates)}
           style={{gridArea: `cell-${coordinates.join('')}`}}>
            {this.cellContent(value)}
      </div>
    );
  }
}