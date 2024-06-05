import type { UnitType } from './unit_type'

export interface Order {
  id: number
  items: OrderItem[]
  notes: string
  sale: Sale
}
export interface OrderItem {
  id: number
  name: string
  available_quantity: number
  unit: UnitType
  price_per_unit_in_minor: number
  quantity: number
}

export interface Sale {
  startDate: Date
  endDate: Date
}
