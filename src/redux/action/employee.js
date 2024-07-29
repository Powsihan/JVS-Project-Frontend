import Cookies from "js-cookie";
import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const getEmployeeDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/employees/`;
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

export const getEmployeeInfo = (callback) => {
  const endpoint = `${process.env.api_base_url}/employees/currentemployee`;
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

export const registerEmployee = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/employees/register`;
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
            "employee",
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

export const deleteEmployee = (employeeId, callback) => {
  const endpoint = `${process.env.api_base_url}/employees/${employeeId}`;
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

export const employeeLogin = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/employees/auth`;
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

export const employeeProfileEdit = (employeeId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/employees/${employeeId}`;
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

export const Employeelogout = async (callback) => {
  const endpoint = `${process.env.api_base_url}/employees/logout`;
  try {
    const response = await http.post(endpoint);
    if (response.status === 200) {
      Cookies.remove("expert", { path: "/" });
      if (callback) callback(response);
    } else {
      if (callback) callback(response);
    }
  } catch (error) {
    console.error("Logout failed:", error);
    if (callback) callback(error.response);
  }
};

export const changeEmployeePassword = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/employees/changepassword`;
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
