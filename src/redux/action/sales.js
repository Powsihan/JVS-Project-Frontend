import { useRouter } from "next/router";

import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const addSales = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/sales/addsales`;
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

export const getSalesDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/sales/`;
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
