const INITIAL_SHOT_BEFORE_LAST = 1;
const MAX_NEARBY_CELLS = 4;
const DEFAULT_PLAYER2_NAME: string = 'computer';
const DEFAULT_BEST_OF: number = 1;
const INITIAL_SCORE: number[] = [0, 0];
const FIELD_SIZE: number = 10;
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
  DEFAULT_PLAYER2_NAME,
  DEFAULT_BEST_OF,
  INITIAL_SCORE,
  FIELD_SIZE,
  SHIPS,
  BEST_OF_SETTINGS,
  SHIP_AREA_WIDTH,
  TOP_LINE_TEMPLATE,
  LEFT_LINE_TEMPLATE,
  FIELD_TEMPLATE,
  HEADER_BUTTONS_TITLES,
};