import { FIELD_TEMPLATE, FIELD_SIZE, SHIPS } from './constants';
import Ship from './Ship';

export default class Field {
  ships: Ship[];
  occupiedCells: Array<number[]>;
  stringOccupiedCells: string[];
  field: Array<number[]>;
  shots: string[];

  constructor(loadedField?: Field) {
    this.ships = loadedField 
      ? [] 
      : this.createShips();
    this.occupiedCells = loadedField
      ? []
      : this.placeShips(this.ships);
    this.stringOccupiedCells = loadedField
      ? []
      : this.occupiedCells.map((cell) => cell.join(''))
    this.field = loadedField
      ? []
      : this.generateField(this.occupiedCells);
    this.shots = [];
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

  shot = (coordinates: number[]) => {
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

  isHit = (hitPoint?:string) => {
    const checkPoint = hitPoint ? hitPoint : this.shots[this.shots.length - 1];
    return this.stringOccupiedCells.some((point) => {
      return point === checkPoint;
    })
  }

  checkCellsNearby = (i: number): any => {
    console.log(i);
    if (i > 4) return [];
    const hitPoint = this.shots[this.shots.length - i];
    if (this.isHit(hitPoint)) {
      const [hitPointY, hitPointX] = [+hitPoint[0], +hitPoint[1]];
      return [
        [hitPointY + 1, hitPointX],
        [hitPointY - 1, hitPointX],
        [hitPointY, hitPointX + 1],
        [hitPointY, hitPointX - 1],
      ]
      .filter((hitPoint) => !this.shots.includes(hitPoint.join('')))
      .filter((hitPoint) => hitPoint
          .every((coordinate) => coordinate >= 0 && coordinate < FIELD_SIZE))
    } else return this.checkCellsNearby(i + 1);
  }
}
