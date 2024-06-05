import { UnitType } from './models/unit_type'

export default {
  formatUnitType(unit: UnitType): string {
    switch (unit) {
      case UnitType.Kilogram:
        return 'kg'
      case UnitType.Piece:
        return 'pezzo'
      case UnitType.Hectogram:
        return 'hg'
      default:
        return ''
    }
  },
  formatAmountInMinor(amount: number): number {
    return amount / 100
  },
  debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeoutID: number | undefined = undefined

    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    } as T
  }
}
