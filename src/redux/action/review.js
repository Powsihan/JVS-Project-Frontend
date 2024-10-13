import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const addReview = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/reviews/addreview`;
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

export const getReviewDetails = (callback) => {
    const endpoint = `${process.env.api_base_url}/reviews/`;
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