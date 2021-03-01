import Field from './Field';
import { another, compare } from './Utils';
import { DEFAULT_BEST_OF, INITIAL_SCORE, DEFAULT_PLAYER2_NAME, DEFAULT_PLAYER1_NAME, DEFAULT_DIFFICULTY_LEVEL } from './constants';

type User = {
  name: string;
  games: number;
  gamesWon: number;
  difficultyLevel: number;
  addGame(isWin: boolean): void
}

type Game = {
  bestOf: number;
  score: number[];
  player1Field: Field;
  player2Field: Field;
}

export default class Model {
  users: User[];
  game: Game;
  bestOf: number;
  player1: User;
  player2: string;

  constructor() {
    const currentUserName = this.loadCurrentUserName();
    this.users = this.getUsersStorage();
    this.bestOf = DEFAULT_BEST_OF;
    this.player1 = currentUserName
      ? this.newUser(currentUserName)
      : this.newUser();
    this.game = currentUserName 
    ? this.start(currentUserName)
    : this.start();
    this.player2 = DEFAULT_PLAYER2_NAME;
  }

  start = (userName?: string) => {
    const savedGame = userName 
      ? this.getGameFromStorage(userName)
      : undefined;

    const game = savedGame
      ? this.loadGame(JSON.parse(savedGame))
      : this.newGame();
    return game;
  }

  setBestOf = (value: number) => {
    this.bestOf = value;
  }

  setScore = (index: number) => {
    this.game.score[another(index)]++;
  }

  finishGame =() => {
    const [player1Score, player2Score] = this.game.score;
    this.player1.addGame(player1Score > player2Score);
    this.saveUserStatistics();
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

  newGame = () => {
    const game = {
      bestOf: this.bestOf,
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

  getGameFromStorage = (userName: string) => {
    return localStorage.getItem(`levendor-react-game-${userName}`);
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
    if (this.player1 && name === this.player1.name) return this.player1;

    const user = {
      name: name ? name : DEFAULT_PLAYER1_NAME,
      games: 0,
      gamesWon: 0,
      difficultyLevel: DEFAULT_DIFFICULTY_LEVEL,

      addGame(isWin: boolean) {
        this.games += 1;
        if (isWin) this.gamesWon += 1;
      }
    }

    const existedUser = this.getUserFromUsersStorage(user.name);
  
    if (existedUser) Object.assign(user, existedUser);
    else this.addUserToUsersStorage(user);

    this.setUser(user.name);

    return user;
  }

  setUser = (name: string) => {
    localStorage.setItem('levendor-react-game-user', name);
  }

  loadCurrentUserName = () => {
    return localStorage.getItem('levendor-react-game-user');
  }

  addUserToUsersStorage = (user: User) => {
    this.users.push(user);
    this.users.sort((player1: User, player2: User) => {
      return compare(player1.gamesWon, player2.gamesWon, 'descending');
    });

    localStorage.setItem('levendor-react-game-users', JSON.stringify(this.users));
  }

  saveUserStatistics = () => {
    const existedUserIndex = this.getUserIndexFromUsersStorage(this.player1.name);
  
    if (existedUserIndex > -1) {
      Object.assign(this.users[existedUserIndex], this.player1);
      this.users.sort((player1: User, player2: User) => {
        return compare(player1.gamesWon, player2.gamesWon, 'descending');
      });
    }
  }

  getUsersStorage = (): User[] => {
    const loadedUsers = localStorage.getItem('levendor-react-game-users');
    const users = loadedUsers
      ? JSON.parse(loadedUsers)
      : [];
    return users;
  }

  getUserIndexFromUsersStorage = (userName: string): number => {
    return this.users.findIndex((user: User) => user.name === userName);
  }

  getUserFromUsersStorage = (userName: string): User | undefined => {
    return this.users.find((user: User) => user.name === userName);
  }

  changeDifficultyLevel = (value: number) => {
    this.player1.difficultyLevel = value;
  }
}