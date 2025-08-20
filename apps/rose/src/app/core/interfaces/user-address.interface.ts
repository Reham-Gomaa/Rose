export interface AddressRes {
  message: string
  addresses: Address[]
}
export interface AddressAddRes {
  message: string
  address: Address[]
}

export interface Address {
  street: string
  phone: string
  city: string
  lat: string
  long: string
  username: string
  _id: string
}