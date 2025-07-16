export interface reviewData {
  product: string
  rating: number
  title: string
  comment: string
}

export interface reviewsResponse {
  message: string
  metadata: Metadata
  reviews: reviewData[]
}

export interface Metadata {
  currentPage: number
  totalPages: number
  limit: number
  totalItems: number
}
