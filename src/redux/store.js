'use client'

import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from './reducer/bookingSlice'
import loaderSlice from './reducer/loaderSlice'

export const store = () => {
  return configureStore({
    reducer: {
        booking: bookingSlice,
        loader: loaderSlice,
    },
  })
}