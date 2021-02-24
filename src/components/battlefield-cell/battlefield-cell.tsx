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
    switch(cellValue) {
      case 0:
        return '';
      case 1:
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
      <div className="cell"
           onClick={() => this.props.onCellClick(side, `[${coordinates[0]}, ${coordinates[1]}]`, value)}
           style={{gridArea: `cell-${coordinates.join('')}`}}>
            {this.cellContent(value)}
      </div>
    );
  }
}