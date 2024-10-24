import Navbar from "@/src/layouts/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../styles/auction.css";
import { useRouter } from "next/navigation";
import CommonButton from "@/src/components/CommonButton";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { toast } from "react-toastify";
import { getAuctionDetails } from "@/src/redux/action/auction";
import "../../styles/vehicle.css";
import "../../styles/admin.css";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import Cookies from "js-cookie";
import SignInModal from "@/src/components/modals/SignInModal";
import {
  auctionBackCar,
  explore,
  sellvehicon,
  vehicleCardicon1,
  vehicleCardicon2,
  vehicleCardicon3,
  vehicleCardicon4,
  vehicleCardicon5,
} from "@/src/utils/ImagesPath";
import Footer from "@/src/layouts/Footer";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import { auctionvehiclecontent } from "@/src/data/content";
import CustomerMessaging from "@/src/components/modals/CustomerMessaging";

const AuctionMainPage = () => {
  const [auctionData, setAuctionData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const [showLoginView, setShowLoginView] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminShow = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);

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

  useEffect(() => {
    dispatch(setLoading(true));
    getAuctionDetails(async (res) => {
      if (res?.data) {
        const auction = Array?.isArray(res?.data) ? res?.data : [];
        const filteredVehicleData = auction?.filter(
          (auction) => auction?.status !== "Requested"
        );
        setAuctionData(filteredVehicleData);
        dispatch(setLoading(false));

        const vehicleInfoPromises = auction?.map(
          (auction) =>
            new Promise((resolve) => {
              getVehicleInfo(auction?.vehicleId, (response) =>
                resolve({ vehicleId: auction?.vehicleId, data: response?.data })
              );
            })
        );
        try {
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);

          const vehicleDataMap = {};

          vehicleInfoResponses?.forEach((response) => {
            if (response?.data) {
              vehicleDataMap[response?.vehicleId] = response?.data;
            }
          });
          setVehicleData(vehicleDataMap);
        } catch (error) {
          console.error("Error fetching customer or vehicle details", error);
          toast.error("Error fetching additional details");
        }
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  const LoginViewModal = () => {
    setShowLoginView(true);
  };

  const scrollToAuctionVehicle = () => {
    const auctionSection = document.getElementById("auction");
    if (auctionSection) {
      auctionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const customerToken = Cookies.get("customer");

  return (
    <>
      <Navbar />
      <div className="container-fluid auction-vehicle-home p-0">
        <div className="row">
          <div className="col-md-6 d-md-block d-none">
            <div className="d-flex justify-content-start align-items-center">
              <div className="pt-5">
                <Image src={auctionBackCar} width={700} loading="lazy"/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
              <h1>JVS AUCTION</h1>
              <h5>Believe & Achieve</h5>
              <div>
                {auctionvehiclecontent?.map((data, index) => (
                  <div className="d-flex gap-3 mb-3 mt-4" key={index}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image src={sellvehicon} alt="" loading="lazy"/>
                    </div>
                    <p className="m-0">{data}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <CommonButton
                  text="Explore Auctions"
                  width={250}
                  image={explore}
                  onClick={scrollToAuctionVehicle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100" id="auction">
        <div
          className="Auction-vehicles row mb-4 ps-5"
          style={{ paddingTop: "120px" }}
        >
          <h3>Auction Vehicles</h3>
        </div>
        <div className="row ps-5 pe-5 mb-5">
          {auctionData?.length > 0 ? (
            auctionData?.map((auction, index) => {
              const vehicleshortDetails = [
                {
                  icon: vehicleCardicon1,
                  name:
                    vehicleData[auction?.vehicleId]?.ownership &&
                    vehicleData[auction?.vehicleId]?.ownership === 1
                      ? "Brand-New"
                      : "Pre-Owned",
                },
                {
                  icon: vehicleCardicon2,
                  name: vehicleData[auction?.vehicleId]?.yom || "N/A",
                },
                {
                  icon: vehicleCardicon3,
                  name: vehicleData[auction?.vehicleId]?.fuel || "N/A",
                },
                {
                  icon: vehicleCardicon4,
                  name: vehicleData[auction?.vehicleId]?.color || "N/A",
                },
                {
                  icon: vehicleCardicon5,
                  name: `${vehicleData[auction?.vehicleId]?.power || "N/A"} CC`,
                },
              ];

              const statusStyle = {
                backgroundColor:
                  auction?.status === "Available"
                    ? "#17B530"
                    : auction?.status === "Pending"
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
                        {auction?.status}
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
                        src={vehicleData[auction?.vehicleId]?.image[0]}
                        alt={`Vehicle ${index}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                      <h1>{vehicleData[auction?.vehicleId]?.name}</h1>
                      <h4>{`LKR ${auction?.bidstartprice}`}</h4>
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1 flex-wrap">
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
                          text={"Go To Auction"}
                          width={"100%"}
                          onClick={() => {
                            customerToken
                              ? router.push(`/auction/${auction?._id}`)
                              : LoginViewModal();
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <button
                          className="btn btn-secondary"
                          onClick={
                            customerToken ? handleAdminShow : LoginViewModal
                          }
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
      <SignInModal
        show={showLoginView}
        onHide={() => setShowLoginView(false)}
      />
      <Footer />
      <CustomerMessaging show={showAdminModal} handleClose={handleAdminClose} />
    </>
  );
};
export default AuctionMainPage;
