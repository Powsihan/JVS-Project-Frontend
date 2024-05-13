import { useRouter } from "next/router";
import HttpInterceptor from "../../service/HttpInterceptor.js";
import Cookies from "js-cookie";
const http = new HttpInterceptor();



export const getCustomerDetails = (callback) => {
    const endpoint = `${process.env.api_base_url}/customers/`;
    try {
        http.get(endpoint)
            .then((response) => {
                callback(response);


            })
            .catch((error) => {
                callback(error.response);

            });
    } catch (error) {
        callback(error.response);
    }
}