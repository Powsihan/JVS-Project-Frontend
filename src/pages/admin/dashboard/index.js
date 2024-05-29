import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import "../../admin/dashboard/adminDashboard.css";
import customer from "../../../assets/images/customer.svg";
import Image from "next/image";
import requests from "../../../assets/images/requests.svg";
import reviews from "../../../assets/images/reviews.svg";
import experts from "../../../assets/images/Broker.png";
import vehicles from "../../../assets/images/vehicles.svg";
import CategoryChart from "@/src/components/charts/CategoryChart";
import AreaChart from "@/src/components/charts/AreaChart";
import RadiusChart from "@/src/components/charts/RadiusChart";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { toast } from "react-toastify";

const index = () => {
  const [vehicleData, setVehicleData] = useState([]);

  const cardsData = [
    { title: "Customers", count: 400, image: customer, color: "#F00" },
    { title: "Vehicles", count: 300, image: vehicles, color: "#3DBE00" },
    { title: "Experts", count: 200, image: experts, color: "#0075FF" },
    { title: "Requests", count: 100, image: requests, color: "#FF007A" },
    { title: "Reviews", count: 50, image: reviews, color: "#FFC700" },
  ];

  useEffect(() => {
    getVehicleDetails((res) => {
      if (res && res.data) {
        setVehicleData(res.data);
      } else {
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  const getStatusCounts = () => {
    const filteredData = vehicleData.filter(
      (vehicle) => vehicle.status !== "Sold"
    );
    const totalVehicles = filteredData.length;
    const statusCounts = {
      Available: filteredData.filter(
        (vehicle) => vehicle.status === "Available"
      ).length,
      Pending: filteredData.filter((vehicle) => vehicle.status === "Pending")
        .length,
      Requested: filteredData.filter(
        (vehicle) => vehicle.status === "Requested"
      ).length,
    };

    const statusPercentages = {
      Available: ((statusCounts.Available / totalVehicles) * 100).toFixed(2),
      Pending: ((statusCounts.Pending / totalVehicles) * 100).toFixed(2),
      Requested: ((statusCounts.Requested / totalVehicles) * 100).toFixed(2),
    };

    return { statusCounts, statusPercentages };
  };

  const { statusCounts, statusPercentages } = getStatusCounts();

  const radiusChartData = [
    {
      series: statusPercentages.Available,
      label: "Available Vehicles",
      color: "#17B530",
    },
    {
      series: statusPercentages.Pending,
      label: "Pending Vehicles",
      color: "#FFBE18",
    },
    {
      series: statusPercentages.Requested,
      label: "Requested Vehicles",
      color: "#0010a5",
    },
  ];

  return (
    <Adminlayout>
      <div className="container-fluid">
        <div className="row justify-content-around align-items-center p-3 gap-5">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="cards p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4 cards-dashbaord"
              style={{
                borderBottom: `6px solid ${card.color || "transparent"}`,
              }}
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

        <div className="row p-3">
          <div className="area-chart w-100">
            <div className="row card-dashboard-display">
              <h4>Sales & Buys</h4>
            </div>
            <div className="row">
              <AreaChart />
            </div>
          </div>
        </div>

        <div className="row p-1">
          <div className="col-lg-7 col-md-12 col-sm-12 pb-3">
            <div className="container-fluid vehicleStatus">
              <div className="row card-dashboard-display">
                <h4>Vehicle Status</h4>
              </div>
              <div className="row">
                {radiusChartData.map((data, index) => (
                  <div key={index} className="col-lg-4 col-md-12 col-sm-12">
                    <RadiusChart
                      series={[parseFloat(data.series)]} 
                      label={data.label}
                      color={data.color}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="vehicleStatus">
              <div className="card-row card-dashboard-display">
                <div className="card-inner ">
                  <h4>Vehicle Status</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-3">
          <div className="area-chart w-100">
            <div className="row card-dashboard-display">
              <h4>Vehicle Category</h4>
            </div>
            <div className="row">
              <CategoryChart />
            </div>
          </div>
        </div>
      </div>
    </Adminlayout>
  );
};

export default index;
