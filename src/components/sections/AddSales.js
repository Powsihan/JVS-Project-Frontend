import React, { useEffect, useState } from "react";
import "../../styles/admin.css";
import "../../styles/component.css";
import Image from "next/image";
import InputField from "../InputField";
import { SalesStatus } from "@/src/data/datas";
import CommonButton from "../CommonButton";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { addSales } from "@/src/redux/action/sales";
import { toast } from "react-toastify";
import { getCustomerDetails } from "@/src/redux/action/customer";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { addSalesimg } from "@/src/utils/ImagesPath";

const AddSales = (props) => {
  const dispatch = useDispatch();
  const [customerdata, setCustomerdata] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [filteredRegisterNo, setFilteredRegisterNo] = useState([]);
  const [salesData, setSalesData] = useState({
    registerno: "",
    email: "",
    price: "",
    status: "",
    documents: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setSalesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === "email") {
      handleEmailChange(value);
    }
    if (field === "registerno") {
      handleRegisterNoChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedSalesData = {
      ...salesData,
    };

    addSales(updatedSalesData, (res) => {
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

  useEffect(() => {
    getCustomerDetails((res) => {
      if (res && res.data) {
        setCustomerdata(res.data);
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, []);

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

  const handleEmailChange = (value) => {
    const filtered = customerdata.filter((customer) =>
      customer.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmails(filtered);
  };

  const handleRegisterNoChange = (value) => {
    const filteredno = vehicleData.filter(
      (vehicle) =>
        vehicle.registerno.toLowerCase().includes(value.toLowerCase()) &&
        vehicle.status !== "Sold"
    );
    setFilteredRegisterNo(filteredno);
  };

  const handleSelectEmail = (email) => {
    setSalesData((prevData) => ({
      ...prevData,
      email,
    }));
    setFilteredEmails([]);
  };

  const handleSelectRegisterNo = (registerno) => {
    setSalesData((prevData) => ({
      ...prevData,
      registerno,
    }));
    setFilteredRegisterNo([]);
  };

  return (
    <div className="container-fluid Add-Vehicle-Section">
      <form>
        <h1 className="row ps-2 pb-3">Add Sales & Buy</h1>
        <div className="row p-2">
          <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
            <Image src={addSalesimg} width={600} />
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="row pb-3">
              <InputField
                label={"Vehicle Register No"}
                placeholder={"Enter the Regsiter No"}
                defaultValue={salesData.registerno}
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
                label={"Customer Email"}
                placeholder={"Enter the Email"}
                defaultValue={salesData.email}
                onChange={(value) => handleChange("email", value)}
              />
            </div>
            {filteredEmails.length > 0 && (
              <div
                className="dropdown-menu show suggestion-menu"
                style={{ width: "100%" }}
              >
                {filteredEmails.map((customer, index) => (
                  <div
                    key={index}
                    className="dropdown-item suggestion-items"
                    onClick={() => handleSelectEmail(customer.email)}
                  >
                    {customer.email}
                  </div>
                ))}
              </div>
            )}
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
                onChange={(value) => handleChange("documents", value)}
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

export default AddSales;
