import React, { Component } from 'react';
import { v4 } from 'uuid';
import './battlefield-grid.scss';

import { fieldTemplate } from '../../model/fieldTemplate';
import makeField from '../../model/generateField';
import Line from '../battlefield-line';
import Cell from '../battlefield-cell';

interface State {
  side: string;
  field: Array<number[]>;
}

interface Props {
  onCellClick: Function;
  side: string;
}

export default class Grid extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      side: this.props.side,
      field: makeField(),
    }
  }

  render() {
    return (
      <div className="battlefield-grid">
        <Line position="top" />
        <Line position="left" />
        {
          this.state.field.map((row, i) => {
            return (
              row.map((cell, j) => {
                return <Cell value={cell}
                             side={this.state.side}
                             coordinates={[i, j]}
                             onCellClick={console.log}
                             key={v4()} />
              })
            )
          })
        }
      </div>
    );
  }
}