import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { toast } from "react-toastify";
import {
  deleteRecords,
  getAllRecordsDetails,
} from "@/src/redux/action/records";
import { getCustomerInfo } from "@/src/redux/action/customer";
import RecordsView from "@/src/components/modals/RecordsView";
import "../../../styles/admin.css";

const index = () => {
  const dispatch = useDispatch();
  const [recordData, setrecordData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  const [selectedrecordData, setSelectedrecordData] = useState(null);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRef, setsearchRef] = useState("");
  const [filteredRecordList, setFilteredRecordList] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setrecordPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecord = filteredRecordList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const HandleSearchRegNo = (event) => {
    setSearchRegNo(event.target.value);
  };
  const HandleSearchEmail = (event) => {
    setSearchEmail(event.target.value);
  };

  const HandlesearchRef = (event) => {
    setsearchRef(event.target.value);
  };

  useEffect(() => {
    fetchRecordsDetails();
  }, []);

  const fetchRecordsDetails = () => {
    dispatch(setLoading(true));
    getAllRecordsDetails(async (res) => {
      if (res?.data) {
        const record = Array?.isArray(res?.data) ? res?.data : [];
        if (record?.length === 0) {
          dispatch(setLoading(false));
          toast.info("No Auction data available");
          return;
        }
        setrecordData(record);
        dispatch(setLoading(false));

        const vehicleInfoPromises = record?.map(
          (record) =>
            new Promise((resolve) => {
              getVehicleInfo(record?.vehicleId, (response) =>
                resolve({ vehicleId: record?.vehicleId, data: response?.data })
              );
            })
        );
        const customerInfoPromises = record?.map(
          (record) =>
            new Promise((resolve) => {
              getCustomerInfo(record?.customerId, (response) =>
                resolve({
                  customerId: record?.customerId,
                  data: response?.data,
                })
              );
            })
        );

        try {
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);
          const customerInfoResponses = await Promise.all(customerInfoPromises);

          const vehicleDataMap = {};
          const customerDataMap = {};

          vehicleInfoResponses?.forEach((response) => {
            if (response?.data) {
              vehicleDataMap[response?.vehicleId] = response?.data;
            }
          });
          customerInfoResponses.forEach((response) => {
            if (response?.data) {
              customerDataMap[response?.customerId] = response?.data;
            }
          });

          setVehicleData(vehicleDataMap);
          setCustomerData(customerDataMap);
          dispatch(setLoading(false));
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
    const filteredData = recordData?.filter((record) => {
      const regNoMatch = vehicleData[record.vehicleId]?.registerno
        ? vehicleData[record?.vehicleId]?.registerno
            .toLowerCase()
            .includes(searchRegNo?.toLowerCase())
        : false;
      const emailMatch = customerData[record?.customerId]?.email
        ? customerData[record?.customerId]?.email
            .toLowerCase()
            .includes(searchEmail?.toLowerCase())
        : false;
      const refMatch = record?.recordsRefID
        ?.toLowerCase()
        .includes(searchRef.toLowerCase());
      return regNoMatch && emailMatch && refMatch;
    });
    setFilteredRecordList(filteredData);
  }, [
    recordData,
    searchRegNo,
    searchEmail,
    searchRef,
    vehicleData,
    customerData,
  ]);

  const openDeleteConfirmationModal = (recordID) => {
    setSelectedrecordData(recordID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleterecordData = (auctionID) => {
    deleteRecords(auctionID, (res) => {
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        fetchRecordsDetails();
        closeDeleteConfirmationModal();
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const OpenAuctionViewModal = (auction) => {
    setSelectedrecordData(auction);
    setShowViewModal(true);
  };

  const handleSearchByRefID = (event) => {
    event.preventDefault();
    const searchedRef = recordData?.find(
      (record) => record?.recordsRefID === searchRef
    );
    if (searchedRef) {
      setSelectedrecordData(searchedRef);
      setShowViewModal(true);
      setsearchRef("");
    } else {
      toast.error("Invalid RefID");
    }
  };

  const handleSearchByRegNo = (event) => {
    event.preventDefault();
    const searchedAuction = recordData?.find(
      (record) => vehicleData[record?.vehicleId]?.registerno === searchRegNo
    );
    if (searchedAuction) {
      setSelectedrecordData(searchedAuction);
      setShowViewModal(true);
      setSearchRegNo("");
    } else {
      toast.error("Invalid RegNo");
    }
  };
  const handleSearchByEmail = (event) => {
    event.preventDefault();
    const searchedRecord = recordData?.find(
      (record) => customerData[record?.customerId]?.email === searchEmail
    );
    if (searchedRecord) {
      setSelectedrecordData(searchedRecord);
      setShowViewModal(true);
      setSearchRegNo("");
    } else {
      toast.error("Invalid Email");
    }
  };

  return (
    <Adminlayout>
      <div>
        <div className="Filter-Search-Container container-fluid mb-4">
          <h1 className="row ps-2 mb-3">Filter and Search</h1>
          <div className="row pb-2">
            <div className="col-md-4 col-sm-12 pb-2">
              <div className="search-input-container">
                <form onSubmit={handleSearchByRefID}>
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
            <div className="col-md-4 col-sm-12 pb-2">
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
            <div className="col-md-4 col-sm-12 pb-2">
              <div className="search-input-container">
                <form onSubmit={handleSearchByEmail}>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter By Email"
                    value={searchEmail}
                    onChange={HandleSearchEmail}
                  />
                  <div className="search-icon">
                    <SearchIcon />
                  </div>
                  {searchEmail && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSearchEmail("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </form>
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
                  Record RefID
                </th>
                <th scope="col" className="col-2">
                  Vehicle RegisterNo
                </th>
                <th scope="col" className="col-2">
                  Customer Email
                </th>
                <th scope="col" className="col-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecord?.length > 0 ? (
                currentRecord?.map((record, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{record.recordsRefID}</td>
                    <td>
                      {vehicleData[record?.vehicleId]?.registerno || "N/A"}
                    </td>
                    <td>{customerData[record?.customerId]?.email || "N/A"}</td>
                    <td className="col-2">
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => OpenAuctionViewModal(record)}
                      >
                        <VisibilityIcon className="" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => openDeleteConfirmationModal(record?._id)}
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
              {Math.ceil(filteredRecordList?.length / recordPerPage)}
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
              disabled={indexOfLastRecord >= filteredRecordList?.length}
              style={{ width: 120 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <RecordsView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        recordsDetails={selectedrecordData}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Details?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleterecordData(selectedrecordData)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default index;
