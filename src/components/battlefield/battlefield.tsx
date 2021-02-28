import React, { Component } from 'react';
import { v4 } from 'uuid';
import './battlefield.scss';

import Line from '../battlefield-line';
import Cell from '../battlefield-cell';

interface State {
}

interface Props {
  side: string;
  field: Array<number[]> | undefined;
  onCellClick?: Function;
}

export default class Battlefield extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { side } = this.props;
    const className = side === "foe" ? "battlefield" : "battlefield disabled"
    return (
      <div className={className}>
        <Line position="top" />
        <Line position="left" />
        {
          this.props.field?.map((row, i) => {
            return (
              row.map((cell, j) => {
                return <Cell value={cell}
                             side={side}
                             coordinates={[i, j]}
                             onCellClick={this.props.onCellClick}
                             key={v4()} />
              })
            )
          })
        }
      </div>
    );
  }
}