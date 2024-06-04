import Adminlayout from '@/src/layouts/Adminlayout'
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CommonButton from "@/src/components/CommonButton";
import add from "../../../assets/icons/add.png";
import { useDispatch } from 'react-redux';
import AddAuction from '@/src/components/sections/AddAuction';

const index = () => {
  const dispatch = useDispatch();
  const [showAddSection, setShowAddSection] = useState(false);


  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
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
          {/* <div className="Filter-Search-Container container-fluid mb-4">
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
                <div className="search-input-container">
                  <select
                    className="SearchBox"
                    value={selectedStatus}
                    onChange={HandleSelectStatus}
                  >
                    <option value="">Select Status</option>
                    {SalesStatus.map((data, index) => (
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
                        right: "2%",
                      }}
                      onClick={() => setSearchDate(null)}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
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
                  <th scope="col" className="col-1">
                    Price
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
                {/* {currentSales.length > 0 ? (
                  currentSales.map((sales, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{sales.salesRefID}</td>
                      <td>{formatDate(sales.creationDate)}</td>
                      <td>
                        {vehicleData[sales.vehicleId]?.registerno || "N/A"}
                      </td>
                      <td>{customerData[sales.customerId]?.email || "N/A"}</td>
                      <td>{sales.price}</td>
                      <td>
                        <div
                          className={`Table-status-field ${
                            sales.status === "Sale"
                              ? "Sale-Field"
                              : sales.status === "Buy"
                              ? "Buy-Field"
                              : ""
                          }`}
                        >
                          {sales.status}
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
                          // onClick={() => OpenVehicleEditModal(vehicle)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() =>
                            openDeleteConfirmationModal(sales._id)
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
                )} */}
              </tbody>
            </table>
          </div>
          <div className="Filter-Search-Container d-flex justify-content-between pe-3 p-4">
            <div className="Pagination-Text">
              {/* <p>
                Page {currentPage} of{" "}
                {Math.ceil(filteredSalesList.length / salesPerPage)}
              </p> */}
            </div>
            <div className="d-flex gap-2">
              {/* <button
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
                disabled={indexOfLastSales >= filteredSalesList.length}
                style={{ width: 120 }}
              >
                Next
              </button> */}
            </div>
          </div>
        </div>
      )}
  </Adminlayout>
  )
}

export default index

