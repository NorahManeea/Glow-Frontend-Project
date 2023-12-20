import { ROLES } from "../constant/constants"
import { OrderStatus } from "../redux/slices/orderSlice"

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
//** Categories */
export type Category = {
  _id: string
  name: string
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
  orderStatus: OrderStatus
}
//** Reviews */
export type Review = {
  id: number
  reviewText: string
  user: string
  date: string
}
//** Discount Code */
export type DiscountCode = {
  _id: string
  code: string
  discountPercentage: number
  expirationDate: Date
}
//** Cart */
export type Cart = {
  product: Product;
  quantity: number;
  _id: string;
}
//** Wishlist */
export type WishList = {
  product: Product;
  _id: string;
}
//** Decoded User */
export type DecodedUser = {
  email: string
  exp: number
  iat: number
  role: Role
  userId: string
  firstName: string
  lastName: string
  isBlocked: boolean
}
//** Role */
export type Role = keyof typeof ROLES

//** Toast */
export type ToastType = 'success' | 'error' | 'info' | 'warning'

//---------STATES----------//
//** User State */
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  user: User | null
  usersCount: number
  decodedUser: DecodedUser | null
}
//** Product State */
export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchText: string
  singleProduct: Product
  cartItems: Product[]
  productCount: number
  totalPages: number
}
//** Category States */
export type CategoryState = {
  category: Category[]
  error: null | string
  isLoading: boolean
}
//** Orders State */
export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  orderCount: number
  singleOrder: Order
}
//** Discount State */
export type DiscountState = {
  discountCodes: DiscountCode[]
  error: null | string
  isLoading: boolean
}
//** Cart State */
export type  CartState = {
  cartItems: Cart[]
  error: null | string
  isLoading: boolean
  cartLength: number
  totalItems: number,
  totalPrice: number,
}

export type WishlistState ={
  wishlistItem: WishList[]
  error: null | string
  isLoading: boolean
}

//--------Forms Inputs----------//

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

//--------Modal Props----------//

export type ProductModalProps = {
  selectedProduct: Product | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}
export type CategoryModalProps = {
  selectedCategory: Category | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}
export type DiscountCodeModalProps = {
  selectedCode: DiscountCode | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}
export type ProfileModalProps = {
  user: User 
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}
export type ReviewListProps = {
  reviews: Review[]
}



