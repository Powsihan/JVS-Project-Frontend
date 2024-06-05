import { getAuctionInfo } from "@/src/redux/action/auction";
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
const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [auctionData, setAuctionData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      getAuctionInfo(id, (res) => {
        if (res && res.data) {
          setAuctionData(res.data);
          dispatch(setLoading(false));
          const vehicleId = res.data.vehicleId;
          getVehicleInfo(vehicleId, (res) => {
            setVehicleData(res.data);
          });
            } else {
          dispatch(setLoading(false));
          console.error("Error fetching vehicle details", res);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const endDateString = auctionData && auctionData.endDate;
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

  return (
    <div>
      <Navbar />
      {auctionData && (
        <div className="container-fluid min-vh-100 p-5">
          <div className="row" style={{ paddingTop: "120px" }}>
            <div className="col-lg-4 col-md-6 col-sm-12">
              {vehicleData && vehicleData.image && (
                <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
                  {vehicleData.image.map((image, index) => (
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
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 mb-3">
                  <div className="Auction-Vehicle-Details-Section container-fluid">
                    <h1 className="row ps-2 mb-3 pe-2">Vehicle Details</h1>
                    {vehicleDetails &&
                      vehicleDetails.map((data, index) => (
                        <div>
                          <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ marginBottom: "-10px" }}
                          >
                            <h2>{data.label}</h2>
                            <h4>{data.content}</h4>
                          </div>
                          <hr style={{ color: "#bdbbbb" }} />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="Auction-Vehicle-Details-Section container-fluid">
                    <h1 className="row ps-2 mb-3">Vehicle Auction</h1>
                    <div className="d-flex justify-content-between Auction-time-Count-section p-2 ps-3 pe-3 mb-3">
                      <div>
                        <h5>TimeLeft</h5>
                        <h6>{timeLeft}</h6>
                      </div>
                      <div>
                        <h5>Start Bid Amount</h5>
                        <h6>{`LKR ${auctionData.bidstartprice}`}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
