import React from "react";
import "../styles/admin.css";
import "../styles/component.css";
import TextField from "./TextField";
import {
  Brand,
  CarColors,
  Districts,
  Features,
  FuelType,
  GearCount,
  OwnershipOptions,
  VehicleTransmission,
  Vehicletype,
} from "../data/datas";

const AddVehicle = () => {
  const generateYears = () => {
    const years = [];
    for (let year = 1950; year <= 2023; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears();

  return (
    <div className="container-fluid Add-Vehicle-Section">
      <h1 className="row ps-2 mb-3">Add Vehicles</h1>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <TextField
            label={"Vehicle Register No"}
            placeholder={"Enter the Regsiter No"}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <TextField label={"Name"} placeholder={"Enter the Vehicle Name"} />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              OwnerShip
            </label>
            <div className="d-flex gap-3">
              {OwnershipOptions.map((option, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ownership"
                    id={`ownership-${option}`}
                    value={option}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`ownership-${option}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Vehicle Type
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Type</option>
              {Vehicletype.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Brand
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Brand</option>
              {Brand.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <TextField label={"Model"} placeholder={"Enter the Modal"} />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <TextField label={"Price"} placeholder={"Enter the Price"} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Transmission
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Type</option>
              {VehicleTransmission.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Gear Box
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Gear Count</option>
              {GearCount.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Color
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Year</option>
              {CarColors.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              YOM
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select the Year</option>
              {years.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Fuel
            </label>
            <select
              className="form-control"
              //   onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select Fuel</option>
              {FuelType.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <TextField
                label={"Fuel Capacity"}
                placeholder={"In L"}
                type={"number"}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <TextField
                label={"Power"}
                placeholder={"In CC"}
                type={"number"}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <TextField
                label={"Mileage"}
                placeholder={"In Km"}
                type={"number"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <TextField
                label={"No Of Doors"}
                placeholder={""}
                type={"number"}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <TextField
                label={"No Of Seats"}
                placeholder={""}
                type={"number"}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  District
                </label>
                <select
                  className="form-control"
                  //   onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Select District</option>
                  {Districts.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder={"Small description about Vehicle"}
              rows={4}
              // onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row" style={{ backgroundColor: "green" }}>
        <h3 className="Text-input-label">Features</h3>
        <div className="container-fluid ms-2" style={{backgroundColor:'red'}}>
        <div className="row">
          {Features.slice(0, 6).map((option, index) => (
            <div className="form-check col-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={`checkbox-${index}`}    
              />
              <label className="Text-input-label" htmlFor={`checkbox-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        </div>
        <div className="d-flex justify-content-between">
          {Features.slice(7, 13).map((option, index) => (
            <div className="form-check col-2">
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={`checkbox-${index}`}
              />
              <label className="Text-input-label" htmlFor={`checkbox-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
