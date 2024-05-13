import { useRouter } from "next/router";
import HttpInterceptor from "../../service/HttpInterceptor.js";
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

export const logout = () => {
  Cookies.remove("token", { path: "/" });
};
