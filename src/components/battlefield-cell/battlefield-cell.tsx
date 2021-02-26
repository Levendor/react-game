import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SYMBOLS from '../../model/symbols';

import './battlefield-cell.scss';

interface Props {
  onCellClick?: Function;
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
        return <FontAwesomeIcon icon={SYMBOLS.SQUARE} size="4x" />;
      case 2:
        return <FontAwesomeIcon icon={SYMBOLS.CROSS} size="4x" />;
      case 3:
        return <FontAwesomeIcon icon={SYMBOLS.DOT} size="xs" />;
      default:
        return '';
    }
  }

  render() {
    const { value, coordinates, onCellClick } = this.props;
    const cellValue = this.cellContent(value);
    return (
      <div className={ cellValue ? "cell grid-cell disabled" : "cell grid-cell" }
           onClick={
             () => {if (onCellClick) onCellClick(coordinates, cellValue)}
            }
           style={{gridArea: `cell-${coordinates.join('')}`}}>
            {cellValue}
      </div>
    );
  }
}