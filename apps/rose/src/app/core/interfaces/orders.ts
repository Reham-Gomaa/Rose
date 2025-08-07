import { Product } from "./carditem.interface"
export interface OrderRes {
  message: string
  metadata: {
    currentPage: number
    totalPages: number
    limit: number
    totalItems: number
  }
  orders: Orders[];
}

export interface Orders {
    _id:         string;
    user:        string;
    orderItems:  OrderItem[];
    totalPrice:  number;
    paymentType: string;
    isPaid:      boolean;
    isDelivered: boolean;
    state:       string;
    createdAt:   Date;
    updatedAt:   Date;
    orderNumber: string;
    __v:         number;
}

export interface OrderItem {
    product:  Product;
    price:    number;
    quantity: number;
    _id:      string;
}

// export interface Product {
//     rateAvg:            number;
//     rateCount:          number;
//     _id:                string;
//     title:              string;
//     slug:               string;
//     description:        string;
//     imgCover:           string;
//     images:             string[];
//     price:              number;
//     priceAfterDiscount: number;
//     quantity:           number;
//     category:           string;
//     occasion:           string;
//     createdAt:          Date;
//     updatedAt:          Date;
//     __v:                number;
//     sold:               number;
//     isSuperAdmin:       boolean;
//     id:                 string;
//     discount?:          number;
// }