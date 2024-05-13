import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookingData: null,
    selectedTime: "kokoko",
    testproperty:null
};

const BookingSlice = createSlice({
    name: 'BookingSlice',
    initialState,
    reducers: {
        bookingData: (state, action) => {
            state.bookingData = action.payload
        },

        selectedTime: (state, action) => {
            state.selectedTime = action.payload
        },
        testproperty: (state, action) => {
            state.testproperty = action.payload
        },


    }
})


export const { bookingData, selectedTime ,testproperty} = BookingSlice.actions

export default BookingSlice.reducer