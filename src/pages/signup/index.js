import Navbar from "@/src/layouts/Navbar";
import { getContentDetails } from "@/src/redux/action/content";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import "../../styles/login.css";
import "../../styles/admin.css";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Brand, Districts, VehicleColors, Vehicletype } from "@/src/data/datas";
import Image from "next/image";

import vehicledisplayimage from "../../assets/images/vehicle-display-Image.png";
import vehicleCardicon1 from "../../assets/icons/Vehicle-Card-icon-1.svg";
import vehicleCardicon2 from "../../assets/icons/Vehicle-Card-icon-2.svg";
import vehicleCardicon3 from "../../assets/icons/Vehicle-Card-icon-3.svg";
import vehicleCardicon4 from "../../assets/icons/Vehicle-Card-icon-4.svg";
import vehicleCardicon5 from "../../assets/icons/Vehicle-Card-icon-5.svg";
import CommonButton from "@/src/components/CommonButton";

const index = () => {
  const [contentimage, setContentImages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getContentDetails((res) => {
      if (res && res.data) {
        const activeContent = res.data.filter(
          (content) => content.status === "Active"
        );
        setContentImages(activeContent);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Content details");
      }
    });
  }, []);

  const vehicleshortDetails = [
    { icon: vehicleCardicon1, name: "Pre-owned" },
    { icon: vehicleCardicon2, name: "2019" },
    { icon: vehicleCardicon3, name: "Petrol" },
    { icon: vehicleCardicon4, name: "White" },
    { icon: vehicleCardicon5, name: "250 CC" },
  ];

  const sampleVehicleData = Array.from({ length: 10 }, (_, index) => ({
    name: `Vehicle Name ${index + 1}`,
    price: `Rs.${(index + 1) * 250000}`,
    image: vehicledisplayimage,
    details: vehicleshortDetails,
  }));
  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100">
        <div className="row" style={{ paddingTop: "120px" }}>
          <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
            {contentimage.map((content, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={content.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div
        className="container-fluid min-vh-100"
        // style={{ backgroundColor: "green" }}
      >
        <div className="row ps-5 pe-5 mb-5" style={{ paddingTop: "120px" }}>
          <div className="Filter-Search-Container mb-4">
            <h1 className="row ps-2 mb-3">Filter and Search</h1>
            <div className="row pb-2">
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    // value={selectedCity}
                    // onChange={HandleSelectCity}
                  >
                    <option value="">Select the Catgegory</option>
                    {Vehicletype.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {/* {selectedCity && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "2%",
                    }}
                    onClick={() => setSelectedCity("")}
                  >
                    <ClearIcon />
                  </div>
                )} */}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <form>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Filter By Model Name"
                      // value={searchModel}
                      // onChange={HandleSearchModel}
                    />
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    {/* {searchModel && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "2%",
                        }}
                        onClick={() => setSearchModel("")}
                      >
                        <ClearIcon />
                      </div>
                    )} */}
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    // value={selectedCity}
                    // onChange={HandleSelectCity}
                  >
                    <option value="">Select the Brand</option>
                    {Brand.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {/* {selectedCity && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "2%",
                    }}
                    onClick={() => setSelectedCity("")}
                  >
                    <ClearIcon />
                  </div>
                )} */}
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    // value={selectedCity}
                    // onChange={HandleSelectCity}
                  >
                    <option value="">Select the Color</option>
                    {VehicleColors.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {/* {selectedCity && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "2%",
                    }}
                    onClick={() => setSelectedCity("")}
                  >
                    <ClearIcon />
                  </div>
                )} */}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    // value={selectedCity}
                    // onChange={HandleSelectCity}
                  >
                    <option value="">Select the District</option>
                    {Districts.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {/* {selectedCity && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "2%",
                    }}
                    onClick={() => setSelectedCity("")}
                  >
                    <ClearIcon />
                  </div>
                )} */}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    // value={selectedPrice}
                    // onChange={HandleSelectPrice}
                  >
                    <option value="">Price Range</option>
                    <option value="50000-100000">Rs. 50,000 - 1L</option>
                    <option value="100000-500000">Rs. 1L - 5L</option>
                    <option value="500000-1000000">Rs. 5L - 10L</option>
                    <option value="1000000-5000000">Rs. 10L - 50L</option>
                    <option value="5000000-10000000">Rs. 50L - 1C</option>
                    <option value="over10000000">Over Rs. 1C</option>
                  </select>

                  {/* {selectedPrice && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSelectedPrice("")}
                    >
                      <ClearIcon />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ps-5 pe-5 mb-5">
          {sampleVehicleData.map((vehicle, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={index}>
              <div className="Vehicle-display-card p-1">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <Image
                    src={vehicle.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                  <h1>{vehicle.name}</h1>
                  <h4>{vehicle.price}</h4>
                </div>
                <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                  {vehicle.details.map((content, index) => (
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
                <div className="row mb-2">
                  <div className="col-9">
                    <CommonButton text={"More Details"} width={"100%"} />
                  </div>
                  <div className="col-3">
                    <button className="btn btn-secondary">Contact</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
