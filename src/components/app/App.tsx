import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';
import MovesCounter from '../moves-counter';


import { DEFAULT_PLAYER1_NAME } from '../../model/constants';
import Model from '../../model/Model';
import Field from '../../model/Field';

import './App.scss';

const model = new Model();
model.init();

interface Props {
}

interface State {
  bestOf: number | undefined;
  score: number[] | undefined;
  user1Name: string | undefined;
  player1Field: Array<number[]> | undefined;
  user2Name: string;
  player2Field: Array<number[]> | undefined;
  disabledApp: boolean;
  isAutoGame: boolean;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bestOf: model.game?.bestOf,
      score: model.game?.score,
      user1Name: model.player1?.name,
      player1Field: model.game?.player1Field?.field,
      user2Name: model.player2,
      player2Field: model.game?.player2Field?.field,
      disabledApp: false,
      isAutoGame: false,
    }
  }

  newGame = () => {
    model.newGame();

    this.setState({
      disabledApp: false,
      isAutoGame: false,
      bestOf: model.game?.bestOf,
      score: model.game?.score,
      player1Field: model.game?.player1Field?.field,
      player2Field: model.game?.player2Field?.field,
    });
  }

  newRound = () => {
    model.newRound();

    this.setState({
      disabledApp: false,
      isAutoGame: false,
      bestOf: model.game?.bestOf,
      score: model.game?.score,
      player1Field: model.game?.player1Field?.field,
      player2Field: model.game?.player2Field?.field,
    });
  }

  autoGame = (index: number) => {
    const fields = [model.game?.player1Field, model.game?.player2Field];
    if (model.isRoundOverGetWinner(fields) !== undefined) {
      this.setState({ disabledApp: false })
      return;
    };
    
    this.setState({ 
      disabledApp: true,
      isAutoGame: true,
     })
    
    if (index) {
      this.compStrike('player2Field', fields, index);
    } else {
      this.compStrike('player1Field', fields, index);
    }
  }

  compStrike = (fieldName: string, fields: (Field | undefined)[], index: number) => {
    const compCoordinate = fields[index]?.aiming();
    const compPoint = compCoordinate?.join('');
    const newField = fields[index]?.shot(compCoordinate);
    this.setState<never>({ 
      [fieldName]: newField,
    });
    const enemyHit = model.game?.player1Field?.isHit(compPoint);
    if (enemyHit) {
      setTimeout(() => this.autoGame(index), 50);
    } else {
      setTimeout(() => this.autoGame((index + 1) % 2), 50);
    }
  }

  blowsExchange = (coordinates: number[]) => {
    const newField = model.game?.player2Field?.shot(coordinates);
    this.setState({
      player2Field: newField,
      disabledApp: true,
    });
    const ship = model.game?.player2Field?.whatIsThisShip(coordinates);
    const isShipDestroyed = ship
      ? model.game?.player2Field?.isShipWrecked(ship)
      : undefined;
    console.log(
      'твой ход:',
      ship
        ? (isShipDestroyed
          ? 'убил'
          : 'попал')
        : 'мимо'
    );
    const fields = [model.game?.player1Field, model.game?.player2Field];
    const fieldIndex = model.isRoundOverGetWinner(fields);
    if (fieldIndex !== undefined) {
      model.setScore(fieldIndex);
      console.log('Вы выиграли этот раунд!');
      if (model.isGameOver()) {
        console.log('Победа! Игра окончена!');
        model.finishGame();
      } else setTimeout(this.newRound, 5000);
      return;
    }
    if (ship) {
      this.setState({ 
        disabledApp: false,
      });
    } else {
      this.enemyStrike();
    }
  }

  enemyStrike() {
    const fields = [model.game?.player1Field, model.game?.player2Field];
    const fieldIndex = model.isRoundOverGetWinner(fields);
    if (fieldIndex !== undefined) {
      model.setScore(fieldIndex);
      console.log('Компьютер выиграл этот раунд');
      if (model.isGameOver()) {
        console.log('Игра окончена! Вы проиграли');
        model.finishGame();
      } else setTimeout(this.newRound, 5000);
      return;
    }
    setTimeout(() => {
      const strikeBack = model.game?.player1Field?.aiming();
      const newField = model.game?.player1Field?.shot(strikeBack);
      this.setState({ 
        player1Field: newField,
        disabledApp: false,
      });
      const ship = model.game?.player1Field?.whatIsThisShip(strikeBack);
      const isShipDestroyed = ship
        ? model.game?.player1Field?.isShipWrecked(ship)
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
    const { /*user1Name,*/ user2Name, disabledApp, isAutoGame } = this.state;
    const appClass = disabledApp ? "disabled" : "";
    const fieldClass = isAutoGame ? "disabled" : "";
    const battlefield2Side = isAutoGame ? "friend" : "foe";
    const player1Title = isAutoGame ? "компа 1:" : "твоих:";
    const player2Title = isAutoGame ? "компа 2:" : "компа:";

    const user1Name = DEFAULT_PLAYER1_NAME;

    return (
      <div className={`app ${appClass}`}>
        <Header callbacks={[
            this.newGame,
            console.log,
            console.log,
            () => this.autoGame(0),
            console.log,
          ]} />
        <ScoreLine bestOf={model.game?.bestOf}
                   score={model.game?.score}
                   players={[user1Name, user2Name]}/>
        <div className={`battlefield-container border ${fieldClass}`}>
          <Battlefield side="friend"
                       field={this.state.player1Field} />
          <MovesCounter player1Counter={model.game?.player2Field?.shots.length}
                        player2Counter={model.game?.player1Field?.shots.length}
                        player1Title={player1Title}
                        player2Title={player2Title} />
          <Battlefield side={battlefield2Side}
                       field={this.state.player2Field}
                       onCellClick={this.blowsExchange} />
        </div>
        <Footer />
      </div>
    );
  }
}
