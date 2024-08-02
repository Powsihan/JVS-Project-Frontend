import Adminlayout from "@/src/layouts/Adminlayout";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "../../../styles/admin.css";
import { useEffect, useState } from "react";
import {
  deleteCustomer,
  getCustomerDetails,
} from "@/src/redux/action/customer";
import CustomerView from "@/src/components/modals/CustomerView";
import { Districts } from "../../../data/datas.js";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { Customerlogout } from "@/src/redux/action/logout";

const index = () => {
  const dispatch = useDispatch();
  const [customerdata, setCustomerdata] = useState([]);
  const [selectedCustomerdata, setSelectedCustomerdata] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchNic, setSearchNic] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCustomersList, setFilteredCustomersList] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setcustomerPerPage] = useState(10);
  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomers = filteredCustomersList?.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  useEffect(() => {
    dispatch(setLoading(true));
    getCustomerDetails((res) => {
      if (res?.data) {
        const customers = Array.isArray(res.data) ? res.data : [];
        if (customers?.length === 0) {
          dispatch(setLoading(false));
          toast.info("No Customers data available");
          return;
        }
        setCustomerdata(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, []);

  const HandleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const HandleSearchNic = (event) => {
    setSearchNic(event.target.value);
  };

  const HandleSearchEmail = (event) => {
    setSearchEmail(event.target.value);
  };
  const HandleSelectCity = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    const filteredData = customerdata?.filter(
      (customers) =>
        customers?.fname.toLowerCase().includes(searchName?.toLowerCase()) &&
        customers?.nic.toLowerCase().includes(searchNic?.toLowerCase()) &&
        customers?.email.toLowerCase().includes(searchEmail?.toLowerCase()) &&
        (selectedCity === "" || customers?.city === selectedCity)
    );
    setFilteredCustomersList(filteredData);
  }, [searchName, searchNic, searchEmail, selectedCity, customerdata]);

  const OpenCustomerViewModal = (customer) => {
    setSelectedCustomerdata(customer);
    setShowViewModal(true);
  };

  const openDeleteConfirmationModal = (customerID) => {
    setSelectedCustomerdata(customerID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteCustomerData = (userID) => {
    dispatch(setLoading(true));
    deleteCustomer(userID, (res) => {
      if (res?.status == 200) {
        dispatch(setLoading(false));
        toast.success(res?.data?.message);
        setCustomerdata(
          customerdata?.filter((customer) => customer?._id !== userID)
        );
        closeDeleteConfirmationModal();
        Customerlogout();
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const handleSearchByNIC = (event) => {
    event.preventDefault();
    const searchedRef = customerdata?.find(
      (customer) => customer?.nic === searchNic
    );
    if (searchedRef) {
      setSelectedCustomerdata(searchedRef);
      setShowViewModal(true);
      setSearchNic("");
    } else {
      toast.error("Invalid NIC");
    }
  };

  const handleSearchByName = (event) => {
    event.preventDefault();
    const searchedRef = customerdata?.find(
      (customer) => customer?.fname === searchName
    );
    if (searchedRef) {
      setSelectedCustomerdata(searchedRef);
      setShowViewModal(true);
      setSearchName("");
    } else {
      toast.error("Invalid Name");
    }
  };

  const handleSearchByEmail = (event) => {
    event.preventDefault();
    const searchedRef = customerdata?.find(
      (customer) => customer?.email === searchEmail
    );
    if (searchedRef) {
      setSelectedCustomerdata(searchedRef);
      setShowViewModal(true);
      setSearchEmail("");
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
            <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
              <div className="search-input-container">
                <form onSubmit={handleSearchByName}>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter by Name"
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
            <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
              <div className="search-input-container">
                <form onSubmit={handleSearchByNIC}>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter by NIC"
                    value={searchNic}
                    onChange={HandleSearchNic}
                  />
                  <div className="search-icon">
                    <SearchIcon />
                  </div>
                  {searchNic && (
                    <div
                      className="search-icon"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "2%",
                      }}
                      onClick={() => setSearchNic("")}
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
                    placeholder="Filter by Email"
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
            <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
              <div className="search-input-container">
                <select
                  className="SearchBox"
                  value={selectedCity}
                  onChange={HandleSelectCity}
                >
                  <option value="">Select the City</option>
                  {Districts?.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>

                {selectedCity && (
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
        <div className="TableSection mb-3">
          <table className="table table-striped table-hover">
            <thead className="top-0 position-sticky z-1">
              <tr>
                <th scope="col" className="col-1">
                  No
                </th>
                <th scope="col" className="col-2">
                  Name
                </th>
                <th scope="col" className="col-1">
                  NIC
                </th>
                <th scope="col" className="col-2">
                  Email
                </th>
                <th scope="col" className="col-1">
                  PhoneNo
                </th>
                <th scope="col" className="col-1">
                  City
                </th>
                <th scope="col" className="col-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers?.length > 0 ? (
                currentCustomers?.map((customer, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{`${customer?.fname} ${customer?.lname}`}</td>
                    <td>{customer?.nic}</td>
                    <td>{customer?.email}</td>
                    <td>{customer?.phoneNo}</td>
                    <td>{customer?.city}</td>
                    <td className="col-2">
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => OpenCustomerViewModal(customer)}
                      >
                        <VisibilityIcon className="text-" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() =>
                          openDeleteConfirmationModal(customer?._id)
                        }
                      >
                        <DeleteIcon className="text-danger" />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="Filter-Search-Container d-flex justify-content-between pe-3 p-4">
          <div className="Pagination-Text">
            <p>
              Page {currentPage} of{" "}
              {Math.ceil(filteredCustomersList?.length / customerPerPage)}
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
              disabled={indexOfLastCustomer >= filteredCustomersList.length}
              style={{ width: 120 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <CustomerView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        customerDetails={selectedCustomerdata}
      />
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this User?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteCustomerData(selectedCustomerdata)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default index;
