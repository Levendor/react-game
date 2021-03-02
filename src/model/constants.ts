const INITIAL_SHOT_BEFORE_LAST = 1;
const MAX_NEARBY_CELLS = 4;
const AUTO_GAME_TIME_STEP = 1000;
const GAME_TIME_STEP = 1000;
const SOUND_DELAY = 400;
const CRUSH_SOUND_DELAY = 300;
const TIME_BEFORE_NEW_ROUND = 5000;
const DEFAULT_PLAYER1_NAME: string = 'player 1';
const DEFAULT_PLAYER2_NAME: string = 'computer';
const DEFAULT_DIFFICULTY_LEVEL = 2;
const DEFAULT_BEST_OF: number = 2;
const DEFAULT_AUDIO_VALUE = 1;
const DEFAULT_MUSIC_VALUE = 1;
const DEFAULT_THEME_VALUE = 1;
const INITIAL_SCORE: number[] = [0, 0];
const FIELD_SIZE: number = 10;
const EMPTY_CELL = 0;
const CELL_WITH_SHIP = 1;
const HIT = 2;
const MISS = 3;
const BEST_OF_SETTINGS: number[] = [1, 2, 3];
const SHIP_AREA_WIDTH: number = 3;
const SHIPS: string[] = [
  'battlecruiser',
  'cruiser',
  'cruiser',
  'destroyer',
  'destroyer',
  'destroyer',
  'boat',
  'boat',
  'boat',
  'boat',
];
const TOP_LINE_TEMPLATE: string[] = ['', 'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];
const LEFT_LINE_TEMPLATE: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const FIELD_TEMPLATE: Array<number[]> = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const HEADER_BUTTONS_TITLES: string[] = [
  'New game',
  'Statistics',
  'Settings',
  'Autoplay',
  'Change user',
]

export {
  INITIAL_SHOT_BEFORE_LAST,
  MAX_NEARBY_CELLS,
  AUTO_GAME_TIME_STEP,
  GAME_TIME_STEP,
  SOUND_DELAY,
  CRUSH_SOUND_DELAY,
  TIME_BEFORE_NEW_ROUND,
  DEFAULT_PLAYER1_NAME,
  DEFAULT_PLAYER2_NAME,
  DEFAULT_DIFFICULTY_LEVEL,
  DEFAULT_BEST_OF,
  DEFAULT_AUDIO_VALUE,
  DEFAULT_MUSIC_VALUE,
  DEFAULT_THEME_VALUE,
  INITIAL_SCORE,
  FIELD_SIZE,
  SHIPS,
  EMPTY_CELL,
  CELL_WITH_SHIP,
  HIT,
  MISS,
  BEST_OF_SETTINGS,
  SHIP_AREA_WIDTH,
  TOP_LINE_TEMPLATE,
  LEFT_LINE_TEMPLATE,
  FIELD_TEMPLATE,
  HEADER_BUTTONS_TITLES,
};