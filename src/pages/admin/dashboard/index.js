import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import "../../admin/dashboard/adminDashboard.css";
import Image from "next/image";
import CategoryChart from "@/src/components/charts/CategoryChart";
import AreaChart from "@/src/components/charts/AreaChart";
import RadiusChart from "@/src/components/charts/RadiusChart";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { toast } from "react-toastify";
import { getCustomerDetails } from "@/src/redux/action/customer";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import PieChart from "@/src/components/charts/PieChart";
import { getEmployeeDetails } from "@/src/redux/action/employee";
import {
  customer,
  experts,
  requests,
  reviews,
  vehicles,
} from "@/src/utils/ImagesPath";
import { getAllPurchases } from "@/src/redux/action/purchase";
import { getAllRecordsDetails } from "@/src/redux/action/records";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [vehicleData, setVehicleData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [recordsData, setRecordsData] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    getVehicleDetails((res) => {
      if (res?.data) {
        setVehicleData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getCustomerDetails((res) => {
      if (res?.data) {
        setCustomerData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Customer details", res);
        toast.error("Error fetching Customer details");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getAllPurchases((res) => {
      if (res?.data) {
        setPurchaseData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Purchase details", res);
        toast.error("Error fetching Purchase details");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getEmployeeDetails((res) => {
      if (res?.data) {
        setEmployeeData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Employee details", res);
        toast.error("Error fetching Employee details");
      }
    });
  }, []);
  useEffect(() => {
    dispatch(setLoading(true));
    getAllRecordsDetails((res) => {
      if (res?.data) {
        setRecordsData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Records details", res);
        toast.error("Error fetching Records details");
      }
    });
  }, []);

  const getStatusCounts = () => {
    const filteredData = vehicleData.filter(
      (vehicle) => vehicle?.status !== "Sold"
    );
    const totalVehicles = filteredData?.length;
    const statusCounts = {
      Available: filteredData?.filter(
        (vehicle) => vehicle?.status === "Available"
      ).length,
      Pending: filteredData?.filter((vehicle) => vehicle.status === "Pending")
        .length,
      Requested: filteredData?.filter(
        (vehicle) => vehicle?.status === "Requested"
      ).length,
    };

    const statusPercentages = {
      Available: ((statusCounts?.Available / totalVehicles) * 100).toFixed(2),
      Pending: ((statusCounts?.Pending / totalVehicles) * 100).toFixed(2),
      Requested: ((statusCounts?.Requested / totalVehicles) * 100).toFixed(2),
    };

    return { statusCounts, statusPercentages };
  };

  const { statusCounts, statusPercentages } = getStatusCounts();

  const radiusChartData = [
    {
      series: statusPercentages?.Available,
      label: "Available Vehicles",
      color: "#17B530",
    },
    {
      series: statusPercentages?.Pending,
      label: "Pending Vehicles",
      color: "#FFBE18",
    },
    {
      series: statusPercentages?.Requested,
      label: "Requested Vehicles",
      color: "#0010a5",
    },
  ];

  const [cardsData, setCardsData] = useState([
    { title: "Customers", count: 0, image: customer, color: "#F00" },
    { title: "Vehicles", count: 0, image: vehicles, color: "#3DBE00" },
    { title: "Employees", count: 0, image: experts, color: "#0075FF" },
    { title: "Requests", count: 0, image: requests, color: "#FF007A" },
    { title: "Records", count: 50, image: reviews, color: "#FFC700" },
  ]);

  useEffect(() => {
    if (vehicleData?.length > 0) {
      const filteredData = vehicleData?.filter(
        (vehicle) => vehicle.status !== "Sold"
      );
      const totalVehicles = filteredData?.length;
      setCardsData((prevCardsData) =>
        prevCardsData?.map((card) =>
          card?.title === "Vehicles" ? { ...card, count: totalVehicles } : card
        )
      );
    }
  }, [vehicleData]);

  useEffect(() => {
    if (customerData?.length > 0) {
      const totalCustomers = customerData?.length;
      setCardsData((prevCardsData) =>
        prevCardsData?.map((card) =>
          card?.title === "Customers" ? { ...card, count: totalCustomers } : card
        )
      );
    }
  }, [customerData]);

  useEffect(() => {
    if (employeeData?.length > 0) {
      const totalEmployees = employeeData?.length;
      setCardsData((prevCardsData) =>
        prevCardsData?.map((card) =>
          card?.title === "Employees" ? { ...card, count: totalEmployees } : card
        )
      );
    }
  }, [employeeData]);

  useEffect(() => {
    if (purchaseData?.length > 0) {
      const totalRequests = purchaseData?.filter(
        (purchase) => purchase?.status === "Requested"
      )?.length;
      setCardsData((prevCardsData) =>
        prevCardsData?.map((card) =>
          card?.title === "Requests" ? { ...card, count: totalRequests } : card
        )
      );
    }
  }, [purchaseData]);

  useEffect(() => {
    if (recordsData?.length > 0) {
      const totalRecords = recordsData?.length;
      setCardsData((prevCardsData) =>
        prevCardsData?.map((card) =>
          card?.title === "Records" ? { ...card, count: totalRecords } : card
        )
      );
    }
  }, [recordsData]);

  return (
    <Adminlayout>
      <div className="container-fluid">
        <div className="row justify-content-around align-items-center p-3 gap-5">
          {cardsData?.map((card, index) => (
            <div
              key={index}
              className="cards p-0 bg-white rounded col-lg-2 col-sm-6 col-md-4 cards-dashbaord"
              style={{
                borderBottom: `6px solid ${card?.color || "transparent"}`,
              }}
            >
              <div className="card-row card-dashboard-display">
                <div className="card-inner">
                  <h4>{card?.title}</h4>
                </div>
              </div>
              <div className="card-row1 card-count d-flex align-items-center justify-content-around">
                <div className="pt-2 ">
                  <h2>{card?.count}</h2>
                </div>
                <div className="dash-board-card-image">
                  <Image src={card?.image} alt="" loading="lazy"/>
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
                {radiusChartData?.map((data, index) => (
                  <div key={index} className="col-lg-4 col-md-12 col-sm-12">
                    <RadiusChart
                      series={[parseFloat(data?.series)]}
                      label={data?.label}
                      color={data?.color}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="container-fluid vehicleStatus">
              <div className="row card-dashboard-display">
                <h4>Vehicle Brand</h4>
              </div>
              <div className="row">
                <PieChart />
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

export default DashboardPage;
