import axios from "axios";
import { logout } from "../redux/action/bookinb";
import Cookies from "js-cookie";

class HttpInterceptor {
  constructor() {
    const defaultOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(async (request) => {
      try {
        const authToken = Cookies.get("token", { path: "/" });
        const authToken2 = Cookies.get("customer", { path: "/" });

        if (authToken) {
          // If only the authToken exists, remove customer token
          Cookies.remove("customer", { path: "/" });
          const parsedToken = JSON.parse(authToken).token;
          request.headers.Authorization = "Bearer " + parsedToken;
        } else if (authToken2) {
          // If only the customer token exists, remove authToken
          Cookies.remove("token", { path: "/" });
          const parsedToken2 = JSON.parse(authToken2).token;
          request.headers.Authorization = "Bearer " + parsedToken2;
        }
      } catch (error) {
        console.log(error);
      }
      return request;
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (!error.response) {
          console.log("[ERROR]", " [HTTP Interceptor, Network Error", error);
        } else {
          if (error.response.status) {
            switch (error.response.status) {
              case 401: {
                console.log(
                  "[ERROR]",
                  " [HTTP Interceptor, Status Code]",
                  error.response.status
                );
                // logout();
                break;
              }
              default: {
                console.log(
                  "[ERROR]",
                  " [HTTP Interceptor, Status Code]",
                  error.response.status
                );
                break;
              }
            }
          }
          return Promise.reject(error);
        }
      }
    );

    return instance;
  }
}

export default HttpInterceptor;
