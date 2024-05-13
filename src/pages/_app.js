import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "../redux/Provider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
        <BootstrapClient />
      </StoreProvider>
    </>
  );
}

export default MyApp;
