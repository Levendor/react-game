import { FIELD_SIZE, SHIPS } from '../constants';
import { fieldTemplate } from './fieldTemplate';
import Ship from './ship';

export function createShips() {
  const ships = SHIPS.map((ship: string) => {
    const position = Math.round(Math.random()) ? 'vertical' : 'horizontal';
    const randomCoordinate1 = Math.floor(Math.random() * FIELD_SIZE);
    const randomCoordinate2 = Math.floor(Math.random() * FIELD_SIZE);
    const entryPoints = [randomCoordinate1, randomCoordinate2];
    return new Ship(ship, position, entryPoints);
  })

  return ships;
}

export function placeShips(shipsArray: Ship[]) {
  const occupiedCells = shipsArray.map((ship: Ship) => {
    return [...ship.coordinates]
  }).flat();

  return occupiedCells;
}

export function generateField(occupiedCellsArray: Array<number[]>) {
  const field = fieldTemplate.map((row) => [...row]);

  occupiedCellsArray.forEach((cell) => {
    if (cell[0] < FIELD_SIZE && cell[1] < FIELD_SIZE) field[cell[0]][cell[1]] = 1;
  })

  return field;
}

const makeField = () =>  generateField(placeShips(createShips()));

export default makeField;
