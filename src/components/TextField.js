import Image from "next/image";
import React, { useState } from "react";

import "../styles/component.css"


const TextField = ({ value, label, placeholder, type, onChange,width,disable }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className="form-group" style={{width:width}}>
      {label && <label htmlFor="input-field" className="Text-input-label">{label}</label>}
      <input
        type={type}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disable}
      />
    </div>
  );
};

export default TextField;