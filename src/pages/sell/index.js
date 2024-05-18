import Navbar from '@/src/layouts/Navbar'
import React from 'react'
import Image from "next/image";
import sellvh from "../../assets/images/Sellvh.png";
import CommonButton from "@/src/components/CommonButton";
import "./sellvehicle.css";
import TextField from "@/src/components/TextField";
import sellvehicon from "../../assets/images/sellvehicon.svg";
import sellvehicle from "../../assets/images/sellvehicle.png";
import { Button } from "react-bootstrap";

const index = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center sell-vehicle-home">
        <div className=''>
          <h2>Are you looking to sell your vehicle? </h2>
          <img src={sellvehicon} alt="Sell Vehicle Icon" />
          <h4>Quick and Easy Sales</h4>
          <h4>Trusted Buyer Network</h4>
          <h4>Nationwide Pickup Service</h4>
          <h4>Maximum Value Guaranteed</h4>
          <h4>Expert Vehicle Appraisals</h4>
          <h4>Sell with Confidence</h4>
          <CommonButton text="Sell Your Vehicle" width={300} />
        </div>
        {/* style={{backgroundColor:'pink'}} */}
      </div>

      <div className='p-3'>


        <div className="container-fluid Sell-Vehicle-Section min-vh-100">
          <h1 className="row justify-content-center">Sell Your Vehicle</h1>

          <hr />
          <div className="row">

            <div className="col-lg-4 d-flex justify-content-center align-items-center">
              <Image
                src={sellvehicle}
                alt="vehicleee"
                width={250}
                height={250}
              />
            </div>

            <div className="col-lg-8 d-flex justify-content-center align-items-center">
              <div className="col">
                <div className="row">
                  <div className="col-lg-6">
                    <TextField
                      label="Vehicle Register No"
                      placeholder="Enter the register no"
                      width={"70%"}
                    />
                  </div>
                  <div className="col-lg-6">
                    <TextField
                      label="Name"
                      placeholder="Enter the vehicle name"
                      width={"70%"}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <TextField
                      label="District"
                      placeholder="Select your district"
                      width={"70%"}
                    />
                  </div>
                  <div className="col-lg-6 col-md-4 col-sm-12 pb-2">
                    <div className="form-group">
                      <label htmlFor="input-field" className="Text-input-label">
                        OwnerShip
                      </label>
                      <div className="d-flex gap-3">
                        {
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="ownership"
                            />
                            <label
                              className="form-check-label"
                            >
                            </label>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <TextField
                      label="Vehicle Type"
                      placeholder="Select category"
                      width={"70%"}
                    />
                  </div>
                  <div className="col-lg-6">
                    <TextField
                      label="Price"
                      placeholder="Enter the price"
                      width={"70%"}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <TextField
                      label="Brand"
                      placeholder="Enter the brand"
                      width={"70%"}
                    />
                  </div>
                  <div className="col-lg-6">
                    <TextField
                      label="Modal"
                      placeholder="Enter the modal"
                      width={"70%"}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Fuel Capacity"
                placeholder="Enter the Fuel Capaci"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Power"
                placeholder="Enter the Power"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Mileage"
                placeholder="Enter the mileage"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="No Of Seats"
                placeholder="4"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="No Of Doors"
                placeholder="4"
                width={"70%"}
              />
            </div>

          </div>

          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Transmission"
                placeholder="Select Transmission"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Gear Box"
                placeholder="Select Gear"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Color"
                placeholder="Select Color "
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Vehicle Modal Year"
                placeholder="Select YOM"
                width={"70%"}
              />
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <TextField
                label="Fuel"
                placeholder="Select Fuel"
                width={"70%"}
              />
            </div>

          </div>

          <hr />

          <div className="row">
            <div className='col d-flex justify-content-center align-items-center'></div>
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

          <div className="row">
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Power steering
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Heated Seats
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Rear Parking Sensor
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                USB Port
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                AC
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Memory Seat
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Roof Rack
              </label>
            </div>

          </div>

          <div className="row pt-4">
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Sound System
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Alarm
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Power Windows
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Bluetooth
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Wifi
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Cruise Control
              </label>
            </div>
            <div className="col">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                Sun Roof
              </label>
            </div>

          </div>
          <hr />

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField label={"Documents"} type={"file"} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <TextField label={"Images"} type={"file"} />
            </div>
          </div>

          <hr />
          <div className="d-flex flex-row justify-content-end gap-3 mb-3 pt-4">
            <CommonButton text={"Sell"} width={164} />
            <Button
              variant="secondary"

              style={{ width: 111 }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>





    </>
  );
};

export default index
