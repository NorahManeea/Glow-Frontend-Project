// Users
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
}
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}
//   Products
export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchText: string
  singleProduct: Product
  cartItems: Product[]
  cartLength: number,
  currentPage: number,

}

//   Category
export type Category = {
  id: number
  name: string
}
export type CategoryState = {
  category: Category[]
  error: null | string
  isLoading: boolean,
}
//   Orders
export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: Date
}
export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

// Forms Inputs
export type ProductFormInput = {
  name: string;
  image: string;
  description: string;
  categories: string;
  variants: string;
  sizes: number;
  price: number;
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
