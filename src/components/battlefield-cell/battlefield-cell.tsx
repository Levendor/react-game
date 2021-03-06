import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EMPTY_CELL, CELL_WITH_SHIP, HIT, MISS } from '../../model/constants';
import SYMBOLS from '../../model/symbols';

import './battlefield-cell.scss';

interface Props {
  onCellClick?: Function;
  side: string;
  value: number;
  coordinates: number[];
  isAutoGame?: boolean;
}

export default class Cell extends Component<Props> {  
  cellContent(cellValue: number) {
    const { side, isAutoGame } = this.props;
    switch(cellValue) {
      case EMPTY_CELL:
        return '';
      case CELL_WITH_SHIP:
        if (side === 'foe' && !isAutoGame) return '';
        return <FontAwesomeIcon icon={SYMBOLS.SQUARE} size="4x" />;
      case HIT:
        return <FontAwesomeIcon icon={SYMBOLS.CROSS} size="4x" />;
      case MISS:
        return <FontAwesomeIcon icon={SYMBOLS.DOT} size="xs" />;
      default:
        return '';
    }
  }

  render() {
    const { value, coordinates, onCellClick } = this.props;
    const cellValue = this.cellContent(value);
    return (
      <div className={ cellValue
        ? (value === HIT
          ? "cell grid-cell shake-cell disabled"
          : "cell grid-cell disabled")
        : "cell grid-cell" }
           onClick={
             () => {if (onCellClick) onCellClick(coordinates, value)}
            }
           style={{gridArea: `cell-${coordinates.join('')}`}}>
            {cellValue}
      </div>
    );
  }
}