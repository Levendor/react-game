import Field from './Field';
import { another } from './Utils';
import { DEFAULT_BEST_OF, INITIAL_SCORE, DEFAULT_PLAYER2_NAME, DEFAULT_PLAYER1_NAME } from './constants';

type User = {
  name: string;
  games: number;
  gamesWon: number;
  addGame(isWin: boolean): void
}

type Game = {
  bestOf: number;
  score: number[];
  player1Field: Field;
  player2Field: Field;
}

export default class Model {
  game: Game;
  player1: User;
  player2: string;

  constructor() {
    const currentUserName = this.loadCurrentUserName();
    this.game = currentUserName 
    ? this.start(currentUserName)
    : this.start();
    this.player1 = currentUserName
      ? this.newUser(currentUserName)
      : this.newUser();
    this.player2 = DEFAULT_PLAYER2_NAME;
  }

  start = (userName?: string) => {
    const savedGame = localStorage.getItem(`levendor-react-game-${userName}`);

    const game = savedGame
      ? this.loadGame(JSON.parse(savedGame))
      : this.newGame(DEFAULT_BEST_OF);
    return game;
  }

  get bestOf() {
    return this.game.bestOf;
  }

  set bestOf(value) {
    this.game.bestOf = value;
  }

  setScore = (index: number) => {
    this.game.score[another(index)]++;
  }

  finishGame =() => {
    const [player1Score, player2Score] = this.game.score;
    this.player1.addGame(player1Score > player2Score);
  }

  isGameOver = () => {
    const scores = this.game.score;
    return scores.some((score) => {
      return score === this.game.bestOf;
    });
  }

  isRoundOverGetWinner = (fields: Field[]) => {
    const fieldIndex = fields.findIndex((field) => field.ships.every((ship) => ship.isWrecked));
    if (fieldIndex === -1) return undefined;
    return fieldIndex;
  }

  newRound = () => {
    this.game = {
      bestOf: this.game.bestOf,
      score: this.game.score,
      player1Field: new Field(),
      player2Field: new Field(),
    }
  }

  newGame = (bestOf?: number) => {
    const game = {
      bestOf: bestOf ? bestOf : DEFAULT_BEST_OF,
      score: INITIAL_SCORE,
      player1Field: new Field(),
      player2Field: new Field(),
    };
    this.game = game;
    this.saveGame();
    return game;
  }

  saveGame = () => {
    const stringGame = JSON.stringify(this.game);
    localStorage.setItem(`levendor-react-game-${this.player1.name}`, stringGame);
  }

  loadGame = (loadedGame: Game) => {
    const game = {
      bestOf: loadedGame.bestOf,
      score: loadedGame.score,
      player1Field: new Field(loadedGame.player1Field),
      player2Field: new Field(loadedGame.player2Field),
    }
    return game;
  }

  newUser = (name?: string) => {
    const user = {
      name: name ? name : DEFAULT_PLAYER1_NAME,
      games: 0,
      gamesWon: 0,

      addGame(isWin: boolean) {
        this.games += 1;
        if (isWin) this.gamesWon += 1;
      }
    }

    const users = this.getUsersStorage();
    const existedUser = this.getUserFromUsersStorage(users, user.name);
  
    if (existedUser) Object.assign(user, existedUser);
    else this.addUserToUsersStorage(users, user);

    this.setUser(user.name);

    return user;
  }

  setUser = (name: string) => {
    localStorage.setItem('levendor-react-game-user', name);
  }

  loadCurrentUserName = () => {
    return localStorage.getItem('levendor-react-game-user');
  }

  addUserToUsersStorage = (storage: User[], user: User) => {
    storage.push(user);
    storage.sort((player1: User, player2: User) => player2.gamesWon - player1.gamesWon);

    localStorage.setItem('levendor-react-game-users', JSON.stringify(storage));
  }

  saveUserStatistics = () => {
    const users = this.getUsersStorage();
    const existedUserIndex = this.getUserIndexFromUsersStorage(users, this.player1.name);
  
    if (existedUserIndex > -1) {
      users[existedUserIndex] = this.player1;
      users.sort((player1: User, player2: User) => player2.gamesWon - player1.gamesWon);
    }

  }

  getUsersStorage = () => {
    const loadedUsers = localStorage.getItem('levendor-react-game-users');
    const users = loadedUsers
      ? JSON.parse(loadedUsers)
      : [];
    return users;
  }

  getUserIndexFromUsersStorage = (storage: User[], userName: string): number => {
    const existedUserIndex = storage.findIndex((user: User) => user.name === userName);
    return existedUserIndex;
  }

  getUserFromUsersStorage = (storage: User[], userName: string): User | undefined => {
    const existedUser = storage.find((user: User) => user.name === userName);
    return existedUser;
  }
}