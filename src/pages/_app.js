import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "../redux/Provider";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
        <BootstrapClient />
        <ToastContainer/>
      </StoreProvider>
    </>
  );
}

export default MyApp;
