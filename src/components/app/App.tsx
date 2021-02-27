import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';
import MovesCounter from '../moves-counter';

import { FIELD_SIZE, INITIAL_SHOT_BEFORE_LAST } from '../../model//constants';
import Field from '../../model/Field';
import Model from '../../model/Model';

import './App.scss';

const model = new Model();

let player1Field = new Field();
let player2Field = new Field();

interface Props {
}

interface State {
  user1Name: string;
  player1Field: Array<number[]>;
  user2Name: string;
  player2Field: Array<number[]>;
  disabledApp: boolean;
  isAutoGame: boolean;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user1Name: '123456789012',
      player1Field: player1Field.field,
      user2Name: 'computer',
      player2Field: player1Field.field,
      disabledApp: false,
      isAutoGame: false,
    }
  }

  newGame = () => {
    player1Field = new Field();
    player2Field = new Field();

    this.setState({
      disabledApp: false,
      isAutoGame: false,
      player1Field: player1Field.field,
      player2Field: player1Field.field,
    });
  }

  autoGame = (index: number) => {
    const fields = [player1Field, player2Field];
    if (fields.some((field) => {
      return model.isAutoGameOver(field, fields, index)
    })) {
      this.setState({ disabledApp: false })
      return;
    };
    
    this.setState({ 
      disabledApp: true,
      isAutoGame: true,
     })
    
    if (index) {
      const comp1Strike = () => {
        const comp1Coordinate = aiming(fields[index]);
        this.setState({ 
          player2Field: fields[index].shot(comp1Coordinate),
        });
        const enemyHit = player2Field.isHit(comp1Coordinate.join(''));
        if (enemyHit) setTimeout(() => comp1Strike(), 50);
      }
      comp1Strike();
    } else { 
      const comp2Strike = () => {
        const comp2Coordinate = aiming(fields[index]);
        this.setState({ 
          player1Field: fields[index].shot(comp2Coordinate),
        });
        const enemyHit = player1Field.isHit(comp2Coordinate.join(''));
        if (enemyHit) setTimeout(() => comp2Strike(), 50);
      }
      comp2Strike();
    }

    setTimeout(() => this.autoGame((index + 1) % 2), 50);
  }

  blowsExchange = (coordinates: number[]) => {
    this.setState({
      player2Field: player2Field.shot(coordinates),
      disabledApp: true,
    });
    const ship = player2Field.whatIsThisShip(coordinates);
    const isShipDestroyed = ship
      ? player2Field.isShipWrecked(ship)
      : undefined;
    console.log(
      'твой ход:',
      ship
        ? (isShipDestroyed
          ? 'убил'
          : 'попал')
        : 'мимо'
    );
    if (ship) {
      this.setState({ 
        disabledApp: false,
      });
    } else {
      this.enemyStrike();
    }
  }

  enemyStrike() {
    const strikeBack = aiming(player1Field);
    setTimeout(() => {
      this.setState({ 
        player1Field: player1Field.shot(strikeBack),
        disabledApp: false,
      });
      const ship = player1Field.whatIsThisShip(strikeBack);
      const isShipDestroyed = ship
        ? player1Field.isShipWrecked(ship)
        : undefined;
      console.log(
        'ход компьютера:',
        ship
          ? (isShipDestroyed
            ? 'убил'
            : 'попал')
          : 'мимо'
      );
      if (ship) this.enemyStrike();
    }, 500);
  }

  render() {
    const { user1Name, user2Name, disabledApp, isAutoGame } = this.state;
    const appClass = disabledApp ? "disabled" : "";
    const fieldClass = isAutoGame ? "disabled" : "";
    const battlefield2Side = isAutoGame ? "friend" : "foe";
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
          <MovesCounter player1Counter={player2Field.shots.length}
                        player2Counter={player1Field.shots.length} />
          <Battlefield side={battlefield2Side}
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
  const targets = field.checkCellsNearby(INITIAL_SHOT_BEFORE_LAST);
  const length = targets.length;
  do {
    if (length) {
      point = targets[Math.floor(Math.random() * length)];
    } else {
      point = [
      Math.floor(Math.random() * FIELD_SIZE),
      Math.floor(Math.random() * FIELD_SIZE),
    ];
  }
  } while (field.targeting(point));
  return point;
}
