import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import '../../model/generateField';

import './App.scss';

export default class App extends Component {

  render() {
    const name = '123456789012'
    return (
      <div className="app">
        <Header />
        <ScoreLine bestOf={3} score={[1, 2]} players={[name, name]}/>
        <div className="battlefield">
          <Battlefield onCellClick={console.log} side="friend" />
          <div className="gap"></div>
          <Battlefield onCellClick={console.log} side="foe" />
        </div>
        <Footer />
      </div>
    );
  }
}
