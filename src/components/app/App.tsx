import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';
import MovesCounter from '../moves-counter';


import { AUTO_GAME_TIME_STEP, GAME_TIME_STEP, TIME_BEFORE_NEW_ROUND } from '../../model/constants';
import { another } from '../../model/Utils';
import Model from '../../model/Model';
import Field from '../../model/Field';

import './App.scss';

interface Props {
  model: Model;
}

interface State {
  bestOf: number;
  score: number[];
  user1Name: string;
  player1Field: Array<number[]>;
  player1Moves: number;
  user2Name: string;
  player2Field: Array<number[]>;
  player2Moves: number;
  disabledApp: boolean;
  disabledField: boolean;
  isAutoGame: boolean;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bestOf: this.props.model.game.bestOf,
      score: this.props.model.game.score,
      user1Name: this.props.model.player1.name,
      player1Field: this.props.model.game.player1Field.field,
      player1Moves: this.props.model.game.player1Field.shots.length,
      user2Name: this.props.model.player2,
      player2Field: this.props.model.game.player2Field.field,
      player2Moves: this.props.model.game.player2Field.shots.length,
      disabledApp: false,
      disabledField: false,
      isAutoGame: false,
    }
  }

  newGame = () => {
    const game = this.props.model.newGame();

    this.setState({
      disabledApp: false,
      disabledField: false,
      isAutoGame: false,
      bestOf: game.bestOf,
      score: game.score,
      player1Field: game.player1Field.field,
      player2Field: game.player2Field.field,
    });
  }

  newRound = () => {
    this.props.model.newRound();

    this.setState({
      disabledApp: false,
      disabledField: false,
      isAutoGame: false,
      bestOf: this.props.model.game.bestOf,
      score: this.props.model.game.score,
      player1Field: this.props.model.game.player1Field.field,
      player2Field: this.props.model.game.player2Field.field,
    });
  }

  autoGame = (index: number) => {
    const fields = [
      this.props.model.game.player1Field,
      this.props.model.game.player2Field,
    ];
    if (this.props.model.isRoundOverGetWinner(fields) !== undefined) {
      this.setState({ disabledApp: false })
      return;
    };
    
    this.setState({ 
      disabledApp: true,
      isAutoGame: true,
     })
    
    if (index) {
      this.compStrike('player2', fields[index], index);
    } else {
      this.compStrike('player1', fields[index], index);
    }
  }

  compStrike = (player: string, field: Field, index: number) => {
    const compCoordinate = field.aiming();
    const compPoint = compCoordinate.join('');
    const newField = field.shot(compCoordinate);
    const fieldProp = `${player}Field`;
    const moves = field.shots.length;
    const movesProp = `${player}Moves`;
    this.setState<never>({ 
      [fieldProp]: newField,
      [movesProp]: moves,
    });
    const enemyHit = field.isHit(compPoint);
    if (enemyHit) {
      setTimeout(() => this.autoGame(index), AUTO_GAME_TIME_STEP);
    } else {
      setTimeout(() => this.autoGame(another(index)), AUTO_GAME_TIME_STEP);
    }
  }

  blowsExchange = (coordinates: number[]) => {
    const newField = this.props.model.game.player2Field.shot(coordinates);
    const moves = this.props.model.game.player2Field.shots.length;
    this.setState({
      player2Field: newField,
      player1Moves: moves,
      disabledApp: true,
    });
    const ship = this.props.model.game.player2Field.whatIsThisShip(coordinates);
    const isShipDestroyed = ship
      ? this.props.model.game.player2Field.isShipWrecked(ship)
      : undefined;
    console.log(
      'твой ход:',
      ship
        ? (isShipDestroyed
          ? 'убил'
          : 'попал')
        : 'мимо'
    );
    const fields = [this.props.model.game.player1Field, this.props.model.game.player2Field];
    const fieldIndex = this.props.model.isRoundOverGetWinner(fields);
    if (fieldIndex !== undefined) {
      this.props.model.setScore(fieldIndex);
      console.log('Ты выиграл этот раунд!');
      if (this.props.model.isGameOver()) {
        console.log('Победа! Игра окончена!');
        this.setState({ disabledField: true });
        this.props.model.finishGame();
      } else setTimeout(this.newRound, TIME_BEFORE_NEW_ROUND);
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
    const fields = [this.props.model.game.player1Field, this.props.model.game.player2Field];
    const fieldIndex = this.props.model.isRoundOverGetWinner(fields);
    if (fieldIndex !== undefined) {
      this.props.model.setScore(fieldIndex);
      console.log('Компьютер выиграл этот раунд');
      if (this.props.model.isGameOver()) {
        console.log('Игра окончена! Ты проиграл');
        this.setState({ disabledField: true });
        this.props.model.finishGame();
      } else setTimeout(this.newRound, TIME_BEFORE_NEW_ROUND);
      return;
    }

    setTimeout(() => {
      const strikeBack = this.props.model.game.player1Field.aiming();
      const newField = this.props.model.game.player1Field.shot(strikeBack);
      const moves = this.props.model.game.player1Field.shots.length;
      this.setState({ 
        player1Field: newField,
        player2Moves: moves,
        disabledApp: false,
      });
      const ship = this.props.model.game.player1Field.whatIsThisShip(strikeBack);
      const isShipDestroyed = ship
        ? this.props.model.game.player1Field.isShipWrecked(ship)
        : undefined;
      console.log(
        'ход компьютера:',
        ship
          ? (isShipDestroyed
            ? 'убил'
            : 'попал')
          : 'мимо'
      );
      this.props.model.saveGame();
      if (ship) this.enemyStrike();
    }, GAME_TIME_STEP);
  }

  render() {
    const { user1Name, user2Name, disabledApp, disabledField, isAutoGame, player1Moves, player2Moves, player1Field, player2Field, bestOf, score } = this.state;
    const appClass = disabledApp ? "disabled" : "";
    const fieldClass = isAutoGame || disabledField ? "disabled" : "";
    const battlefield2Side = isAutoGame ? "friend" : "foe";
    const player1Title = isAutoGame ? "компа 1:" : "твоих:";
    const player2Title = isAutoGame ? "компа 2:" : "компа:";

    return (
      <div className={`app ${appClass}`}>
        <Header callbacks={[
            this.newGame,
            console.log,
            console.log,
            () => {
              this.newGame();
              this.autoGame(0);
            },
            console.log,
          ]} />
        <ScoreLine bestOf={bestOf}
                   score={score}
                   players={[user1Name, user2Name]}/>
        <div className={`battlefield-container border ${fieldClass}`}>
          <Battlefield side="friend"
                       field={player1Field} />
          <MovesCounter player1Counter={player1Moves}
                        player2Counter={player2Moves}
                        player1Title={player1Title}
                        player2Title={player2Title} />
          <Battlefield side={battlefield2Side}
                       field={player2Field}
                       onCellClick={this.blowsExchange} />
        </div>
        <Footer />
      </div>
    );
  }
}
