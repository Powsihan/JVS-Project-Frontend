import Navbar from "@/src/layouts/Navbar";
import { getContentDetails } from "@/src/redux/action/content";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import "../../styles/vehicle.css";
import "../../styles/admin.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Brand, FuelType, VehicleColors, Vehicletype } from "@/src/data/datas";
import Image from "next/image";
import CommonButton from "@/src/components/CommonButton";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { useRouter } from "next/navigation";
import {
  vehicleCardicon1,
  vehicleCardicon2,
  vehicleCardicon3,
  vehicleCardicon4,
  vehicleCardicon5,
} from "@/src/utils/ImagesPath";
import Footer from "@/src/layouts/Footer";
import CustomerMessaging from "@/src/components/modals/CustomerMessaging";

const VehicleMainPage = () => {
  const router = useRouter();
  const [contentimage, setContentImages] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredVehiclesList, setFilteredVehiclesList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getContentDetails((res) => {
      if (res?.data) {
        const activeContent = res?.data?.filter(
          (content) => content?.status === "Active"
        );
        setContentImages(activeContent);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Content details");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getVehicleDetails((res) => {
      if (res?.data) {
        const vehicles = Array?.isArray(res?.data) ? res?.data : [];
        const filteredVehicleData = vehicles?.filter(
          (vehicle) => vehicle?.status !== "Requested"
        );
        setVehicleData(filteredVehicleData);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  useEffect(() => {
    const filteredData = vehicleData?.filter((vehicle) => {
      const isWithinPriceRange = (price) => {
        switch (selectedPrice) {
          case "50000-100000":
            return price >= 50000 && price <= 100000;
          case "100000-500000":
            return price >= 100000 && price <= 500000;
          case "500000-1000000":
            return price >= 500000 && price <= 1000000;
          case "1000000-5000000":
            return price >= 1000000 && price <= 5000000;
          case "5000000-10000000":
            return price >= 5000000 && price <= 10000000;
          case "over10000000":
            return price > 10000000;
          default:
            return true;
        }
      };

      return (
        vehicle?.model?.toLowerCase().includes(searchModel?.toLowerCase()) &&
        (selectedType === "" || vehicle?.type === selectedType) &&
        (selectedBrand === "" || vehicle?.brand === selectedBrand) &&
        (selectedColor === "" || vehicle?.color === selectedColor) &&
        (selectedFuel === "" || vehicle?.fuel === selectedFuel) &&
        isWithinPriceRange(vehicle?.price)
      );
    });
    setFilteredVehiclesList(filteredData);
  }, [
    searchModel,
    selectedType,
    selectedBrand,
    selectedColor,
    selectedFuel,
    selectedPrice,
    vehicleData,
  ]);

  const HandleSearchModel = (event) => {
    setSearchModel(event.target.value);
  };

  const HandleSelectPrice = (event) => {
    setSelectedPrice(event.target.value);
  };
  const HandleSelectType = (event) => {
    setSelectedType(event.target.value);
  };
  const HandleSelectBrand = (event) => {
    setSelectedBrand(event.target.value);
  };
  const HandleSelectColor = (event) => {
    setSelectedColor(event.target.value);
  };
  const HandleSelectFuel = (event) => {
    setSelectedFuel(event.target.value);
  };

  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminShow = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);

  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100">
        <div className="row" style={{ paddingTop: "120px" }}>
          <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
            {contentimage?.map((content, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "520px",
                }}
              >
                <img
                  src={content?.image}
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
      <div className="container-fluid min-vh-100">
        <div className="row ps-5 pe-5 mb-5" style={{ paddingTop: "120px" }}>
          <div className="Filter-Search-Container mb-4">
            <h1 className="row ps-2 mb-3">Filter and Search</h1>
            <div className="row pb-2">
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedType}
                    onChange={HandleSelectType}
                  >
                    <option value="">Select the Catgegory</option>
                    {Vehicletype?.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {selectedType && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "1%",
                      }}
                      onClick={() => setSelectedType("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <form>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Filter By Model Name"
                      value={searchModel}
                      onChange={HandleSearchModel}
                    />
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    {searchModel && (
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
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedBrand}
                    onChange={HandleSelectBrand}
                  >
                    <option value="">Select the Brand</option>
                    {Brand?.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {selectedBrand && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "1%",
                      }}
                      onClick={() => setSelectedBrand("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row pb-2">
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedColor}
                    onChange={HandleSelectColor}
                  >
                    <option value="">Select the Color</option>
                    {VehicleColors?.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {selectedColor && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "1%",
                      }}
                      onClick={() => setSelectedColor("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedFuel}
                    onChange={HandleSelectFuel}
                  >
                    <option value="">Select the FuelType</option>
                    {FuelType?.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {selectedFuel && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "1%",
                      }}
                      onClick={() => setSelectedFuel("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedPrice}
                    onChange={HandleSelectPrice}
                  >
                    <option value="">Price Range</option>
                    <option value="50000-100000">LKR 50,000 - 1L</option>
                    <option value="100000-500000">LKR 1L - 5L</option>
                    <option value="500000-1000000">LKR 5L - 10L</option>
                    <option value="1000000-5000000">LKR 10L - 50L</option>
                    <option value="5000000-10000000">LKR 50L - 1C</option>
                    <option value="over10000000">Over LKR 1C</option>
                  </select>

                  {selectedPrice && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "1%",
                      }}
                      onClick={() => setSelectedPrice("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ps-5 pe-5 mb-5">
          {filteredVehiclesList?.length > 0 ? (
            filteredVehiclesList?.map((vehicle, index) => {
              const vehicleshortDetails = [
                {
                  icon: vehicleCardicon1,
                  name: vehicle?.ownership === 1 ? "Brand-New" : "Pre-Owned",
                },
                { icon: vehicleCardicon2, name: vehicle?.yom },
                { icon: vehicleCardicon3, name: vehicle?.fuel },
                { icon: vehicleCardicon4, name: vehicle?.color },
                { icon: vehicleCardicon5, name: `${vehicle?.power} CC` },
              ];

              const statusStyle = {
                backgroundColor:
                  vehicle?.status === "Available"
                    ? "#17B530"
                    : vehicle?.status === "Pending"
                    ? "#FFBE18"
                    : "#F73B3B",
              };

              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={index}>
                  <div className="Vehicle-display-card p-1">
                    <div className="d-flex justify-content-end">
                      <div
                        className="d-flex justify-content-center align-items-center vehicle-status-indicator"
                        style={statusStyle}
                      >
                        {vehicle?.status}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "250px",
                      }}
                    >
                      <Image
                        src={vehicle?.image[0]}
                        alt={`Vehicle ${index}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                      <h1>{vehicle?.name}</h1>
                      <h4>{`LKR ${vehicle?.price}`}</h4>
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                      {vehicleshortDetails?.map((content, index) => (
                        <div
                          className="d-flex flex-column align-items-center justify-content-center"
                          key={index}
                        >
                          <div className="Vehicle-card-display-icon p-3">
                            <Image src={content?.icon} loading="lazy"/>
                          </div>
                          <h6 className="pt-1">{content?.name}</h6>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="row mb-2 ps-3 pe-3">
                      <div className="col-9">
                        <CommonButton
                          text={"More Details"}
                          width={"100%"}
                          onClick={() => {
                            router.push(`/vehicle/${vehicle?._id}`);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <button
                          className="btn btn-secondary"
                          onClick={handleAdminShow}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="No-result-found">
              <h1>No results found</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <CustomerMessaging show={showAdminModal} handleClose={handleAdminClose} />
    </div>
  );
};

export default VehicleMainPage;
