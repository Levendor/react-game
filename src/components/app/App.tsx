import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import Field from '../../model/Field';

import './App.scss';

interface Props {
}

interface State {
  user1Name: string;
  friendlyField: Array<number[]>;
  user2Name: string;
  foeField: Array<number[]>;
  disabled: boolean;
}

let player1Field = new Field();
let player2Field = new Field();

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user1Name: '123456789012',
      friendlyField: player1Field.field,
      user2Name: '',
      foeField: player1Field.field,
      disabled: false,
    }
  }

  componentDidMount() {
    // const user1Name = "123456789012"; //this.props.player1Name;
    // const player1Field = new Field();
    // const friendlyField = player1Field.field;
    // const user2Name = "computer"; //this.props.player2Name;
    // const player2Field = new Field();
    // const foeField = player2Field.field;
    // this.setState({ 
    //   user1Name,
    //   player1Field,
    //   friendlyField,
    //   user2Name,
    //   player2Field,
    //   foeField,
    // })
  }

  newGame = () => {
    player1Field = new Field();
    player2Field = new Field();

    this.setState({
      friendlyField: player1Field.field,
      foeField: player1Field.field,
    });
  }

  blowsExchange = (coordinates: number[]) => {
    this.setState({
      foeField: player2Field.shot(coordinates),
      disabled: true,
    });

    const aiming = player1Field.aiming;
    let enemyStrikePoint: number[]; 
    do {
      enemyStrikePoint= [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (aiming(enemyStrikePoint));

    setTimeout(() => {
      this.setState({ 
        friendlyField: player1Field.shot(enemyStrikePoint),
        disabled: false,
      });
    }, 500);
  }

  render() {
    const { user1Name, user2Name, disabled } = this.state;
    const containerClass = disabled ? "battlefield-container disabled" : "battlefield-container";
    return (
      <div className="app">
        <Header callbacks={[
            this.newGame,
            console.log,
            console.log,
            console.log,
            console.log,
          ]} />
        <ScoreLine bestOf={3} score={[1, 2]} players={[user1Name, user2Name]}/>
        <div className={containerClass}>
          <Battlefield side="friend"
                       field={this.state.friendlyField} />
          <div className="gap"></div>
          <Battlefield side="foe"
                       field={this.state.foeField}
                       onCellClick={this.blowsExchange} />
        </div>
        <Footer />
      </div>
    );
  }
}
