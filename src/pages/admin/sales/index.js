import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CommonButton from "@/src/components/CommonButton";
import AddSales from "@/src/components/sections/AddSales";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { deleteSales, getSalesDetails } from "@/src/redux/action/sales";
import "../../../styles/admin.css";
import SalesView from "@/src/components/modals/SalesView";
import { getCustomerInfo } from "@/src/redux/action/customer";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
import { SalesStatus } from "@/src/data/datas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { add } from "@/src/utils/ImagesPath";
const AdminSalesPage = () => {
  const dispatch = useDispatch();
  const [showAddSection, setShowAddSection] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSalesdata, setSelectedSalesdata] = useState(null);
  const [customerData, setCustomerData] = useState({});
  const [vehicleData, setVehicleData] = useState({});

  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchEmail, setsearchEmail] = useState("");
  const [searchRef, setsearchRef] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [filteredSalesList, setFilteredSalesList] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage, setcustomerPerPage] = useState(10);
  const indexOfLastSales = currentPage * salesPerPage;
  const indexOfFirstSales = indexOfLastSales - salesPerPage;
  const currentSales = filteredSalesList?.slice(
    indexOfFirstSales,
    indexOfLastSales
  );

  const HandleSearchRegNo = (event) => {
    setSearchRegNo(event.target.value);
  };

  const HandlesearchEmail = (event) => {
    setsearchEmail(event.target.value);
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

  const openDeleteConfirmationModal = (salesID) => {
    setSelectedSalesdata(salesID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteSalesData = (salesID) => {
    deleteSales(salesID, (res) => {
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        fetchSalesDetails();
        closeDeleteConfirmationModal();
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleSearchByRefID = (event) => {
    event.preventDefault();
    const searchedRef = salesData?.find(
      (sales) => sales?.salesRefID === searchRef
    );
    if (searchedRef) {
      setSelectedSalesdata(searchedRef);
      setShowViewModal(true);
      setsearchRef("");
    } else {
      toast.error("Invalid RefID");
    }
  };

  const handleSearchByRegNo = (event) => {
    event.preventDefault();
    const searchedSales = salesData?.find(
      (sales) => vehicleData[sales?.vehicleId]?.registerno === searchRegNo
    );
    if (searchedSales) {
      setSelectedSalesdata(searchedSales);
      setShowViewModal(true);
      setSearchRegNo("");
    } else {
      toast.error("Invalid RegNo");
    }
  };

  const handleSearchByEmail = (event) => {
    event.preventDefault();
    const searchedSales = salesData?.find(
      (sales) => customerData[sales?.customerId]?.email === searchEmail
    );
    if (searchedSales) {
      setSelectedSalesdata(searchedSales);
      setShowViewModal(true);
      setsearchEmail("");
    } else {
      toast.error("Invalid Email");
    }
  };

  useEffect(() => {
    fetchSalesDetails();
  }, []);

  const fetchSalesDetails = () => {
    dispatch(setLoading(true));
    getSalesDetails(async (res) => {
      if (res?.data) {
        const sales = Array?.isArray(res?.data) ? res?.data : [];
        if (sales?.length === 0) {
          dispatch(setLoading(false));
          toast.info("No sales data available");
          return;
        }
        setSalesData(sales);
        dispatch(setLoading(false));
        const customerInfoPromises = sales?.map(
          (sale) =>
            new Promise((resolve) => {
              getCustomerInfo(sale?.customerId, (response) =>
                resolve({ customerId: sale?.customerId, data: response?.data })
              );
            })
        );

        const vehicleInfoPromises = sales?.map(
          (sale) =>
            new Promise((resolve) => {
              getVehicleInfo(sale?.vehicleId, (response) =>
                resolve({ vehicleId: sale?.vehicleId, data: response?.data })
              );
            })
        );

        try {
          const customerInfoResponses = await Promise.all(customerInfoPromises);
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);

          const customerDataMap = {};
          const vehicleDataMap = {};

          customerInfoResponses?.forEach((response) => {
            if (response?.data) {
              customerDataMap[response?.customerId] = response?.data;
            }
          });

          vehicleInfoResponses?.forEach((response) => {
            if (response?.data) {
              vehicleDataMap[response?.vehicleId] = response?.data;
            }
          });

          setCustomerData(customerDataMap);
          setVehicleData(vehicleDataMap);
        } catch (error) {
          console.error("Error fetching customer or vehicle details", error);
          toast.error("Error fetching additional details");
        }
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching Sales details", res);
        toast.error("Error fetching Sales details");
      }
    });
  };

  const OpenSalesViewModal = (sales) => {
    setSelectedSalesdata(sales);
    setShowViewModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const filteredData = salesData?.filter((sales) => {
      const regNoMatch = vehicleData[sales?.vehicleId]?.registerno
        ? vehicleData[sales?.vehicleId].registerno
            .toLowerCase()
            .includes(searchRegNo?.toLowerCase())
        : false;
      const emailMatch = customerData[sales?.customerId]?.email
        ? customerData[sales?.customerId]?.email
            .toLowerCase()
            .includes(searchEmail?.toLowerCase())
        : false;
      const refMatch = sales?.salesRefID
        .toLowerCase()
        .includes(searchRef?.toLowerCase());
      const statusMatch =
        selectedStatus === "" || sales?.status === selectedStatus;
      const dateMatch =
        searchDate === null ||
        new Date(sales?.creationDate).toLocaleDateString() ===
          new Date(searchDate).toLocaleDateString();
      return regNoMatch && emailMatch && refMatch && statusMatch && dateMatch;
    });
    setFilteredSalesList(filteredData);
  }, [
    salesData,
    searchRegNo,
    searchEmail,
    searchRef,
    selectedStatus,
    searchDate,
    customerData,
    vehicleData,
  ]);

  return (
    <Adminlayout>
      {showAddSection ? (
        <AddSales handleClose={handleOpenAddSection} />
      ) : (
        <div>
          <div className="d-flex justify-content-end pe-3 pb-3">
            <CommonButton
              text={"Add Sales"}
              image={add}
              onClick={handleOpenAddSection}
            />
          </div>
          <div className="Filter-Search-Container container-fluid mb-4">
            <h1 className="row ps-2 mb-3">Filter and Search</h1>
            <div className="row pb-2">
              <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
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
                  <form onSubmit={handleSearchByEmail}>
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Filter By Email"
                      value={searchEmail}
                      onChange={HandlesearchEmail}
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
                        onClick={() => setsearchEmail("")}
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
                    selected={searchDate}
                    onChange={(date) => setSearchDate(date)}
                    className="SearchBox"
                    placeholderText="Filter By Date"
                  />
                  {searchDate && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "12%",
                      }}
                      onClick={() => setSearchDate(null)}
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
                    {SalesStatus?.map((data, index) => (
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
                  <th scope="col" className="col-1">
                    Sales RefID
                  </th>
                  <th scope="col" className="col-1">
                    Date
                  </th>
                  <th scope="col" className="col-2">
                    Vehicle RegNo
                  </th>
                  <th scope="col" className="col-2">
                    Customer Email
                  </th>
                  <th scope="col" className="col-2">
                    Price (LKR)
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
                {currentSales?.length > 0 ? (
                  currentSales?.map((sales, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{sales?.salesRefID}</td>
                      <td>{formatDate(sales?.creationDate)}</td>
                      <td>
                        {vehicleData[sales?.vehicleId]?.registerno || "N/A"}
                      </td>
                      <td>{customerData[sales?.customerId]?.email || "N/A"}</td>
                      <td>{sales?.price}</td>
                      <td>
                        <div
                          className={`Table-status-field ${
                            sales?.status === "Sale"
                              ? "Sale-Field"
                              : sales.status === "Buy"
                              ? "Buy-Field"
                              : ""
                          }`}
                        >
                          {sales?.status}
                        </div>
                      </td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => OpenSalesViewModal(sales)}
                        >
                          <VisibilityIcon className="" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => openDeleteConfirmationModal(sales?._id)}
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
                {Math.ceil(filteredSalesList?.length / salesPerPage)}
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
                disabled={indexOfLastSales >= filteredSalesList?.length}
                style={{ width: 120 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <SalesView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        salesDetails={selectedSalesdata}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Details?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteSalesData(selectedSalesdata)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default AdminSalesPage;
