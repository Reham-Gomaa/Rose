// export interface staticFilterItem {
//   _id: string,
//   name: string,
//   category: string
// }

export interface FilterItem {
  _id: string;
  category: string;
  productCount?: number;
}
export interface selectedItem {
  _id: string;
  type: string;
}

