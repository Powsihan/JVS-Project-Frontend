import React from "react";
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
