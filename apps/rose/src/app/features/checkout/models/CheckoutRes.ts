import { Product } from "@rose/core_interfaces/carditem.interface"

export interface CashRes {
  message: string
  order: Order
}

export interface Order {
  user: string
  orderItems: Product[]
  totalPrice: number
  paymentType: string
  isPaid: boolean
  isDelivered: boolean
  state: string
  _id: string
  createdAt: string
  updatedAt: string
  orderNumber: string
  __v: number
}


export interface CreditRes {
  message: string
  session: Session
}

export interface Session {
  id: string
  object: string
  adaptive_pricing: AdaptivePricing
  after_expiration: any
  allow_promotion_codes: any
  amount_subtotal: number
  amount_total: number
  automatic_tax: AutomaticTax
  billing_address_collection: any
  cancel_url: string
  client_reference_id: string
  client_secret: any
  collected_information: CollectedInformation
  consent: any
  consent_collection: any
  created: number
  currency: string
  currency_conversion: any
  custom_fields: any[]
  custom_text: CustomText
  customer: any
  customer_creation: string
  customer_details: CustomerDetails
  customer_email: string
  discounts: any[]
  expires_at: number
  invoice: any
  invoice_creation: InvoiceCreation
  livemode: boolean
  locale: any
  metadata: Metadata2
  mode: string
  origin_context: any
  payment_intent: any
  payment_link: any
  payment_method_collection: string
  payment_method_configuration_details: PaymentMethodConfigurationDetails
  payment_method_options: PaymentMethodOptions
  payment_method_types: string[]
  payment_status: string
  permissions: any
  phone_number_collection: PhoneNumberCollection
  recovered_from: any
  saved_payment_method_options: any
  setup_intent: any
  shipping_address_collection: any
  shipping_cost: any
  shipping_details: any
  shipping_options: any[]
  status: string
  submit_type: any
  subscription: any
  success_url: string
  total_details: TotalDetails
  ui_mode: string
  url: string
  wallet_options: any
}

export interface AdaptivePricing {
  enabled: boolean
}

export interface AutomaticTax {
  enabled: boolean
  liability: any
  provider: any
  status: any
}

export interface CollectedInformation {
  shipping_details: any
}

export interface CustomText {
  after_submit: any
  shipping_address: any
  submit: any
  terms_of_service_acceptance: any
}

export interface CustomerDetails {
  address: any
  email: string
  name: any
  phone: any
  tax_exempt: string
  tax_ids: any
}

export interface InvoiceCreation {
  enabled: boolean
  invoice_data: InvoiceData
}

export interface InvoiceData {
  account_tax_ids: any
  custom_fields: any
  description: any
  footer: any
  issuer: any
  metadata: Metadata
  rendering_options: any
}

export interface Metadata {}

export interface Metadata2 {
  city: string
  lat: string
  long: string
  phone: string
  street: string
}

export interface PaymentMethodConfigurationDetails {
  id: string
  parent: any
}

export interface PaymentMethodOptions {
  card: Card
}

export interface Card {
  request_three_d_secure: string
}

export interface PhoneNumberCollection {
  enabled: boolean
}

export interface TotalDetails {
  amount_discount: number
  amount_shipping: number
  amount_tax: number
}



export interface checkoutFailureRes {
  headers: Headers
  status: number
  statusText: string
  url: string
  ok: boolean
  name: string
  message: string
  error: Error
}

export interface Headers {
  headers: Headers2
  normalizedNames: NormalizedNames
  lazyUpdate: any
}

export interface Headers2 {}

export interface NormalizedNames {}

export interface Error {
  error: string
}
