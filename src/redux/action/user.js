import { useRouter } from "next/router";
import HttpInterceptor from "@/src/service/HttpInterceptor";
import Cookies from "js-cookie";

const http = new HttpInterceptor();

export const userLogin = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/users/auth`;
  try {
    http
      .post(endpoint, data)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};

export const getUserDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/users/`;
  try {
    http
      .get(endpoint)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};

export const userProfileEdit = (userId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/users/${userId}`;
  try {
    http
      .put(endpoint, data)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};

export const getUserInfo = (callback) => {
  const endpoint = `${process.env.api_base_url}/users/currentuser`;
  try {
    http
      .get(endpoint)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};

export const Userlogout = async (callback) => {
  const endpoint = `${process.env.api_base_url}/users/logout`;
  try {
    const response = await http.post(endpoint);
    if (response?.status === 200) {
      Cookies.remove("token", { path: "/" });
      if (callback) callback(response);
    } else {
      if (callback) callback(response);
    }
  } catch (error) {
    console.error("Logout failed:", error);
    if (callback) callback(error.response);
  }
};

export const changeUserPassword = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/users/changepassword`;
  try {
    http
      .put(endpoint, data)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};
