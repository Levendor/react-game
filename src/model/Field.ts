import { FIELD_TEMPLATE, FIELD_SIZE, SHIPS } from './constants';
import Ship from './Ship';

export default class Field {
  ships: Ship[];
  occupiedCells: Array<number[]>;
  field: Array<number[]>;
  shots: string[];
  hit: string[];

  constructor(loadedField?: Field) {
    this.ships = this.createShips();
    this.occupiedCells = this.placeShips(this.ships);
    this.field = this.generateField(this.occupiedCells);
    this.shots = [];
    this.hit = [];
    if (loadedField) Object.assign(this, loadedField);
  }

  createShips(): Ship[] {
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
      } while (this.isShipPlacedWrong(newShip.coordinates,
                                 newShip.stringCoordinates,
                                        ships));
      ships.push(newShip);
    })
    return ships;
  }

  isShipPlacedWrong(coordinates: Array<number[]>, stringCoordinates: string[], shipArray: Ship[]) {
    const isShipsIntersected: boolean = stringCoordinates
      .some((point) => shipArray.some((ship: Ship) => ship.stringShipArea.includes(point)));
  
    const isShipOutsideField: boolean = coordinates
      .some((point: number[]) => point.some((coordinate: number) => coordinate >= FIELD_SIZE));
  
    return isShipsIntersected || isShipOutsideField;
  }
  
  placeShips(shipsArray: Ship[]) {
    const occupiedCells = shipsArray.map((ship: Ship) => {
      return [...ship.coordinates]
    }).flat();
  
    return occupiedCells;
  }

  generateField(occupiedCellsArray: Array<number[]>) {
    const field = FIELD_TEMPLATE.map((row) => [...row]);
  
    occupiedCellsArray.forEach((cell) => {
      if (cell[0] < FIELD_SIZE && cell[1] < FIELD_SIZE) field[cell[0]][cell[1]] = 1;
    })
  
    return field;
  }

  aiming = (coordinates: number[]) => {
    const point = coordinates.join('');
    return this.shots.some((shot) => shot === point);
  }

  shot(coordinates: number[]) {
    const point = [...coordinates];

    this.shots.push(point.join(''));

    this.field = this.field.map((row, rowIndex) => {
      if (rowIndex === point[0]) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === point[1]) {
            if (cell === 0) return 3;
            else if (cell === 1) return 2;
            return cell
          }
          return cell;
        })
      }
      return row;
    })

    return this.field;
  }
}
