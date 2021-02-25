import React, { Component } from 'react';
import { v4 } from 'uuid';
import './battlefield.scss';

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

export default class Battlefield extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      side: this.props.side,
      field: [],
    }
  }

  componentDidMount() {
    this.setState({ field: makeField() })
  }

  shot = (coordinates: number[]) => {
    const point = coordinates;
    const newField = this.state.field.map((row, rowIndex) => {
      if (rowIndex === point[0]) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === point[1]) {
            if (cell === 0) return 3;
            else if (cell === 1) return 2;
            return cell
          }
          return cell;
        })
      }
      return row;
    })

    this.setState({ field: newField });
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
                             onCellClick={this.shot}
                             key={v4()} />
              })
            )
          })
        }
      </div>
    );
  }
}