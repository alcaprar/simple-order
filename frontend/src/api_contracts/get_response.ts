export interface Response<T> {
  data: ResponseItem<T>[]
  meta: ResponseMetadata
}

export interface ResponseMetadata {
    pagination: ResponsePagination
}

export interface ResponsePagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}

export interface ResponseItem<T> {
  attributes: T
  id: number
}
