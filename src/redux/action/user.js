import { useRouter } from "next/router";

import Cookies from "js-cookie";
import HttpInterceptor from "@/src/service/HttpInterceptor";

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

export const getUserDetails = (data, callback) => {
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

        if (response.status == 200) {
          const cookieOptions = {
            path: "/",
          };
          Cookies.set(
            "token",
            JSON.stringify(response.data.data),
            cookieOptions
          );
        }
      })
      .catch((error) => {
        callback(error.response);
      });
  } catch (error) {
    callback(error.response);
  }
};
