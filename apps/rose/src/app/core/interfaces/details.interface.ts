export interface ProductDetailsRes {
  message: string;
  product: ProductDetail;
}

export interface ProductDetail {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  reviews: any[];
  id: string;
}
