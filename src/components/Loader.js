
import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import "../styles/component.css"; 

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading);

  if (!loading) {
    return null;
  }

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <MutatingDots
          height="100"
          width="100"
          color="var(--primary-color)"
          secondaryColor="var(--primary-color)"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
