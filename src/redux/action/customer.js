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


export const registerCustomer =(callback)=>{
    const endpoint = `${process.env.api_base_url}/customers/register`;
    try {
        http.post(endpoint).then((response)=>{
            callback(response);
            const cookieOptions = {
                path: "/",
              };
              Cookies.set("customer", JSON.stringify(response.data.data), cookieOptions);
        }).catch((error)=>{
            callback(error.response)
        })
    } catch (error) {
        callback(error.response);
    }
}