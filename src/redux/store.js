import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './features/counterSlice'

export const store = configureStore({
  reducer: { 
    items: itemReducer, 
  },
})
