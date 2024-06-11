import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";
import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "../redux/Provider";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
      <Loader />
        <Component {...pageProps} />
        <BootstrapClient />
        <ToastContainer />
      </StoreProvider>
    </>
  );
}

export default MyApp;
