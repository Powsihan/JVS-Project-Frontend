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

export const recordsAdd = (recordId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/records/addrecord/${recordId}`;
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
export const getAllRecordsDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/records`;
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

export const deleteRecords = (recordsId, callback) => {
  const endpoint = `${process.env.api_base_url}/records/${recordsId}`;
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

export const deleteRecordsfromCustomer = (recordId, historyId, callback) => {
  const endpoint = `${process.env.api_base_url}/records/${recordId}/history/${historyId}`;
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
