
import { Cloudinary } from "cloudinary-core";
import { toast } from "react-toastify";
import { setLoading } from "../reducer/loaderSlice.js";


export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";


export const uploadImageRequest = () => ({
  type: UPLOAD_IMAGE_REQUEST,
});

export const uploadImageSuccess = (imageUrl) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const uploadImageFailure = (error) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: error,
});

export const uploadImage = (file) => async (dispatch) => {
  if (!file) return false;

  dispatch(uploadImageRequest());
  dispatch(setLoading(true));

  try {
    const cloudinary = new Cloudinary({ cloud_name: "dkvtkwars" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "JV-Project");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dkvtkwars/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(uploadImageSuccess(data.secure_url));
      dispatch(setLoading(false));
      return data.secure_url;
    } else {
      const error = "Upload failed.";
      dispatch(uploadImageFailure(error));
      dispatch(setLoading(false));
      toast.error(error);
      return false;
    }
  } catch (error) {
    dispatch(uploadImageFailure(error.message));
    dispatch(setLoading(false));
    toast.error("Upload error: " + error.message);
    return false;
  }
};
