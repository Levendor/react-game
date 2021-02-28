import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSync, faChartLine, faTools, faRobot, faUserFriends, faCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const SYMBOLS: {
  HEADER_BUTTONS_SYMBOLS: IconProp[],
  DOT: IconProp,
  CROSS: IconProp,
  SQUARE: IconProp,
  OK: IconProp,
} = {
  HEADER_BUTTONS_SYMBOLS: [faSync, faChartLine, faTools, faRobot, faUserFriends],
  DOT: faCircle,
  CROSS: faTimes,
  SQUARE: faSquare,
  OK: faCheck,
}

export default SYMBOLS;