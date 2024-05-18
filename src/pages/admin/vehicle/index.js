import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import "../../../styles/admin.css";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
import { Status } from "@/src/data/datas";
import CommonButton from "@/src/components/CommonButton";
import add from "../../../assets/icons/add.png";
import AddVehicle from "@/src/components/AddVehicle";

const index = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);

  const [filteredVehiclesList, setFilteredVehiclesList] = useState([]);

  const HandleSearchRegNo = (event) => {
    setSearchRegNo(event.target.value);
  };

  const HandleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const HandleSearchModel = (event) => {
    setSearchModel(event.target.value);
  };
  const HandleSelectStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const HandleSelectPrice = (event) => {
    setSelectedPrice(event.target.value);
  };

  useEffect(() => {
    getVehicleDetails((res) => {
      setVehicleData(res.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = vehicleData.filter(
      (vehicle) =>
        vehicle.registerno.toLowerCase().includes(searchRegNo.toLowerCase()) &&
        vehicle.name.toLowerCase().includes(searchName.toLowerCase()) &&
        vehicle.model.toLowerCase().includes(searchModel.toLowerCase()) &&
        (selectedStatus === "" || vehicle.status === selectedStatus) &&
        (selectedPrice === "" || vehicle.price === selectedPrice)
    );
    setFilteredVehiclesList(filteredData);
  }, [
    searchRegNo,
    searchName,
    searchModel,
    selectedStatus,
    selectedPrice,
    vehicleData,
  ]);

  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
  };

  return (
    <Adminlayout>
      {showAddSection ? (
          <AddVehicle handleClose={handleOpenAddSection} />
      ) : (
        <div>
          <div className="d-flex justify-content-end pe-3 pb-3">
            <CommonButton
              text={"Add Vehicle"}
              image={add}
              onClick={handleOpenAddSection}
            />
          </div>
          <div className="Filter-Search-Container container-fluid mb-4">
            <h1 className="row ps-2 mb-3">Filter and Search</h1>
            <div className="row pb-2">
              <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container">
                  <form>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Filter By Register No"
                      value={searchRegNo}
                      onChange={HandleSearchRegNo}
                    />
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    {searchRegNo && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "2%",
                        }}
                        onClick={() => setSearchRegNo("")}
                      >
                        <ClearIcon />
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container">
                  <form>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Filter By Vehicle Name"
                      value={searchName}
                      onChange={HandleSearchName}
                    />
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    {searchName && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "2%",
                        }}
                        onClick={() => setSearchName("")}
                      >
                        <ClearIcon />
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container">
                  <form>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Model Name"
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
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedStatus}
                    onChange={HandleSelectStatus}
                  >
                    <option value="">Select Status</option>
                    {Status.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>

                  {selectedStatus && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSelectedStatus("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedPrice}
                    onChange={HandleSelectPrice}
                  >
                    <option value="">Price Range</option>
                    {/* {Districts.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))} */}
                  </select>

                  {selectedPrice && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="TableSection">
            <table className="table table-striped table-hover">
              <thead className="top-0 position-sticky z-1">
                <tr>
                  <th scope="col" className="col-1">
                    No
                  </th>
                  <th scope="col" className="col-2">
                    Vehicle Name
                  </th>
                  <th scope="col" className="col-1">
                    Type
                  </th>
                  <th scope="col" className="col-1">
                    Model
                  </th>
                  <th scope="col" className="col-1">
                    Price
                  </th>
                  <th scope="col" className="col-2">
                    Register No
                  </th>
                  <th scope="col" className="col-1">
                    Status
                  </th>
                  <th scope="col" className="col-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVehiclesList.length > 0 ? (
                  filteredVehiclesList.map((vehicle, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.type}</td>
                      <td>{vehicle.model}</td>
                      <td>{`Rs.${vehicle.price}`}</td>
                      <td>{vehicle.registerno}</td>
                      <td>
                        {" "}
                        <div
                          className={`Table-status-field ${
                            vehicle.status === "Available"
                              ? "Available-Field"
                              : vehicle.status === "Pending"
                              ? "Pending-Field"
                              : vehicle.status === "Requested"
                              ? "Requested-Field"
                              : "Sold-Field"
                          }`}
                        >
                          {vehicle.status}
                        </div>
                      </td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => productViewModal(product)}
                        >
                          <VisibilityIcon className="text-" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => productEditModal(product)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => handleDelete(product.id)}
                        >
                          <DeleteIcon className="text-danger" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Adminlayout>
  );
};

export default index;
