const FIELD_SIZE = 10;
const BEST_OF_SETTINGS = [1, 2, 3];
const SHIP_AREA_WIDTH = 3;
const SHIPS = [
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
const TOP_LINE_TEMPLATE = ['', 'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];
const LEFT_LINE_TEMPLATE = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const FIELD_TEMPLATE = [
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
const HEADER_BUTTONS_TITLES = [
  'New game',
  'Statistics',
  'Settings',
  'Autoplay',
  'Change user',
]

export {
  FIELD_SIZE,
  SHIPS,
  BEST_OF_SETTINGS,
  SHIP_AREA_WIDTH,
  TOP_LINE_TEMPLATE,
  LEFT_LINE_TEMPLATE,
  FIELD_TEMPLATE,
  HEADER_BUTTONS_TITLES,
};