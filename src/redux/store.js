import { configureStore } from '@reduxjs/toolkit'
import favSlice from './slices/favSlice'
export default configureStore({
    reducer:{
        favorites:favSlice
    }
})