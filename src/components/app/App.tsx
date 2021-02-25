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
  player1Field: Array<number[]>;
  user2Name: string;
  player2Field: Array<number[]>;
  disabled: boolean;
}

let player1Field = new Field();
let player2Field = new Field();

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user1Name: '123456789012',
      player1Field: player1Field.field,
      user2Name: '',
      player2Field: player1Field.field,
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
      disabled: false,
      player1Field: player1Field.field,
      player2Field: player1Field.field,
    });
  }

  autoGame = (index: number) => {
    const fields = [player1Field, player2Field];
    if (fields.some((field) => {
      return field.stringOccupiedCells.every((cell) => {
        return fields[index].shots.some((shot) => {
          return shot === cell;
        })
      })
    })) return;
    
    this.setState({ disabled: true })
    
    if (index) { 
      this.setState({ 
        player2Field: fields[index].shot(aiming(fields[index])),
      });
    } else { 
      this.setState({ 
        player1Field: fields[index].shot(aiming(fields[index])),
      });
    }

    setTimeout(() => this.autoGame((index + 1) % 2), 50);
  }

  blowsExchange = (coordinates: number[]) => {
    this.setState({
      player2Field: player2Field.shot(coordinates),
      disabled: true,
    });

    setTimeout(() => {
      this.setState({ 
        player1Field: player1Field.shot(aiming(player1Field)),
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
            () => this.autoGame(0),
            console.log,
          ]} />
        <ScoreLine bestOf={3} score={[1, 2]} players={[user1Name, user2Name]}/>
        <div className={containerClass}>
          <Battlefield side="friend"
                       field={this.state.player1Field} />
          <div className="gap"></div>
          <Battlefield side="foe"
                       field={this.state.player2Field}
                       onCellClick={this.blowsExchange} />
        </div>
        <Footer />
      </div>
    );
  }
}

const aiming = (field: Field) => {
  let point: number[]; 
  do {
    point = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
  } while (field.aiming(point));
  return point;
}
