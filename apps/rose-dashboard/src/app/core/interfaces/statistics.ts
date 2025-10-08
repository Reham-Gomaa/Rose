export interface Statistics {
  message: string;
  statistics: Statistics;
}

export interface Statistics {
  overall: Overall;
  products: Products;
  orders: Orders;
  categories: Category[];
}

export interface Overall {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface Products {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

export interface ProductsByCategory {
  _id: string;
  count: number;
  category: string;
  products: Product[];
}

export interface Product {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold: number;
}

export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
}

export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
}

export interface Orders {
  ordersByStatus: OrdersByStatu[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
}

export interface OrdersByStatu {
  _id?: string;
  count: number;
}

export interface DailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface MonthlyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface Category {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}
