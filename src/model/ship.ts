export default class Ship {
  type: string;
  length: number;
  position: string;
  coordinates: Array<number[]>;

  constructor(type: string, position: string, entryPoints: number[]) {
    this.type = type;
    this.length = this.getShipSize(type);
    this.position = position;
    this.coordinates = new Array(this.length)
      .fill(0)
      .map((item, index) => {
        if (this.position === 'vertical') {
          return [entryPoints[0] + index, entryPoints[1]]
        } else if (this.position === 'horizontal') {
          return [entryPoints[0], entryPoints[1] + index];
        } else return [...entryPoints];
    })
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
}
