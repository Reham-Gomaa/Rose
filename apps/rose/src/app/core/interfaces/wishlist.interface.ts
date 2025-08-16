export interface wishlistResponse {
  message: string;
  count: number;
  wishlist: Wishlist;
}

export interface Wishlist {
  user: string;
  products: any[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
