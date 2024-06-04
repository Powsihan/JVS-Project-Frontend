
import {
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
  } from "../action/imageUpload.js";
  
  const initialState = {
    uploading: false,
    uploadError: null,
    uploadedImageUrl: null,
  };
  
  const ImgaeUploadSlice = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_REQUEST:
        return {
          ...state,
          uploading: true,
          uploadError: null,
        };
      case UPLOAD_IMAGE_SUCCESS:
        return {
          ...state,
          uploading: false,
          uploadedImageUrl: action.payload,
        };
      case UPLOAD_IMAGE_FAILURE:
        return {
          ...state,
          uploading: false,
          uploadError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ImgaeUploadSlice;
  