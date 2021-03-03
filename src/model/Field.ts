import { FIELD_TEMPLATE, FIELD_SIZE, SHIPS, MAX_NEARBY_CELLS, INITIAL_SHOT_BEFORE_LAST, DEFAULT_DIFFICULTY_LEVEL } from './constants';
import Ship from './Ship';

export default class Field {
  ships: Ship[];
  occupiedCells: Array<number[]>;
  stringOccupiedCells: string[];
  field: Array<number[]>;
  shots: string[];
  wreckedShipsArea: string[];
  difficultyLevel: number;

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
    this.wreckedShipsArea = [];
    this.difficultyLevel = DEFAULT_DIFFICULTY_LEVEL;
    if (loadedField) Object.assign(this, loadedField);
  }

  setDifficultyLevel = (difficultyLevel: number) => {
    this.difficultyLevel = difficultyLevel;
  }

  createShips = (): Ship[] => {
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

  isShipPlacedWrong = (coordinates: Array<number[]>, stringCoordinates: string[], shipArray: Ship[]) => {
    const isShipsIntersected: boolean = stringCoordinates
      .some((point) => shipArray
        .some((ship: Ship) => ship.stringShipArea
          .includes(point)));
  
    const isShipOutsideField: boolean = coordinates
      .some((point: number[]) => point
        .some((coordinate: number) => coordinate >= FIELD_SIZE));
  
    return isShipsIntersected || isShipOutsideField;
  }
  
  placeShips = (shipsArray: Ship[]) => {
    const occupiedCells = shipsArray.map((ship: Ship) => {
      return [...ship.coordinates]
    }).flat();
  
    return occupiedCells;
  }

  generateField = (occupiedCellsArray: Array<number[]>) => {
    const field = FIELD_TEMPLATE.map((row) => [...row]);
  
    occupiedCellsArray.forEach((cell) => {
      if (cell[0] < FIELD_SIZE && cell[1] < FIELD_SIZE) field[cell[0]][cell[1]] = 1;
    })
  
    return field;
  }

  targeting = (coordinates: number[]) => {
    const point = coordinates.join('');
    return this.shots.includes(point)
      || this.wreckedShipsArea.includes(point)
  }

  aiming = () => {
    let point: number[];
    const targets = this.difficultyLevel > 1 
      ? this.checkCellsNearby(INITIAL_SHOT_BEFORE_LAST)
      : [];
    const length = targets.length;
    do {
      if (length) {
        point = targets[Math.floor(Math.random() * length)];
      } else {
        point = [
        Math.floor(Math.random() * FIELD_SIZE),
        Math.floor(Math.random() * FIELD_SIZE),
      ];
    }
    } while (this.targeting(point));
    return point;
  }

  shot = (coordinates: number[]) => {
    this.shots.push(coordinates.join(''));

    const wreckedShip = this.getWreckedShipArea(coordinates)
    const wreckedShipArea = wreckedShip ? wreckedShip.shipArea : [];
    const stringWreckedShipArea = wreckedShip ? wreckedShip.stringShipArea : [];
    this.wreckedShipsArea = Array
      .from(new Set([...this.wreckedShipsArea, ...stringWreckedShipArea]));

    const coordinatesToMark = wreckedShip
      ? [coordinates, ...wreckedShipArea]
      : [coordinates];

    coordinatesToMark.forEach((coordinates) => {
      const [Y, X] = coordinates;
      this.field = this.field.map((row, rowIndex) => {
          if (rowIndex === Y) {
          return row.map((cell, cellIndex) => {
            if (cellIndex === X) {
              if (cell === 0) return 3;
              else if (cell === 1) return 2;
              return cell
            }
            return cell;
          })
        }
        return row;
      })
    })

    return this.field;
  }

  whatIsThisShip = (coordinates: number[]) => {
    return this.ships.find((ship) => {
      return ship.stringCoordinates.includes(coordinates.join(''));
    })
  }

  isShipWrecked = (ship: Ship) => {
    return ship.stringCoordinates
      .every((hitPoint) => this.shots
      .includes(hitPoint));
  }

  getWreckedShipArea = (coordinates: number[]) => {
    let ship = this.whatIsThisShip(coordinates);
    if (ship && this.isShipWrecked(ship)) {
      ship.isWrecked = true;
      return ship;
    };
    return undefined;
  }

  isHit = (hitPoint?:string) => {
    const checkPoint = hitPoint ? hitPoint : this.shots[this.shots.length - 1];
    return this.stringOccupiedCells.some((point) => {
      return point === checkPoint;
    })
  }

  getCellsNearby = (hitPoint: string) => {
    const [hitPointY, hitPointX] = [+hitPoint[0], +hitPoint[1]];
    return [
      [hitPointY + 1, hitPointX],
      [hitPointY - 1, hitPointX],
      [hitPointY, hitPointX + 1],
      [hitPointY, hitPointX - 1],
    ]
  }

  isIntactCell = (coordinates: number[]) => {
    const point = coordinates.join('');
    return !this.shots.includes(point)
      && !this.wreckedShipsArea.includes(point)
  }

  isCellWithinBattlefield = (coordinates: number[]) => {
    return coordinates.every((coordinate) => coordinate >= 0 && coordinate < FIELD_SIZE)
  }

  checkCellsNearby = (shotsBeforeLast: number): number[][] => {
    if (shotsBeforeLast > MAX_NEARBY_CELLS) return [];
    const hitPoint = this.shots[this.shots.length - shotsBeforeLast];
    if (this.isHit(hitPoint)) {
      const validCellsNearby = this.getCellsNearby(hitPoint)
        .filter(this.isCellWithinBattlefield);

      const intactValidCellsNearby = validCellsNearby.filter(this.isIntactCell);
      if (!intactValidCellsNearby.length) return [];
  
      const anotherShipDecks = this.difficultyLevel > 2
        ? this.isLongShipGetHerAnotherDecks(hitPoint, validCellsNearby)
        : [];
      const intactAnotherShipDecks = anotherShipDecks.filter(this.isIntactCell);

      if (intactAnotherShipDecks.length) {
        return intactAnotherShipDecks;
      } else {
        return intactValidCellsNearby;
      }
    } else return this.checkCellsNearby(shotsBeforeLast + 1);
  }

  isLongShipGetHerAnotherDecks = (hitPoint: string, cellsNearby: number[][]): number[][] => {
    const hitCoordinates = hitPoint.split('');
    const anotherWreckedShipDeck = cellsNearby.find((cell) => {
      return this.shots.includes(cell.join(''))
        && this.stringOccupiedCells.includes(cell.join(''))
    })
    let anotherShipDecks: number[][];
    if (anotherWreckedShipDeck) {
      const diffY = Math.abs(+hitCoordinates[0] - anotherWreckedShipDeck[0]);
      const diffX = Math.abs(+hitCoordinates[1] - anotherWreckedShipDeck[1]);
      if (diffY === 1) { anotherShipDecks = [
          [+hitCoordinates[0] + 1, +hitCoordinates[1]],
          [anotherWreckedShipDeck[0] - 1, anotherWreckedShipDeck[1]],
          [anotherWreckedShipDeck[0] + 1, +hitCoordinates[1]],
          [+hitCoordinates[0] - 1, anotherWreckedShipDeck[1]],
      ]} else if (diffX === 1) {anotherShipDecks = [
        [+hitCoordinates[0], +hitCoordinates[1] + 1],
        [anotherWreckedShipDeck[0], anotherWreckedShipDeck[1] + 1],
        [anotherWreckedShipDeck[0], +hitCoordinates[1] - 1],
        [+hitCoordinates[0], anotherWreckedShipDeck[1] - 1],
      ]} else anotherShipDecks = [];
    } else anotherShipDecks = [];
    return anotherShipDecks;
  }
}
