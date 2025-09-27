export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface BillingFormData {
  clientName: string
  email: string
  appointmentNotes: string
}

export interface BillingSummary {
  serviceTotal: number
  productTotal: number
  orderDiscount: number
  taxRate: number
  finalTotal: number
}
