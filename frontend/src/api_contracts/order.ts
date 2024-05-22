export interface Order {
    id: number,
    notes: string
    order_items: OrderItem[]
    sale: Sale
} 

export interface OrderItem {
    id: number,
    quantity: number
}

export interface ProductSale {
    id: number,
    total_available: number,
    current_available: number,
    amount_in_minor: number,
    product: Product
}

export interface Product {
    id: number,
    name: string,
    unit: string
}

export interface Sale {
    id: number,
    startDate: string,
    endDate: string
}