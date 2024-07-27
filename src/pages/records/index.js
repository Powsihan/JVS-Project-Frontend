import React from "react";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import Footer from "@/src/layouts/Footer";
import "../../styles/records.css";
import {
  vehicleCardicon1,
  vehicleCardicon2,
  vehicleCardicon3,
  vehicleCardicon4,
  vehicleCardicon5,
} from "@/src/utils/ImagesPath";
import CommonButton from "@/src/components/CommonButton";
import { useRouter } from "next/navigation";
import "../../styles/vehicle.css";
import "../../styles/admin.css";
import bmw from "../../assets/images/bmw.png";

const index = () => {
  const router = useRouter();
  const filteredVehiclesList = [
    {
      ownership: "Brand-New",
      yom: "2019",
      fuel: "petrol",
      color: "White",
      power: "1000",
      status: "pending",
      image: [bmw],
      name: "gdygsdy",
      price: "10000",
      _id: "2",
    },
    {
      ownership: "Brand-New",
      yom: "2019",
      fuel: "petrol",
      color: "White",
      power: "1000",
      status: "pending",
      image: [bmw],
      name: "gdygsdy",
      price: "10000",
      _id: "2",
    },
    {
      ownership: "Brand-New",
      yom: "2019",
      fuel: "petrol",
      color: "White",
      power: "1000",
      status: "pending",
      image: [bmw],
      name: "gdygsdy",
      price: "10000",
      _id: "2",
    },
    {
      ownership: "Brand-New",
      yom: "2019",
      fuel: "petrol",
      color: "White",
      power: "1000",
      status: "pending",
      image: [bmw],
      name: "gdygsdy",
      price: "10000",
      _id: "2",
    },
    {
      ownership: "Brand-New",
      yom: "2019",
      fuel: "petrol",
      color: "White",
      power: "1000",
      status: "pending",
      image: [bmw],
      name: "gdygsdy",
      price: "10000",
      _id: "2",
    },
  ];
  return (
    <>
      <Navbar />

      <div
        className="container-fluid min-vh-100 records-section"
        style={{ paddingTop: "120px" }}
      >
        <h2 className="mb-4 ps-5">Vehicle Records</h2>
        <div className="row ps-5 pe-5 mb-5">
          {filteredVehiclesList.length > 0 ? (
            filteredVehiclesList.map((vehicle, index) => {
              return (
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
                        src={vehicle.image[0]}
                        alt={`Vehicle ${index}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                      <h1>{vehicle.name}</h1>
                    </div>
                    <hr />
                    <div className="row mb-2 ps-3 pe-3">
                      <div className="col-9">
                        <CommonButton
                          text={"Show the Records"}
                          width={"100%"}
                          onClick={() => {
                            router.push(`/records/${vehicle._id}`);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <button className="btn btn-secondary">Contact</button>
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
    </>
  );
};

export default index;
