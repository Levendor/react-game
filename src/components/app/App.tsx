import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';

import Field from '../../model/Field';

import './App.scss';
import MovesCounter from '../moves-counter';

interface Props {
}

interface State {
  user1Name: string;
  player1Field: Array<number[]>;
  user2Name: string;
  player2Field: Array<number[]>;
  disabledApp: boolean;
  disabledField: boolean;
}

let player1Field = new Field();
let player2Field = new Field();

// console.log(new Field(JSON.parse(JSON.stringify(player1Field))));

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user1Name: '123456789012',
      player1Field: player1Field.field,
      user2Name: 'computer',
      player2Field: player1Field.field,
      disabledApp: false,
      disabledField: false,
    }
  }

  newGame = () => {
    player1Field = new Field();
    player2Field = new Field();

    this.setState({
      disabledApp: false,
      disabledField: false,
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
    })) {
      this.setState({ disabledApp: false })
      return;
    };
    
    this.setState({ 
      disabledApp: true,
      disabledField: true,
     })
    
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
      disabledApp: true,
    });

    setTimeout(() => {
      this.setState({ 
        player1Field: player1Field.shot(aiming(player1Field)),
        disabledApp: false,
      });
    }, 500);
  }

  render() {
    const { user1Name, user2Name, disabledApp, disabledField } = this.state;
    const appClass = disabledApp ? "disabled" : "";
    const fieldClass = disabledField ? "disabled" : "";
    return (
      <div className={`app ${appClass}`}>
        <Header callbacks={[
            this.newGame,
            console.log,
            console.log,
            () => this.autoGame(0),
            console.log,
          ]} />
        <ScoreLine bestOf={3} score={[1, 2]} players={[user1Name, user2Name]}/>
        <div className={`battlefield-container border ${fieldClass}`}>
          <Battlefield side="friend"
                       field={this.state.player1Field} />
          <MovesCounter counter={player1Field.shots.length} />
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
