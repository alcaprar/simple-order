export enum UnitType {
  Piece,
  Kilogram,
  Hectogram,
  Unknown
}

export function fromString(unit: string): UnitType {
  switch (unit) {
    case 'Piece':
      return UnitType.Piece
    case 'Kg':
      return UnitType.Kilogram
    case 'Hg':
      return UnitType.Hectogram
    default:
      return UnitType.Unknown
  }
}

export function toString(unit: UnitType): string {
  switch (unit) {
    case UnitType.Piece:
      return 'Piece'
    case UnitType.Kilogram:
      return 'Kg'
    case UnitType.Hectogram:
      return 'Hg'
    default:
      return ''
  }
}
