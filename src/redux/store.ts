import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'
import passwordReducer from './slices/passwordSlice'
import cartReducer from './slices/cartSlice'
import discountCodeReducer from './slices/discountCode'
import wishlistReducer from './slices/wishlistSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    category: categoryReducer,
    users: userReducer,
    orders: orderReducer,
    passwordReset: passwordReducer,
    cart: cartReducer,
    discountCode: discountCodeReducer,
    wishlist: wishlistReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
