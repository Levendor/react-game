import React, { Component } from 'react';
import Battlefield from '../battlefield';
import Footer from '../footer';
import Header from '../header';
import ScoreLine from '../score-line';
import MovesCounter from '../moves-counter';
import Modal from '../modal';


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
  player1GamesTotal: number;
  player1GamesWon: number;
  player1Field: Array<number[]>;
  player1Moves: number;
  difficultyLevel: number;
  user2Name: string;
  player2Field: Array<number[]>;
  player2Moves: number;
  modalWindow: string;
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
      player1GamesTotal: this.props.model.player1.games,
      player1GamesWon: this.props.model.player1.gamesWon,
      player1Field: this.props.model.game.player1Field.field,
      player1Moves: this.props.model.game.player1Field.shots.length,
      difficultyLevel: this.props.model.player1.difficultyLevel,
      user2Name: this.props.model.player2,
      player2Field: this.props.model.game.player2Field.field,
      player2Moves: this.props.model.game.player2Field.shots.length,
      modalWindow: '',
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
      player1Moves: this.props.model.game.player1Field.shots.length,
      player2Field: game.player2Field.field,
      player2Moves: this.props.model.game.player2Field.shots.length,
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
      player1Moves: this.props.model.game.player1Field.shots.length,
      player2Field: this.props.model.game.player2Field.field,
      player2Moves: this.props.model.game.player2Field.shots.length,
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

    this.isWinGameOrRound(true);

    if (ship) {
      this.setState({ 
        disabledApp: false,
      });
    } else {
      this.enemyStrike();
    }
  }

  enemyStrike() {
    this.isWinGameOrRound(true);

    setTimeout(() => {
      const strikeBack = this.props.model.game.player1Field.aiming();
      const newField = this.props.model.game.player1Field.shot(strikeBack);
      const moves = this.props.model.game.player1Field.shots.length;
      this.setState({ 
        player1Field: newField,
        player2Moves: moves,
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
      else this.setState({ disabledApp: false });
    }, GAME_TIME_STEP);
  }

  isWinGameOrRound = (isWin: boolean) => {
    const fields = [this.props.model.game.player1Field, this.props.model.game.player2Field];
    const fieldIndex = this.props.model.isRoundOverGetWinner(fields);
    if (fieldIndex !== undefined) {
      this.props.model.setScore(fieldIndex);
      console.log(isWin ? 'Ты выиграл этот раунд!' : 'Компьютер выиграл этот раунд');
      if (this.props.model.isGameOver()) {
        console.log(isWin ? 'Победа! Игра окончена!' : 'Игра окончена! Ты проиграл');
        this.setState({
          disabledField: true,
          disabledApp: false
        });
        this.props.model.finishGame();
      } else setTimeout(this.newRound, TIME_BEFORE_NEW_ROUND);
      return;
    }
  }

  openStatistics = () => {
    this.setState({
      modalWindow: 'Statistics',
    });
  }

  openSettings = () => {
    this.setState({
      modalWindow: 'Settings',
    });
  }

  onDifficultyChange = (value: number) => {
    this.props.model.changeDifficultyLevel(value);
    const newLevel = this.props.model.player1.difficultyLevel;
    this.setState({
      difficultyLevel: newLevel,
    })
  }

  openChangeUser = () => {
    this.setState({
      modalWindow: 'Change User',
    });
  }

  closeModal = () => {
    this.setState({
      modalWindow: '',
    });
  }

  render() {
    const { user1Name, player1GamesTotal, player1GamesWon, user2Name, disabledApp, disabledField, isAutoGame, player1Moves, player2Moves, player1Field, player2Field, bestOf, score, modalWindow, difficultyLevel } = this.state;
    const appClass = disabledApp ? "disabled" : "";
    const fieldClass = isAutoGame || disabledField ? "disabled" : "";
    const player1Title = isAutoGame ? "компа 1:" : "твоих:";
    const player2Title = isAutoGame ? "компа 2:" : "компа:";

    return (
      <div className={`app ${appClass}`}>
        <Modal modalWindow={modalWindow}
               onButtonClick={this.closeModal}
               userName={user1Name}
               gamesTotal={player1GamesTotal}
               gamesWon={player1GamesWon}
               difficultLevel={difficultyLevel}
               onDifficultyChange={this.onDifficultyChange} />;
        <Header callbacks={[
            this.newGame,
            this.openStatistics,
            this.openSettings,
            () => {this.newGame(); this.autoGame(0);},
            this.openChangeUser,
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
          <Battlefield side="foe"
                       field={player2Field}
                       onCellClick={this.blowsExchange}
                       isAutoGame={isAutoGame} />
        </div>
        <Footer />
      </div>
    );
  }
}
