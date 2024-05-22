export enum UnitType {
    Piece,
    Kilogram,
    Hectogram,
    Unknown
  }

  export function fromString(unit: string): UnitType {
    switch (unit) {
      case 'Piece':
        return UnitType.Piece;
        break
      case 'Kg':
        return UnitType.Kilogram
        break
      case 'Hg':
        return UnitType.Hectogram
        break
      default:
          return UnitType.Unknown
    }
  }