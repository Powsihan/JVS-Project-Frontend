import React from "react";
import { MutatingDots, Rings, ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import "../styles/component.css";
import { BarLoader } from "react-spinners";

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) {
    return null;
  }

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        {/* <ThreeDots
  visible={true}
  height="100"
  width="100"
  color="var(--primary-color)"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> */}

        <BarLoader
          color="var(--primary-color)"
          height={5}
          cssOverride={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Loader;
