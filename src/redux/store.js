'use client'

import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from './reducer/bookingSlice'

export const store = () => {
  return configureStore({
    reducer: {
        booking: bookingSlice
    }
  })
}