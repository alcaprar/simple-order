export interface Response<T> {
  data: ResponseItem<T>[];
  meta: ResponseMetadata;
}

export interface ResponseMetadata {
  pagination: ResponsePagination;
}

export interface ResponsePagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ResponseItem<T> {
  attributes: T;
  id: number;
}

export interface OrderDto {
  id: number;
  notes: string;
  order_items: OrderItemDto[];
  sale: Sale;
}

export interface OrderItemDto {
  id: number;
  quantity: number;
  product_sale: ProductSale;
}

export interface ProductSale {
  id: number;
  total_available: number;
  current_available: number;
  amount_in_minor: number;
  product: ProductDto;
}

export interface Sale {
  id: number;
  startDate: string;
  endDate: string;
}

export interface ProductDto {
  id: number;
  name: string;
  unit: string;
}

export interface Shop {
  Name: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
}
