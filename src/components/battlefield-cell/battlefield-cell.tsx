import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
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
        // if (side === 'foe') return '';
        return <FontAwesomeIcon icon={faSquare} size="4x" />;
      case 2:
        return <FontAwesomeIcon icon={faTimes} size="4x" />;
      case 3:
        return <FontAwesomeIcon icon={faCircle} size="xs" />;
      default:
        return '';
    }
  }

  render() {
    const { side, value, coordinates } = this.props;
    return (
      <div className={side ==='foe' ? "cell grid-cell" : "cell grid-cell disabled"}
           onClick={() => this.props.onCellClick(coordinates)}
           style={{gridArea: `cell-${coordinates.join('')}`}}>
            {this.cellContent(value)}
      </div>
    );
  }
}