const { selectedTime, testproperty } = require("../reducer/bookingSlice");

export const setSelectedTime = (value) => async (dispatch) => {
    dispatch(selectedTime(value))
  }

  export const setTestproperty = (value) => async (dispatch) => {
    dispatch(testproperty(value))
  }
