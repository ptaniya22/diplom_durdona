import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './products/ProductsSlice'
import ProductItemSlice from './productItem/ProductItemSlice'


export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    productItem: ProductItemSlice,  
  },
})
