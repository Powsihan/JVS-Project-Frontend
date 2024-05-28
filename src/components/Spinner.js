"use client";
import { MutatingDots } from "react-loader-spinner";


const Spinner = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center ">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
