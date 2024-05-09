import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleslice"
import cartsliceReducer from "../features/cartslice"
import scategoriesReducer from "../features/scategorieslice"
import categoriesReducer from "../features/categorieslice"
import authReducer from "../features/AuthSlice"
import orderReducer from "../features/orderslice"

const store = configureStore({
reducer: {
storearticles:articlesReducer,
storecart:cartsliceReducer,
storescategories: scategoriesReducer,
storecategories: categoriesReducer,
auth:authReducer,
order:orderReducer
}
})
export default store
