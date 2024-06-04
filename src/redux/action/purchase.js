import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const addPurchase = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/purchase/addpurchase`;
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
