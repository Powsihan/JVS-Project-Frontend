import Adminlayout from "@/src/layouts/Adminlayout";
import React from "react";
import "../../admin/dashboard/adminDashboard.css";
import customer from "../../../assets/images/customer.svg";
import Image from "next/image";
import requests from "../../../assets/images/requests.svg";
import reviews from "../../../assets/images/reviews.svg";
import experts from "../../../assets/images/Broker.png";
import vehicles from "../../../assets/images/vehicles.svg";
import Cookies from "js-cookie";

const index = () => {
  const session = Cookies.get("token", { path: "/" });
  console.log(session, "session");

  const cardsData = [
    { title: "Customers", count: 400, image: customer,color:'#F00'},
    { title: "Vehicles", count: 300, image: vehicles,color:'#3DBE00'},
    { title: "Experts", count: 200, image: experts,color:'#0075FF'},
    { title: "Requests", count: 100, image: requests,color:'#FF007A'},
    { title: "Reviews", count: 50, image: reviews ,color:'#FFC700'},
  ];
  return (
    <Adminlayout>
      <div className="container-fluid">
        <div className="row justify-content-around align-items-center p-3">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="cards shadow p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4"
              style={{ borderBottom: `6px solid ${card.color || "transparent"}` }}
            >
              <div className="card-row card-dashboard-display">
                <div className="card-inner">
                  <h4>{card.title}</h4>
                </div>
              </div>
              <div className="card-row1 card-count d-flex align-items-center justify-content-around">
                <div className="pt-2 ">
                  <h2>{card.count}</h2>
                </div>
                <div className="image ">
                  <Image src={card.image} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="justify-content-around align-items-center p-4">
          <div className=" sales area-chart shadow  bg-white rounded col-lg-2 col-sm-6 w-100">
            <div className="card-row card-dashboard-display">
              <div className="card-inner ">
                <h4>Sales & Buys</h4>
                {/* <Chart/> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row p-4 align-items-center">
          <div className="col-7 d-flex align-items-center justify-content-center">
            <div className=" vehicles vehicleStatus  shadow  rounded bg-white w-100">
              <div className="card-row card-dashboard-display">
                <div className="card-inner ">
                  <h4>Vehicle Status</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 d-flex align-items-center justify-content-center">
            <div className="vehicles vehicleStatus2 shadow  rounded bg-white w-100">
              <div className="card-row card-dashboard-display">
                <div className="card-inner ">
                  <h4>Vehicle Status</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default index;
