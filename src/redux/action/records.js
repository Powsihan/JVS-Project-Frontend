import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const getRecordsByCustomerId = (customerId, callback) => {
  const endpoint = `${process.env.api_base_url}/records/customer/${customerId}`;
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
export const getRecordsById = (recordId, callback) => {
  const endpoint = `${process.env.api_base_url}/records/${recordId}`;
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
