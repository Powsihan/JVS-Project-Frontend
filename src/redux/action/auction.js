import HttpInterceptor from "@/src/service/HttpInterceptor";

const http = new HttpInterceptor();

export const addAuction = (data, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/addauction`;
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

export const getAuctionDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/auction/`;
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

export const deleteAuction = (auctionId, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/${auctionId}`;
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

export const getAuctionInfo = (auctionId, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/${auctionId}`;
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

export const auctionUpdate = (auctionId, data, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/${auctionId}`;
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

export const deleteBidFromAuction = (auctionId, bidId, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/${auctionId}/bid/${bidId}`;
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
