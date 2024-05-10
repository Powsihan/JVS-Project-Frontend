import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";

import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <BootstrapClient />
    </>
  );
}

export default MyApp;
