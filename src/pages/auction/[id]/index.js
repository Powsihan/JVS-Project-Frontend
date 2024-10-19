import { auctionUpdate, getAuctionInfo } from "@/src/redux/action/auction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import Navbar from "@/src/layouts/Navbar";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../styles/vehicle.css";
import "../../../styles/auction.css";
import InputField from "@/src/components/InputField";
import CommonButton from "@/src/components/CommonButton";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { getCustomerInfo, getLoginCustomerDetail } from "@/src/redux/action/customer";
import Image from "next/image";
import { auctiondetail } from "@/src/utils/ImagesPath";
import Footer from "@/src/layouts/Footer";
import { IconButton } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const AuctionDetailPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;
  const [auctionData, setAuctionData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [bidcustomerDetail, setBidCustomerDetail] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [sendConfirmationModal, setSendConfirmationModal] = useState(false);
  const [maxBidPrice, setMaxBidPrice] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      getAuctionInfo(id, (res) => {
        if (res?.data) {
          setAuctionData(res?.data);
          dispatch(setLoading(false));
          const vehicleId = res?.data?.vehicleId;
          getVehicleInfo(vehicleId, (res) => {
            setVehicleData(res?.data);
          });

          const auction = res?.data?.biddinghistory;

          const customerInfoPromises = auction?.map(
            (data) =>
              new Promise((resolve) => {
                getCustomerInfo(data?.customerId, (response) =>
                  resolve({
                    customerId: data?.customerId,
                    data: response?.data,
                  })
                );
              })
          );

          Promise.all(customerInfoPromises)
            .then((customerInfoResponses) => {
              const customerDataMap = {};

              customerInfoResponses?.forEach((response) => {
                if (response?.data) {
                  customerDataMap[response?.customerId] = response?.data;
                }
              });

              setBidCustomerDetail(customerDataMap);
            })
            .catch((error) => {
              toast.error("Error fetching additional details");
            });

          const maxBid =
            auction?.length > 0
              ? Math.max(...auction.map((bid) => bid?.biddingprice))
              : "0";
          setMaxBidPrice(maxBid);
        } else {
          dispatch(setLoading(false));
          console.error("Error fetching vehicle details", res);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const endDateString = auctionData && auctionData?.endDate;
    const endDate = new Date(endDateString);
    const today = new Date();
    const timeDifference = endDate.getTime() - today.getTime();

    if (timeDifference > 0) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const remaining = timeDifference - (now.getTime() - today.getTime());
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setTimeLeft("Auction Ended");
    }
  }, [auctionData]);

  if (vehicleData) {
    var vehicleDetails = [
      { label: "Registration No", content: vehicleData?.registerno },
      { label: "Vehicle Name", content: vehicleData?.name },
      { label: "Vehicle Type", content: vehicleData?.type },
      { label: "Vehicle Brand", content: vehicleData?.brand },
      { label: "Vehicle Model", content: vehicleData?.model },
      { label: "Vehicle Color", content: vehicleData?.color },
      { label: "Vehicle Model Year", content: vehicleData?.yom },
      { label: "Vehicle Ownership", content: vehicleData?.ownership },
      { label: "GearBox", content: vehicleData?.gear },
      { label: "Fuel Type", content: vehicleData?.fuel },
      { label: "Fuel Capacity", content: vehicleData?.fuelcap },
      { label: "Mileage", content: vehicleData?.mileage },
      { label: "No of Doors", content: vehicleData?.noofdoors },
      { label: "No Of Seats", content: vehicleData?.noofseats },
    ];
  }

  const handleChange = (field, value) => {
    setAuctionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res?.status == 200) {
        setCustomerData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  const addBiddingAction = (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    const data = {
      customerId: customerData?._id,
      biddingprice: auctionData?.biddingPrice,
    };

    auctionUpdate(id, data, (editRes) => {
      dispatch(setLoading(false));
      if (editRes?.status === 200) {
        toast.success(editRes?.data.message);
        closeStatusConfirmationModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(editRes?.data?.message);
        toast.error(
          "Failed to update auction or bid price is lower than current price"
        );
      }
    });
  };

  const openSendConfirmationModal = (event) => {
    event.preventDefault();
    setSendConfirmationModal(true);
  };

  const closeStatusConfirmationModal = () => {
    setSendConfirmationModal(false);
  };

  const resetValue = () => {
    setAuctionData((prevData) => ({
      ...prevData,
      biddingPrice: "",
    }));
  };

  return (
    <div>
      <Navbar />
      {auctionData && (
        <div className="container-fluid min-vh-100 p-5">
          <div className="mb-4" style={{ marginTop: "100px" }}>
          <IconButton onClick={() => router.push("/auction")}>
            <ExpandCircleDownIcon
              sx={{
                fontSize: "50px",
                color: "var(--primary-color)",
                transform: "rotate(90deg)",
              }}
            />
          </IconButton>
        </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              {vehicleData?.image && (
                <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
                  {vehicleData?.image?.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
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

              <div
                className="d-flex justify-content-center align-items-center"
                style={{ marginTop: "-20px" }}
              >
                <Image src={auctiondetail} loading="lazy"/>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 mb-3">
                  <div className="Auction-Vehicle-Details-Section container-fluid">
                    <h1 className="row ps-2 mb-4">Vehicle Details</h1>
                    {vehicleDetails?.map((data, index) => (
                        <div key={index}>
                          <div
                            className="d-flex justify-content-between align-items-center ps-2 pe-2"
                            style={{ marginBottom: "-7px" }}
                          >
                            <h2>{data?.label}</h2>
                            <h4>{data?.content}</h4>
                          </div>
                          <hr style={{ color: "#bdbbbb" }} />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="Auction-Vehicle-Details-Section container-fluid mb-3">
                    <h1 className="row ps-2 mb-3">Vehicle Auction</h1>
                    <div className="d-flex justify-content-between Auction-time-Count-section p-2 ps-3 pe-3 mb-3">
                      <div>
                        <h5>TimeLeft</h5>
                        <h6>{timeLeft}</h6>
                      </div>
                      <div>
                        <h5>Start Bid Amount</h5>
                        <h6>{`LKR ${auctionData?.bidstartprice}`}</h6>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="Auction-Vehicle-Details-Section container-fluid mb-3">
                      <h1 className="row ps-2 mb-3">Bidding</h1>
                      <div className="row mb-3">
                        <div className="col-6">
                          <InputField
                            label={"Start Bid Amount"}
                            disable={true}
                            defaultValue={`LKR ${auctionData?.bidstartprice}`}
                          />
                        </div>
                        <div className="col-6">
                          <InputField
                            label={"Current Bid Amount"}
                            disable={true}
                            defaultValue={`LKR ${maxBidPrice}`}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <InputField
                          label={"Your Bidding Price"}
                          placeholder={"Enter the Bidding Price"}
                          type={"Number"}
                          onChange={(value) =>
                            handleChange("biddingPrice", value)
                          }
                        />
                      </div>
                      <hr />
                      <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
                        <CommonButton
                          text={"Confirm Bidding"}
                          width={177}
                          onClick={openSendConfirmationModal}
                        />
                        <Button variant="secondary" style={{ width: 111 }} onClick={resetValue}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                  <div className="Auction-Vehicle-Details-Section container-fluid">
                    <h1 className="row ps-2 mb-4">Bidding Information</h1>
                    {auctionData?.biddinghistory?.length > 0 ? (
                      auctionData?.biddinghistory?.map((data,index) => (
                        <div key={index}>
                          <div
                            className="d-flex justify-content-between"
                            style={{ marginBottom: "-10px" }}
                          >
                            <h2>
                              {" "}
                              {bidcustomerDetail[data?.customerId]?.fname ||
                                "N/A"}
                            </h2>
                            <h4>{`LKR ${data?.biddingprice}`}</h4>
                          </div>
                          <hr style={{ color: "#bdbbbb" }} />
                        </div>
                      ))
                    ) : (
                      <p>No Bids Placed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        show={sendConfirmationModal}
        message="Are you sure you want to Bid this Vehicle?"
        heading="Confirmation To Bidding!"
        variant="success"
        onConfirm={addBiddingAction}
        onCancel={closeStatusConfirmationModal}
      />
      <Footer />
    </div>
  );
};

export default AuctionDetailPage;
