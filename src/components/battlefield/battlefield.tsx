import React, { Component } from 'react';
import Grid from '../battlefield-grid';
import './battlefield.scss';

interface Props {

}

export default class Battlefield extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="battlefield">
        <Grid onCellClick={console.log} side="friend" />
        <div className="gap"></div>
        <Grid onCellClick={console.log} side="foe" />
      </div>
    );
  }
}