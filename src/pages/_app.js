import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";

import '../app/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <BootstrapClient />
    </>
  );
}

export default MyApp;
