import type { UnitType } from './unit_type'

export interface Order {
  id: number,
  items: OrderItem[]
  notes: string
}
export interface OrderItem {
  id: string
  name: string
  available_quantity: number
  unit: UnitType
  price_per_unit_in_minor: number
  quantity: number
}
