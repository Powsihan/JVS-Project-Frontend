import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import "../../../styles/admin.css";
import { deleteVehicle, getVehicleDetails } from "@/src/redux/action/vehicle";
import { Status } from "@/src/data/datas";
import CommonButton from "@/src/components/CommonButton";
import add from "../../../assets/icons/add.png";
import AddVehicle from "@/src/components/page/AddVehicle";
import { toast, ToastContainer } from "react-toastify";
import VehicleView from "@/src/components/modals/VehicleView";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import VehicleEdit from "@/src/components/modals/VehicleEdit";

const index = () => {
  const dispatch = useDispatch();
  const [vehicleData, setVehicleData] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);

  const [filteredVehiclesList, setFilteredVehiclesList] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicledata, setSelectedVehicledata] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

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
    dispatch(setLoading(true));
    getVehicleDetails((res) => {
      if (res && res.data) {
        setVehicleData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  const handleSearchByRegNo = (event) => {
    event.preventDefault();
    const searchedRef = vehicleData.find(
      (vehicle) => vehicle.registerno === searchRegNo
    );
    if (searchedRef) {
      setSelectedVehicledata(searchedRef);
      setShowViewModal(true);
      setSearchRegNo("");
    } else {
      toast.error("Invalid RegNo");
    }
  };

  const handleSearchByName = (event) => {
    event.preventDefault();
    const searchedRef = vehicleData.find(
      (vehicle) => vehicle.name === searchName
    );
    if (searchedRef) {
      setSelectedVehicledata(searchedRef);
      setShowViewModal(true);
      setSearchName("");
    } else {
      toast.error("Invalid Name");
    }
  };

  useEffect(() => {
    const filteredData = vehicleData.filter((vehicle) => {
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
        vehicle.registerno.toLowerCase().includes(searchRegNo.toLowerCase()) &&
        vehicle.name.toLowerCase().includes(searchName.toLowerCase()) &&
        vehicle.model.toLowerCase().includes(searchModel.toLowerCase()) &&
        (selectedStatus === "" || vehicle.status === selectedStatus) &&
        isWithinPriceRange(vehicle.price)
      );
    });
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

  const OpenVehicleViewModal = (vehicle) => {
    setSelectedVehicledata(vehicle);
    setShowViewModal(true);
  };

  const OpenVehicleEditModal = (vehicle) => {
    setSelectedVehicledata(vehicle);
    setShowEditModal(true);
  };

  const handleEditModalClose = (vehicle) => {
    setShowEditModal(false);
    fetchUpdatedData();
  };

  const openDeleteConfirmationModal = (vehicleID) => {
    setSelectedVehicledata(vehicleID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteVehicleData = (vehicleID) => {
    deleteVehicle(vehicleID, (res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setVehicleData(
          vehicleData.filter((vehicle) => vehicle._id !== vehicleID)
        );
        closeDeleteConfirmationModal();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const fetchUpdatedData = () => {
    dispatch(setLoading(true));
    getVehicleDetails((res) => {
      if (res && res.data) {
        setVehicleData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
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
                  <form onSubmit={handleSearchByRegNo}>
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
                  <form onSubmit={handleSearchByName}>
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
                    <option value="50000-100000">Rs. 50,000 - 1L</option>
                    <option value="100000-500000">
                      Rs. 1L - 5L
                    </option>
                    <option value="500000-1000000">
                      Rs. 5L - 10L
                    </option>
                    <option value="1000000-5000000">
                      Rs. 10L - 50L
                    </option>
                    <option value="5000000-10000000">
                      Rs. 50L - 1C
                    </option>
                    <option value="over10000000">Over Rs. 1C</option>
                  </select>

                  {selectedPrice && (
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
                    Register No
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
                      <td>{vehicle.registerno}</td>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.type}</td>
                      <td>{vehicle.model}</td>
                      <td>{`Rs.${vehicle.price}`}</td>
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
                          onClick={() => OpenVehicleViewModal(vehicle)}
                        >
                          <VisibilityIcon className="" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => OpenVehicleEditModal(vehicle)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() =>
                            openDeleteConfirmationModal(vehicle._id)
                          }
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
      {/* <ToastContainer/> */}
      <VehicleView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        vehicleDetails={selectedVehicledata}
      />
      <VehicleEdit
        show={showEditModal}
        onHide={handleEditModalClose}
        vehicleDetails={selectedVehicledata}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Vehicle?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteVehicleData(selectedVehicledata)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default index;
