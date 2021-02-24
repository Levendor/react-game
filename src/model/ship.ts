import { SHIP_AREA_WIDTH } from '../constants';

export default class Ship {
  type: string;
  length: number;
  position: string;
  coordinates: Array<number[]>;
  stringCoordinates: string[];
  shipArea: string[];

  constructor(type: string, position: string, entryPoints: number[]) {
    this.type = type;
    this.length = this.getShipSize(type);
    this.position = position;
    this.coordinates = this.getShipCoordinates(position, entryPoints);
    this.stringCoordinates = this.coordinates.map((point => point.join('')));
    this.shipArea = this.getShipArea(position, entryPoints);
  }

  isVertical(position: string) {
    if (position === 'vertical') {
      return true;
    } else return false;
  }

  getShipSize(type: string): number {
    switch (type) {
      case 'battlecruiser':
        return 4;
      case 'cruiser':
        return 3;
      case 'destroyer':
        return 2;
      case 'boat':
        return 1;
      default:
        return 0;
    }
  }

  getShipCoordinates(position: string, entryPoints: number[]) {
    return new Array(this.length)
    .fill(0)
    .map((item, index) => {
      if (this.isVertical(position)) {
        return [entryPoints[0] + index, entryPoints[1]]
      } else return [entryPoints[0], entryPoints[1] + index];
  });
  }

  getShipArea(position: string, entryPoints: number[]) {
    const area = [];
    const top = entryPoints[0] - 1;
    const left = entryPoints[1] - 1;
    if (this.isVertical(position)) {
      for (let i = top; i < top + this.length + 2; i++) {
        for (let j = left; j < left + SHIP_AREA_WIDTH; j++) {
          area.push(`${i}${j}`);
        }
      }
    } else {
      for (let i = top; i < top + SHIP_AREA_WIDTH; i++) {
        for (let j = left; j < left + this.length + 2; j++) {
          area.push(`${i}${j}`);
        }
      }
    }
    return area;
  }
}
