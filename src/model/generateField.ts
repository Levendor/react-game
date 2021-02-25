import { FIELD_SIZE, SHIPS } from './constants';
import { fieldTemplate } from './fieldTemplate';
import Ship from './ship';

export function createShips(): Ship[] {
  const ships: Ship[] = [];
  SHIPS.forEach((ship: string) => {
    let newShip: Ship;
    do {
      const position = Math.round(Math.random()) ? 'vertical' : 'horizontal';
      const entryPoints = [
        Math.floor(Math.random() * FIELD_SIZE),
        Math.floor(Math.random() * FIELD_SIZE),
      ];
      newShip = new Ship(ship, position, entryPoints);
    } while (isShipPlacedWrong(newShip.coordinates, newShip.stringCoordinates, ships));
    ships.push(newShip);
  })
  return ships;
}

export function isShipPlacedWrong(coordinates: Array<number[]>, stringCoordinates: string[], shipArray: Ship[]) {
  const isShipsIntersected: boolean = stringCoordinates
    .some((point) => shipArray.some((ship: Ship) => ship.shipArea.includes(point)));

  const isShipOutsideField: boolean = coordinates
    .some((point: number[]) => point.some((coordinate: number) => coordinate >= FIELD_SIZE));

  return isShipsIntersected || isShipOutsideField;
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
