import Navbar from "@/src/layouts/Navbar";
import React from "react";
import "../../../styles/auction.css";
import Image from "next/image";
import BMW from "../../../assets/images/bmw.png";
import BMWPART1 from "../../../assets/images/bmv-1.png";
import BMWpart2 from "../../../assets/images/bmw-2.png";
import BMWPART3 from "../../../assets/images/bmw-3.png";
import BMWPART4 from "../../../assets/images/bmw-4.png";

const index = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className=" ps-3 heading ">
          <h3>2023 BMW 530 XI</h3>
        </div>

        <div className="  line">
          <hr style={{ color: "#07326C" }} />
        </div>

        <div className="row align-items-start justify-content-start">
          <div className="col-md-5 d-flex align-items-start justify-content-start flex-wrap">
            <div className="w-100 pb-2">
              <Image src={BMW} alt="" className="img-fluid w-100" />
            </div>
            <div className="d-flex flex-wrap justify-content-between gap-3 pt-3">
              <div className="pb-2 carpic">
                <Image src={BMWPART1} alt="" className="img-fluid w-100" />
              </div>
              <div className="pb-2  carpic">
                <Image src={BMWpart2} alt="" className="img-fluid w-100" />
              </div>
              <div className="pb-2  carpic">
                <Image src={BMWPART3} alt="" className="img-fluid w-100" />
              </div>
              <div className="pb-2  carpic">
                <Image src={BMWPART4} alt="" className="img-fluid w-100" />
              </div>
            </div>
          </div>
          <div className="col-md-4 align-items-center justify-content-center">
            <div className="form-container carmenu p-3">
              <div className="card-body details">
                <div className="row">
                  <div className="col">
                    <h5>Vehicle information</h5>
                  </div>
                </div>
                <hr />

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Engine Type</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Gas</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Transmission</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">8-speed automatic</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Drive Type</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">All wheel drive</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Cylinders</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Inline 4</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Total Seating</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">5</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Basic Warranty</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">4 yr./ 50,000 mi.</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Color</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">white</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Vehicle Type </h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Automobile</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Engine</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">5.9L V12</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Fuel</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Diesel</p>
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Keys</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Yes</p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>VIN</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">SCFEKBCR2FGS01907</p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Seller</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Trusted Dealer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-container carmenu p-3">
              <div className="card-body details">
                <div className="row">
                  <div className="col">
                    <h5>Bid information</h5>
                  </div>
                </div>
                <hr />

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Bid Status</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails"></p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Sale Status</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Minimum Bid </p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Time Left</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">1D 23H 50min</p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Current Bid</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Rs.1250000</p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Your Bid</h6>
                  </div>
                  <div className="col-7">
                    <input className="cardetails w-75"/>
                  </div>
                </div>
                <div className="pt-2 pb-2 d-flex align-items-center justify-content-center">
                <button className="justify-content-center bidButton align-items-center w-50">
                   View details
                   </button>
                </div>
              </div>
            </div>
            <div className="sale inform pt-5">
            <div className="form-container carmenu p-3">
              <div className="card-body details">
                <div className="row">
                  <div className="col">
                    <h5>Sale information</h5>
                  </div>
                </div>
                <hr />

                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Sale Name</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">TX - DALLAS</p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Sale Location</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">TX - DALLAS </p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Sale Date</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">Thu-May-09,2024 10:30 PM </p>
                  </div>
                </div>
                <div className="row pt-2 pb-2">
                  <div className="col-5">
                    <h6>Last Updated</h6>
                  </div>
                  <div className="col-7">
                    <p className="cardetails">07/05/2024 7:42 am</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
