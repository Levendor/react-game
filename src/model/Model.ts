import Field from './Field';
import { DEFAULT_BEST_OF, INITIAL_SCORE, DEFAULT_PLAYER2_NAME } from './constants';

type User = {
  name: string;
  games: number;
  gamesWon: number;
  addGame(isWin: boolean): void
}

type Game = {
  bestOf: number | undefined;
  score: number[] | undefined;
  player1Field?: Field;
  player2Field?: Field;
}

export default class Model {
  game?: Game;
  player1?: User;
  player2: string;

  constructor() {
    this.player2 = DEFAULT_PLAYER2_NAME;
  }

  init = () => {
    const savedGame = localStorage.getItem(`levendor-react-game-${this.player1?.name}`);

    if (!!savedGame) {
      this.loadGame(JSON.parse(savedGame));
    } else {
      this.newGame(DEFAULT_BEST_OF);
    }
  }

  get bestOf() {
    if (!!this.game) return this.game.bestOf;
    return DEFAULT_BEST_OF;
  }

  set bestOf(value) {
    if (!!this.game) this.game.bestOf = value;
  }

  setScore = (index: number) => {
    if (!!this.game?.score) this.game.score[(index + 1) % 2]++;
  }

  finishGame =() => {
    const [player1Score, player2Score] = this.game?.score
      ? this.game?.score
      : INITIAL_SCORE;
    this.player1?.addGame(player1Score > player2Score);
  }

  isGameOver = () => {
    const scores = this.game?.score;
    return scores?.some((score) => {
      return score === this.game?.bestOf;
    });
  }

  isRoundOverGetWinner = (fields: (Field | undefined)[]) => {
    const fieldIndex = fields?.findIndex((field) => field?.ships.every((ship) => ship.isWrecked));
    if (fieldIndex === -1) return undefined;
    return fieldIndex;
  }

  newRound = () => {
    this.game = {
      bestOf: this.game?.bestOf,
      score: this.game?.score,
      player1Field: new Field(),
      player2Field: new Field(),
    }
  }

  newGame = (bestOf?: number) => {
    this.game = {
      bestOf: bestOf ? bestOf : DEFAULT_BEST_OF,
      score: INITIAL_SCORE,
      player1Field: new Field(),
      player2Field: new Field(),
    }
  }

  saveGame = () => {
    const stringGame = JSON.stringify(this.game);
    localStorage.setItem(`levendor-react-game-${this.player1?.name}`, stringGame);
  }

  loadGame = (game: Game) => {
    this.game = {
      bestOf: game.bestOf,
      score: game.score,
      player1Field: new Field(game.player1Field),
      player2Field: new Field(game.player2Field),
    }
  }

  newUser = (name: string) => {
    this.player1 = {
      name,
      games: 0,
      gamesWon: 0,

      addGame(isWin: boolean) {
        this.games += 1;
        if (isWin) this.gamesWon += 1;
      }
    }

    const users = this.getUsersStorage();
    const existedUser = this.getUserFromUsersStorage(users, this.player1.name);
  
    if (existedUser) this.player1 = Object.assign(this.player1, existedUser);
    else this.saveUser();

    this.setUser(this.player1.name);
  }

  setUser = (name: string) => {
    localStorage.setItem('levendor-react-game-user', name);
  }

  saveUser = () => {
    const users = this.getUsersStorage();
    const existedUserIndex = this.getUserIndexFromUsersStorage(users, this.player1?.name);
  
    if (existedUserIndex > -1) {
      users[existedUserIndex] = this.player1;
      users.sort((player1: User, player2: User) => player2.gamesWon - player1.gamesWon);
    } else {
      users.push(this.player1).sort((player1: User, player2: User) => player2.gamesWon - player1.gamesWon);
    }

    localStorage.setItem('levendor-react-game-users', JSON.stringify(users));
  }

  getUsersStorage = () => {
    const loadedUsers = localStorage.getItem('levendor-react-game-users');
    const users = loadedUsers
      ? JSON.parse(loadedUsers)
      : [];
    return users;
  }

  getUserIndexFromUsersStorage = (storage: User[], userName: string | undefined): number => {
    const existedUserIndex = storage.findIndex((user: User) => user.name === userName);
    return existedUserIndex;
  }

  getUserFromUsersStorage = (storage: User[], userName: string | undefined): User | undefined => {
    const existedUser = storage.find((user: User) => user.name === userName);
    return existedUser;
  }
}