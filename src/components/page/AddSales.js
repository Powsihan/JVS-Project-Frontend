import React, { useState } from "react";
import "../../styles/admin.css";
import "../../styles/component.css";
import addSales from "../../assets/images/addsales.svg";
import Image from "next/image";
import InputField from "../InputField";
import { SalesStatus } from "@/src/data/datas";
import CommonButton from "../CommonButton";
import { Button } from "react-bootstrap";
const AddSales = (props) => {
  const [salesData, setSalesData] = useState({
    registerno: "",
    documents: "",
  });
  const handleChange = (field, value) => {
    setSalesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div className="container-fluid Add-Vehicle-Section">
      <h1 className="row ps-2 pb-3">Add Sales & Buy</h1>
      <div className="row p-2">
        <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
          <Image src={addSales} width={600} />
        </div>
        <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="row pb-3">
            <InputField
              label={"Vehicle Register No"}
              placeholder={"Enter the Regsiter No"}
              onChange={(value) => handleChange("registerno", value)}
            />
          </div>
          <div className="row pb-3">
            <InputField
              label={"Customer Email"}
              placeholder={"Enter the Email"}
              onChange={(value) => handleChange("email", value)}
            />
          </div>
          <div className="row pb-3">
            <InputField
              label={"Price"}
              placeholder={"Enter the Price"}
              onChange={(value) => handleChange("price", value)}
              type={"number"}
            />
          </div>
          <div className="row mb-3">
            <InputField
              label={"Status"}
              placeholder={"Select the Status"}
              onChange={(value) => handleChange("status", value)}
              select
              options={SalesStatus}
            />
          </div>
          <div className="row mb-3">
            <InputField
              label={"Document"}
              placeholder={"Upload the File"}
              onChange={(value) => handleChange("document", value)}
              type={"file"}
            />
          </div>
        </div>
      </div>
      <div className="row pb-3 p-2">
        <div className="form-group">
          <label htmlFor="input-field" className="Text-input-label">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder={"Small description about Vehicle"}
            rows={4}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
        <CommonButton text={"Confirm"} width={164} />
        <Button
          variant="secondary"
          onClick={props.handleClose}
          style={{ width: 111 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddSales;
