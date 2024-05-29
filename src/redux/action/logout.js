import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Customerlogout = () => {
  Cookies.remove("customer", { path: "/" });
  toast.success("LogOut SuccessFully!");
};
