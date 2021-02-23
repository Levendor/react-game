import React, { Component } from 'react';
import './battlefield-cell.scss';

interface Props {
  extraClass: string;
}

export default class Cell extends Component<Props> {
  render() {
    const { extraClass } = this.props;
    return (
      <div className={`cell ${extraClass}`}>
      </div>
    );
  }
}