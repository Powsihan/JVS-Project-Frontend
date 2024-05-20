import React, { useState, useEffect } from "react";
import "../styles/component.css";

const TextField = ({ value, label, placeholder, type, onChange, width, disable, defaultValue, select, options }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="form-group" style={{ width: width }}>
      {label && <label htmlFor="input-field" className="Text-input-label">{label}</label>}
      {select ? (
        <select className="form-control" value={inputValue} onChange={handleChange} disabled={disable}>
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={inputValue}
          className="form-control"
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disable}
        />
      )}
    </div>
  );
};

export default TextField;
