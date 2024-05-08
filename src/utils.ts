import { UnitType } from './models/unit_type'

export default {
  formatUnitType(unit: UnitType): string {
    switch (unit) {
      case UnitType.Kilogram:
        return 'kg'
      case UnitType.Piece:
        return 'pezzo'
      default:
        return ''
    }
  },
  formatAmountInMinor(amount: number): number {
    return amount / 100
  }
}
