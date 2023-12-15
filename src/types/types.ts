//** Users */
export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  activationToken: string
  isAccountVerified: boolean
  isBlocked: boolean
  avatar: string
  resetPasswordToken?: string
}
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  user: User | null
  usersCount: number
}

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const
export type Role = keyof typeof ROLES

export type AuthState = {
  users: []
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}
//** Products */
export type Product = {
  _id: string
  name: string
  image: string
  description: string
  categories: string
  price: number
  quantityInStock: number
  discount: number
}

export type DiscountCode = {
  _id: string
  code: string
  discountPercentage: number
  expirationDate: Date
}

export type Review = {}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchText: string
  singleProduct: Product
  cartItems: Product[]
  cartLength: number
  productCount: number
}

//** Category */
export type Category = {
  _id: string
  name: string
}
export type CategoryState = {
  category: Category[]
  error: null | string
  isLoading: boolean
}
//** Orders */
export type Order = {
  _id: string
  uniqueId: string,
  user: string
  orderDate: Date
  products: {
    product: string
    quantity: number
  }[]
  shippingInfo: {
    country: string
    city: string
    address: string
  }
  orderStatus: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  orderCount: number
}

//**  Forms Inputs */
export type ProductFormInput = {
  name: string
  image: string
  description: string
  categories: string
  variants: string
  sizes: number
  price: number
}

export type LoginFormInput = {
  email: string
  password: string
}

export type RegisterFormInput = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type DiscountState = {
  discountCodes: DiscountCode[]
  error: null | string
  isLoading: boolean
}

//** Modal Props */
export type CategoryModalProps = {
  selectedCategory: Category | null
  openModal: () => void
  onSubmit: (category: Category) => void
}

export type DiscountCodeModalProps = {
  selectedCode: DiscountCode | null
  openModal: () => void
  onSubmit: (discountCode: DiscountCode) => void
}
