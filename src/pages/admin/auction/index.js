import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CommonButton from "@/src/components/CommonButton";
import { useDispatch } from "react-redux";
import AddAuction from "@/src/components/sections/AddAuction";
import { deleteAuction, getAuctionDetails } from "@/src/redux/action/auction";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import { AuctionStatus } from "@/src/data/datas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { toast } from "react-toastify";
import AuctionView from "@/src/components/modals/AuctionView";
import { add } from "@/src/utils/ImagesPath";

const index = () => {
  const dispatch = useDispatch();
  const [showAddSection, setShowAddSection] = useState(false);
  const [auctionData, setAuctionData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  const [selectedAuctiondata, setSelectedAuctiondata] = useState(null);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchRef, setsearchRef] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [filteredAuctionList, setFilteredAuctionList] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctionPerPage, setauctionPerPage] = useState(10);
  const indexOfLastAuction = currentPage * auctionPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionPerPage;
  const currentAuction = filteredAuctionList.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  const HandleSearchRegNo = (event) => {
    setSearchRegNo(event.target.value);
  };

  const HandlesearchRef = (event) => {
    setsearchRef(event.target.value);
  };

  const HandleSelectStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
  };

  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  const fetchAuctionDetails = () => {
    dispatch(setLoading(true));
    getAuctionDetails(async (res) => {
      if (res && res.data) {
        const auction = res.data;
        setAuctionData(auction);
        dispatch(setLoading(false));

        const vehicleInfoPromises = auction.map(
          (auction) =>
            new Promise((resolve) => {
              getVehicleInfo(auction.vehicleId, (response) =>
                resolve({ vehicleId: auction.vehicleId, data: response.data })
              );
            })
        );

        try {
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);

          const vehicleDataMap = {};

          vehicleInfoResponses.forEach((response) => {
            if (response.data) {
              vehicleDataMap[response.vehicleId] = response.data;
            }
          });

          setVehicleData(vehicleDataMap);
        } catch (error) {
          console.error("Error fetching vehicle details", error);
          toast.error("Error fetching additional details");
        }
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Auction details", res);
        toast.error("Error fetching Auction details");
      }
    });
  };

  useEffect(() => {
    const filteredData = auctionData.filter((auction) => {
      const regNoMatch = vehicleData[auction.vehicleId]?.registerno
        ? vehicleData[auction.vehicleId].registerno
            .toLowerCase()
            .includes(searchRegNo.toLowerCase())
        : false;
      const refMatch = auction.auctionRefID
        .toLowerCase()
        .includes(searchRef.toLowerCase());
      const statusMatch =
        selectedStatus === "" || auction.status === selectedStatus;
      const startdateMatch =
        searchStartDate === null ||
        new Date(auction.startDate).toLocaleDateString() ===
          new Date(searchStartDate).toLocaleDateString();
      const enddateMatch =
        searchEndDate === null ||
        new Date(auction.endDate).toLocaleDateString() ===
          new Date(searchEndDate).toLocaleDateString();
      return (
        regNoMatch && refMatch && statusMatch && startdateMatch && enddateMatch
      );
    });
    setFilteredAuctionList(filteredData);
  }, [
    auctionData,
    searchRegNo,
    searchRef,
    selectedStatus,
    searchStartDate,
    searchEndDate,
    vehicleData,
  ]);

  const openDeleteConfirmationModal = (auctionID) => {
    setSelectedAuctiondata(auctionID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteAuctionData = (auctionID) => {
    deleteAuction(auctionID, (res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchAuctionDetails();
        closeDeleteConfirmationModal();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const OpenAuctionViewModal = (auction) => {
    setSelectedAuctiondata(auction);
    setShowViewModal(true);
  };

  return (
    <Adminlayout>
      {showAddSection ? (
        <AddAuction handleClose={handleOpenAddSection} />
      ) : (
        <div>
          <div className="d-flex justify-content-end pe-3 pb-3">
            <CommonButton
              text={"Add Auction"}
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
                      placeholder="Ref ID"
                      value={searchRef}
                      onChange={HandlesearchRef}
                    />
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    {searchRef && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "2%",
                        }}
                        onClick={() => setsearchRef("")}
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
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container z-2">
                  <DatePicker
                    selected={searchStartDate}
                    onChange={(date) => setSearchStartDate(date)}
                    className="SearchBox"
                    placeholderText="Filter By Start Date"
                  />
                  {searchStartDate && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSearchStartDate(null)}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
                <div className="search-input-container z-2">
                  <DatePicker
                    selected={searchEndDate}
                    onChange={(date) => setSearchEndDate(date)}
                    className="SearchBox"
                    placeholderText="Filter By End Date"
                  />
                  {searchEndDate && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSearchEndDate(null)}
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
                    value={selectedStatus}
                    onChange={HandleSelectStatus}
                  >
                    <option value="">Select Status</option>
                    {AuctionStatus.map((data, index) => (
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
            </div>
          </div>
          <div className="TableSection mb-3">
            <table className="table table-striped table-hover">
              <thead className="top-0 position-sticky z-1">
                <tr>
                  <th scope="col" className="col-1">
                    No
                  </th>
                  <th scope="col" className="col-2">
                    Auction RefID
                  </th>
                  <th scope="col" className="col-2">
                    Vehicle RegisterNo
                  </th>
                  <th scope="col" className="col-1">
                    Start Date
                  </th>
                  <th scope="col" className="col-1">
                    End Date
                  </th>
                  <th scope="col" className="col-2">
                    Start Bidding Price
                  </th>
                  <th scope="col" className="col-1">
                    Status
                  </th>
                  <th scope="col" className="col-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAuction.length > 0 ? (
                  currentAuction.map((auction, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{auction.auctionRefID}</td>
                      <td>
                        {vehicleData[auction.vehicleId]?.registerno || "N/A"}
                      </td>
                      <td>{auction.startDate}</td>
                      <td> {auction.endDate}</td>
                      <td>{`Rs ${auction.bidstartprice}`}</td>
                      <td>
                        <div
                          className={`Table-status-field ${
                            auction.status === "Available"
                              ? "Available-Field"
                              : auction.status === "Pending"
                              ? "Pending-Field"
                              : "Sold-Field"
                          }`}
                        >
                          {auction.status}
                        </div>
                      </td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => OpenAuctionViewModal(auction)}
                        >
                          <VisibilityIcon className="" />
                        </IconButton>
                        {/* <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => OpenVehicleEditModal(vehicle)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton> */}
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() =>
                            openDeleteConfirmationModal(auction._id)
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
          <div className="Filter-Search-Container d-flex justify-content-between pe-3 p-4">
            <div className="Pagination-Text">
              <p>
                Page {currentPage} of{" "}
                {Math.ceil(filteredAuctionList.length / auctionPerPage)}
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ width: 120 }}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastAuction >= filteredAuctionList.length}
                style={{ width: 120 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <AuctionView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        auctionDetails={selectedAuctiondata}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Details?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteAuctionData(selectedAuctiondata)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default index;
