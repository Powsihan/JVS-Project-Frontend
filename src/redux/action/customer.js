import { useRouter } from "next/router";
import HttpInterceptor from "../../service/HttpInterceptor.js";
import Cookies from "js-cookie";
const http = new HttpInterceptor();

export const getCustomerDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/customers/`;
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

export const getCustomerInfo = (userId, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/${userId}`;
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

export const registerCustomer = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/register`;
  try {
    http
      .post(endpoint, data)
      .then((response) => {
        callback(response);
        if (response.status === 200) {
          const cookieOptions = {
            path: "/",
          };
          Cookies.set(
            "customer",
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

export const deleteCustomer = (userId, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/${userId}`;
  try {
    http
      .delete(endpoint)
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

export const customerLogin = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/auth`;
  try {
    http
      .post(endpoint, data)
      .then((response) => {
        callback(response);
        if (response.status === 200) {
          const cookieOptions = {
            path: "/",
          };
          Cookies.set(
            "customer",
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

export const customerProfileEdit = (userId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/${userId}`;
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

export const getLoginCustomerDetail = (callback) => {
  const endpoint = `${process.env.api_base_url}/customers/currentcustomer`;
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

export const Customerlogout = async (callback) => {
  const endpoint = `${process.env.api_base_url}/customers/logout`;
  try {
    const response = await http.post(endpoint);
    if (response.status === 200) {
      Cookies.remove("customer", { path: "/" });
      if (callback) callback(response);
    } else {
      if (callback) callback(response);
    }
  } catch (error) {
    console.error("Logout failed:", error);
    if (callback) callback(error.response);
  }
};

export const changeCustomerPassword = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/customers/changepassword`;
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
