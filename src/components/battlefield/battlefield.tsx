import React, { Component } from 'react';
import Grid from '../battlefield-grid';
import './battlefield.scss';

interface Props {

}

export default class Battlefield extends Component<Props> {
  render() {
    return (
      <div className="battlefield">
        <Grid onCellClick={console.log} side="Your side" />
        <div className="gap"></div>
        <Grid onCellClick={console.log} side="Enemy side" />
      </div>
    );
  }
}