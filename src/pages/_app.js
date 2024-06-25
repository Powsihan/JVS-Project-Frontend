import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "../components/BootstrapClient";
import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import StoreProvider from "../redux/provider";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  weight: ["100","200","300","400", "500","600" ,"700","800","900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
      <style jsx global>{`
        body {
          font-family: ${notoSans.style.fontFamily};
        }
      `}</style>
      <Loader />
        <Component {...pageProps} />
        <BootstrapClient />
        <ToastContainer />
      </StoreProvider>
    </>
  );
}

export default MyApp;
