import React, { useEffect, useState } from "react";
import Navbar from "@/src/layouts/Navbar";
import Footer from "@/src/layouts/Footer";
import InputField from "@/src/components/InputField";
import CommonButton from "@/src/components/CommonButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getRecordsById } from "@/src/redux/action/records";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import "../../../styles/vehicle.css";
import "../../../styles/auction.css";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { recordcontent } from "@/src/data/datas";
import { Button } from "react-bootstrap";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [recordData, setRecordData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      getRecordsById(id, (res) => {
        if (res && res.data) {
          setRecordData(res.data);
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          toast.error("Error fetching record details");
        }
      });
    }
  }, [id, dispatch]);

  const vehicleDetails =
    recordData && recordData.vehicleId
      ? [
          {
            label: "Registration No",
            content: recordData.vehicleId.registerno,
          },
          { label: "Vehicle Name", content: recordData.vehicleId.name },
          { label: "Vehicle Type", content: recordData.vehicleId.type },
          { label: "Vehicle Brand", content: recordData.vehicleId.brand },
          { label: "Vehicle Model", content: recordData.vehicleId.model },
          { label: "Vehicle Color", content: recordData.vehicleId.color },
          { label: "Vehicle Model Year", content: recordData.vehicleId.yom },
          {
            label: "Vehicle Ownership",
            content: recordData.vehicleId.ownership,
          },
          { label: "GearBox", content: recordData.vehicleId.gear },
          { label: "Fuel Type", content: recordData.vehicleId.fuel },
          { label: "Fuel Capacity", content: recordData.vehicleId.fuelcap },
          { label: "Mileage", content: recordData.vehicleId.mileage },
          { label: "No of Doors", content: recordData.vehicleId.noofdoors },
          { label: "No Of Seats", content: recordData.vehicleId.noofseats },
        ]
      : [];

  console.log(recordData, "dataaaaaaaaaaaaa");
  return (
    <>
      <Navbar />
      <div
        className="record container-fluid p-5  mb-4"
        style={{ marginTop: "150px" }}
      >
        <div className="row">
          <div className="col-md-4">
            {recordData && recordData?.vehicleId?.image && (
              <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
                {recordData?.vehicleId?.image.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "350px",
                    }}
                  >
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
            <hr />
          </div>
          <div className="col-md-4">
            <div className="Auction-Vehicle-Details-Section container-fluid mb-2">
              <h1 className="row ps-2 mb-4">Vehicle Details</h1>
              {vehicleDetails &&
                vehicleDetails.map((data, index) => (
                  <div>
                    <div
                      className="d-flex justify-content-between align-items-center ps-2 pe-2"
                      style={{ marginBottom: "-7px" }}
                    >
                      <h2>{data.label}</h2>
                      <h4>{data.content}</h4>
                    </div>
                    <hr style={{ color: "#bdbbbb" }} />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="Auction-Vehicle-Details-Section container-fluid mb-3">
              <h1 className="row ps-2 mb-4">Add Updates</h1>
              <div className="mb-2">
                <InputField
                  placeholder="Select the Service"
                  label={"Service"}
                  select
                  options={recordcontent}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="input-field" className="Text-input-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  placeholder={"Small description about the Service"}
                  rows={2}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div className="mb-2">
                <InputField
                  label={"Document"}
                  placeholder={"Upload the File"}
                  onChange={(value) => handleChange("documents", value)}
                  type={"file"}
                />
              </div>
              <hr />
              <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
                <CommonButton text={"Save Changes"} width={177} />
                <Button variant="secondary" style={{ width: 111 }}>
                  Cancel
                </Button>
              </div>
            </div>

            <div className="Auction-Vehicle-Details-Section container-fluid">
              <h1 className="row ps-2 mb-4">View Records Details</h1>
              <hr />
              <div className="d-flex justify-content-between align-items-center  ">
                <h5>Service</h5>
                <VisibilityIcon className="" />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center  ">
                <h5>Oil</h5>
                <VisibilityIcon className="" />
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default index;
