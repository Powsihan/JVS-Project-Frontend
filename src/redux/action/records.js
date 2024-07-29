import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const getRecordsById = (customerId, callback) => {
  const endpoint = `${process.env.api_base_url}/records/${customerId}`;
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
