import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVehicleInfo, vehicleEdit } from "@/src/redux/action/vehicle"; // Assuming you have this function
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import Navbar from "@/src/layouts/Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../styles/vehicle.css";
import downicon from "../../../assets/icons/downicon.svg";
import upicon from "../../../assets/icons/upicon.svg";
import Image from "next/image";
import CommonButton from "@/src/components/CommonButton";
import SignInModal from "@/src/components/modals/SignInModal";
import Cookies from "js-cookie";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { addPurchase } from "@/src/redux/action/purchase";
import { toast } from "react-toastify";
import {
  vehicleCardicon1,
  vehicleCardicon2,
  vehicleCardicon3,
  vehicleCardicon4,
  vehicleCardicon5,
} from "@/src/utils/ImagesPath";
import Footer from "@/src/layouts/Footer";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import CustomerMessaging from "@/src/components/modals/CustomerMessaging";

const VehicleDetail = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [vehicleData, setVehicleData] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [activeSection, setActiveSection] = useState("details");
  const [showLoginView, setShowLoginView] = useState(false);
  const [sendConfirmationModal, setSendConfirmationModal] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res.status == 200) {
        setCustomerData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      getVehicleInfo(id, (res) => {
        if (res && res.data) {
          setVehicleData(res.data);
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          console.error("Error fetching vehicle details", res);
        }
      });
    }
  }, [id]);

  if (vehicleData) {
    var vehicleshortDetails = [
      {
        icon: vehicleCardicon1,
        name:
          vehicleData.ownership && vehicleData.ownership === 1
            ? "Brand-New"
            : "Pre-Owned",
      },
      { icon: vehicleCardicon2, name: vehicleData.yom },
      { icon: vehicleCardicon3, name: vehicleData.fuel },
      { icon: vehicleCardicon4, name: vehicleData.color },
      { icon: vehicleCardicon5, name: `${vehicleData.power} CC` },
    ];
  }

  if (vehicleData) {
    var vehicleDetails = [
      { label: "Registration No", content: vehicleData.registerno },
      { label: "Vehicle Name", content: vehicleData.name },
      { label: "Vehicle Type", content: vehicleData.type },
      { label: "Vehicle Brand", content: vehicleData.brand },
      { label: "Vehicle Model", content: vehicleData.model },
      { label: "Vehicle Color", content: vehicleData.color },
      { label: "Vehicle Model Year", content: vehicleData.yom },
      { label: "Vehicle Ownership", content: vehicleData.ownership },
      { label: "GearBox", content: vehicleData.gear },
      { label: "Fuel Type", content: vehicleData.fuel },
      { label: "Fuel Capacity", content: vehicleData.fuelcap },
      { label: "Mileage", content: vehicleData.mileage },
      { label: "No of Doors", content: vehicleData.noofdoors },
      { label: "No Of Seats", content: vehicleData.noofseats },
    ];
  }

  const handleToggleDetails = () => {
    setShowAllDetails(!showAllDetails);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const LoginViewModal = () => {
    setShowLoginView(true);
  };

  const addPurchaseAction = () => {
    dispatch(setLoading(true));
    const data = { vehicleId: id, customerId: customerData._id };
    addPurchase(data, (res) => {
      if (res.status == 200) {
        dispatch(setLoading(false));
        toast.success(res.data.message);
        const updatedVehicleData = { status: "Pending" };
        vehicleEdit(id, updatedVehicleData, (editRes) => {
          dispatch(setLoading(false));
          if (editRes.status === 200) {
            closeStatusConfirmationModal();
          } else {
            toast.error("Failed to update vehicle status");
          }
        });
        closeStatusConfirmationModal();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const openSendConfirmationModal = () => {
    setSendConfirmationModal(true);
  };

  const closeStatusConfirmationModal = () => {
    setSendConfirmationModal(false);
  };
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminShow = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);


  return (
    <div>
      <Navbar />
      {vehicleData && (
        <div className="container-fluid min-vh-100 p-5 mb-5">
          <div className="row" style={{ paddingTop: "120px" }}>
            <div className="col-lg-6 col-md-6 col-sm-12">
              {vehicleData && vehicleData.image && (
                <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
                  {vehicleData.image.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "450px",
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
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 Vehicle-Detail-Container p-3">
              <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                <h1>{vehicleData.name}</h1>
                <h4>{`LKR ${vehicleData.price}/-`}</h4>
              </div>
              <div className="d-flex justify-content-around pt-2 align-items-center ps-1 pe-1">
                {vehicleshortDetails.map((content, index) => (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    key={index}
                  >
                    <div className="Vehicle-card-display-icon p-3">
                      <Image src={content.icon} />
                    </div>
                    <h6 className="pt-1">{content.name}</h6>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-around align-items-center mt-3">
                <CommonButton
                  text={"Purchase"}
                  width={250}
                  onClick={
                    customerData ? openSendConfirmationModal : LoginViewModal
                  }
                />
                <CommonButton
                  text={"Make an Inquiry"}
                  width={300}
                  onClick={
                    customerData ? handleAdminShow : LoginViewModal
                  }
                />
              </div>
              <hr />
              <div className="row details-feature-section">
                <div
                  className={`col-6 d-flex justify-content-center p-2 details-feature-section-heading ${
                    activeSection === "details" ? "active-section" : ""
                  }`}
                  onClick={() => handleSectionChange("details")}
                >
                  Vehicle Details
                </div>
                <div
                  className={`col-6 d-flex justify-content-center p-2 details-feature-section-heading ${
                    activeSection === "features" ? "active-section" : ""
                  }`}
                  onClick={() => handleSectionChange("features")}
                >
                  Features
                </div>
              </div>
              <hr />
              {activeSection === "details" ? (
                <div className="container-fluid ps-5 pe-5 pt-3">
                  {(showAllDetails
                    ? vehicleDetails
                    : vehicleDetails.slice(0, 5)
                  ).map((vehicle, index) => (
                    <div className="d-flex align-items-center justify-content-between vehicle-detail-div p-2 ps-3 pe-3 mb-3">
                      <h3>{vehicle.label}</h3>
                      <h6>{vehicle.content}</h6>
                    </div>
                  ))}
                  <div className="pt-3">
                    <CommonButton
                      text={showAllDetails ? "Show Less" : "Show More"}
                      width={"100%"}
                      onClick={handleToggleDetails}
                      image={showAllDetails ? upicon : downicon}
                    />
                  </div>
                </div>
              ) : (
                <div className="container-fluid ps-5 pe-5 pt-3">
                  <div className="row pt-2 ps-1 pe-1">
                    {vehicleData.features.map((content, index) => (
                      <div className="col mb-3" key={index}>
                        <div
                          className="Vehicle-card-display-icon p-3 d-flex justify-content-center align-items-center"
                          style={{ width: "170px" }}
                        >
                          <h2>{content}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <SignInModal
        show={showLoginView}
        onHide={() => setShowLoginView(false)}
      />
      <ConfirmationModal
        show={sendConfirmationModal}
        message="Are you sure you want to Purchase this Vehicle?"
        heading="Confirmation To Purchase!"
        variant="success"
        onConfirm={addPurchaseAction}
        onCancel={closeStatusConfirmationModal}
      />
       <CustomerMessaging show={showAdminModal} handleClose={handleAdminClose} />
      <Footer />
    </div>
  );
};

export default VehicleDetail;
