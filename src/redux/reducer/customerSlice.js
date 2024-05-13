import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    customerData: null,
};

const CustomerSlice = createSlice({
    name: 'CustomerSlice',
    initialState,
    reducers: {
        customerData: (state, action) => {
            state.customerData = action.payload
        },

    }
})


export const { customerData } = CustomerSlice.actions

export default CustomerSlice.reducer