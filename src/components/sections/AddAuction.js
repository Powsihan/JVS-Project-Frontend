import React, { useEffect, useState } from "react";
import "../../styles/admin.css";
import "../../styles/component.css";
import InputField from "../InputField";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { toast } from "react-toastify";
import CommonButton from "../CommonButton";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { addAuction } from "@/src/redux/action/auction";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { useDispatch } from "react-redux";
import { addauctionimg } from "@/src/utils/ImagesPath";

const AddAuction = (props) => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState({
    registerno: "",
    bidstartprice: "",
    endDate: "",
    description: "",
  });
  const [filteredRegisterNo, setfilteredRegisterNo] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const handleChange = (field, value) => {
    setAuctionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === "registerno") {
      handleRegisterNoChange(value);
    }
  };

  useEffect(() => {
    getVehicleDetails((res) => {
      if (res && res.data) {
        setVehicleData(res.data);
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, []);

  const handleRegisterNoChange = (value) => {
    const filteredno = vehicleData.filter(
      (vehicle) =>
        vehicle.registerno.toLowerCase().includes(value.toLowerCase()) &&
        vehicle.status !== "Sold"
    );
    setfilteredRegisterNo(filteredno);
  };

  const handleSelectRegisterNo = (registerno) => {
    setAuctionData((prevData) => ({
      ...prevData,
      registerno,
    }));
    setfilteredRegisterNo([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedAuctionData = {
      ...auctionData,
    };

    addAuction(updatedAuctionData, (res) => {
      dispatch(setLoading(false));
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div className="container-fluid Add-Vehicle-Section">
      <form onSubmit={handleSubmit}>
        <h1 className="row ps-2 pb-3">Add Auction Details</h1>
        <div className="row p-2">
          <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src={addauctionimg} width={600} loading="lazy"/>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="row pb-3">
              <InputField
                label={"Vehicle Register No"}
                placeholder={"Enter the Regsiter No"}
                defaultValue={auctionData.registerno}
                onChange={(value) => handleChange("registerno", value)}
              />
            </div>
            {filteredRegisterNo.length > 0 && (
              <div
                className="dropdown-menu show suggestion-menu"
                style={{ width: "100%" }}
              >
                {filteredRegisterNo.map((vehicle, index) => (
                  <div
                    key={index}
                    className="dropdown-item suggestion-items"
                    onClick={() => handleSelectRegisterNo(vehicle.registerno)}
                  >
                    {vehicle.registerno}
                  </div>
                ))}
              </div>
            )}
            <div className="row pb-3">
              <InputField
                label={"Start Bidding Price"}
                placeholder={"Enter the Price"}
                onChange={(value) => handleChange("bidstartprice", value)}
                type={"number"}
              />
            </div>
            <div className="row pb-3">
              <InputField
                label={"Start Date"}
                placeholder={"Select the End Date"}
                type={"Date"}
                onChange={(value) => handleChange("startDate", value)}
              />
            </div>
            <div className="row pb-3">
              <InputField
                label={"End Date"}
                placeholder={"Select the End Date"}
                type={"Date"}
                onChange={(value) => handleChange("endDate", value)}
              />
            </div>
            {/* <div className="row mb-3">
              <InputField
                label={"Status"}
                placeholder={"Select the Status"}
                onChange={(value) => handleChange("status", value)}
                select
                options={AuctionStatus}
              />
            </div> */}
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
          <CommonButton text={"Confirm"} width={164} onClick={handleSubmit} />
          <Button
            variant="secondary"
            onClick={props.handleClose}
            style={{ width: 111 }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAuction;
