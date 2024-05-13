import Adminlayout from "@/src/layouts/Adminlayout";

import React from "react";
import "../../admin/dashboard/adminDashboard.css";
import customer from "../../../assets/images/customer.svg";
import Image from "next/image";
import requests from "../../../assets/images/requests.svg";
import reviews from "../../../assets/images/reviews.svg";
import experts from "../../../assets/images/Broker.png";
import vehicles from "../../../assets/images/vehicles.svg";
// import Chart from "@/src/components/charts/Chart.js"


const index = () => {
  return (
    <Adminlayout>
      <div className="container-fluid">
        <div className="row justify-content-around align-items-center p-3">
          <div className="cards shadow  p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4">
            <div className="card-row card-dashboard-display">
              <div className="card-inner">
                <h4>Customers</h4>
              </div>
            </div>
            <div className="card-row1 card-count d-flex align-items-center justify-content-around">
              <div className="pt-2 ">
                <h2>400</h2>
              </div>
              <div className="image ">
                <Image src={customer} alt="" />
              </div>
            </div>
          </div>
          <div className="cards  shadow p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4">
            <div className="card-row card-dashboard-display">
              <div className="card-inner ">
                <h4>Vehicles</h4>
              </div>
            </div>
            <div className="card-row1 card-count d-flex align-items-center justify-content-around">
              <div className=" pt-2 ">
                <h2>400</h2>
              </div>
              <div className=" image ">
                <Image src={vehicles} alt="" />
              </div>
            </div>
          </div>
          <div className="cards  shadow  p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4">
            <div className="card-row card-dashboard-display">
              <div className="card-inner ">
                <h4>Experts</h4>
              </div>
            </div>
            <div className="card-row1 card-count d-flex align-items-center justify-content-around">
              <div className=" pt-2">
                <h2>400</h2>
              </div>
              <div className="image ">
              <Image src={experts} alt="" />
              </div>
            </div>
          </div>
          <div className="cards  shadow p-0  bg-white rounded col-lg-2 col-sm-6 col-md-4">
            <div className="card-row card-dashboard-display">
              <div className="card-inner">
                <h4>Requests</h4>
              </div>
            </div>
            <div className="card-row1  card-count d-flex align-items-center justify-content-around">
              <div className="pt-2 ">
                <h2>400</h2>
              </div>
              <div className="image ">
              <Image src={requests} alt="" />
              </div>
            </div>
          </div>
          <div className="cards  shadow p-0  bg-white rounded col-lg-2 col-sm-6 col-md-4">
            <div className="card-row card-dashboard-display">
              <div className="card-inner ">
                <h4>Reviews</h4>
              </div>
            </div>
            <div className="card-row1  card-count d-flex align-items-center justify-content-around">
              <div className=" pt-2">
                <h2>400</h2>
              </div>
              <div className="image ">
              <Image src={reviews} alt="" />
              </div>
            </div>
          </div>
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
