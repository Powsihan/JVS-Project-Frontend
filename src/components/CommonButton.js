import Image from "next/image";
import React from "react";

const CommonButton = ({ text, width, onPress, image }) => {
  return (
    <div>
      <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2" style={{width:width}}>
        <div>
          {image && <Image src={image} alt=""/>}
        </div>
        {text}
      </button>
    </div>
  );
};

export default CommonButton;
