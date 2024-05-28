import { useRouter } from "next/router";

import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const getVehicleDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/vehicles/`;
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

export const addVehicle = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/vehicles/addvehicle`;
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

export const deleteVehicle = (vehicleId, callback) => {
  const endpoint = `${process.env.api_base_url}/vehicles/${vehicleId}`;
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

export const vehicleEdit = (vehicleId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/vehicles/${vehicleId}`;
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

export const getVehicleInfo = (vehicleId, callback) => {
  const endpoint = `${process.env.api_base_url}/vehicles/${vehicleId}`;
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
