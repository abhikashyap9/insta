import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import sizesReducer from '../features/counter/AddDifferentSizes'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
     sizes: sizesReducer
  },
})