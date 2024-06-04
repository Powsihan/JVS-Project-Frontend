import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getEmployeeDetails } from "@/src/redux/action/employee";
import CommonButton from "@/src/components/CommonButton";
import add from "../../../assets/icons/add.png";
import AddEmployee from "@/src/components/sections/AddEmployee";
import { toast } from "react-toastify";
import { customerData } from "@/src/redux/reducer/customerSlice";
import { EmployeeRole } from "@/src/data/datas";
const index = () => {
  const dispatch = useDispatch();
  const [employeeData, setEmployeedata] = useState([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchPhoneNo, setSearchPhoneNo] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage, setemployeePerPage] = useState(10);
  const indexOfLastEmployee = currentPage * employeePerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;

  const currentEmployees = filteredEmployeeList.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const HandleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const HandleSearchPhoneNo = (event) => {
    setSearchPhoneNo(event.target.value);
  };

  const HandleSearchEmail = (event) => {
    setSearchEmail(event.target.value);
  };
  const HandleSelectRole = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const filteredData = employeeData.filter(
      (employees) =>
        employees.name.toLowerCase().includes(searchName.toLowerCase()) &&
        employees.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        employees.phoneNumber.includes(searchPhoneNo) &&
        (selectedRole === "" || employees.role === selectedRole)
    );
    setFilteredEmployeeList(filteredData);
  }, [searchName, searchEmail,searchPhoneNo, selectedRole, employeeData]);

  useEffect(() => {
    dispatch(setLoading(true));
    getEmployeeDetails((res) => {
      if (res && res.data) {
        setEmployeedata(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Customer details");
      }
    });
  }, []);

  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
  };
  return (
    <div>
      <Adminlayout>
        {showAddSection ? (
          <AddEmployee handleClose={handleOpenAddSection} />
        ) : (
          <div>
            <div className="d-flex justify-content-end pe-3 pb-3">
              <CommonButton
                text={"Add Employee"}
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
                    <form>
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
                    <form>
                      <input
                        className="SearchBox"
                        type="text"
                        placeholder="Filter by PhoneNo"
                        value={searchPhoneNo}
                        onChange={HandleSearchPhoneNo}
                      />
                      <div className="search-icon">
                        <SearchIcon />
                      </div>
                      {searchPhoneNo && (
                        <div
                          className="search-icon"
                          style={{
                            zIndex: "100",
                            backgroundColor: "white",
                            right: "2%",
                          }}
                          onClick={() => setSearchPhoneNo("")}
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
                      value={selectedRole}
                      onChange={HandleSelectRole}
                    >
                      <option value="">Select the Role</option>
                      {EmployeeRole.map((data, index) => (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      ))}
                    </select>

                    {selectedRole && (
                      <div
                        className="search-icon"
                        style={{
                          zIndex: "100",
                          backgroundColor: "white",
                          right: "2%",
                        }}
                        onClick={() => setSelectedRole("")}
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
                      Role
                    </th>
                    <th scope="col" className="col-2">
                      Email
                    </th>
                    <th scope="col" className="col-2">
                      PhoneNo
                    </th>
                    <th scope="col" className="col-1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.length > 0 ? (
                    currentEmployees.map((employee, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.role}</td>
                        <td>{employee.phoneNumber}</td>
                        <td className="col-2">
                          <IconButton
                            aria-label="delete"
                            className="viewbutt"
                            onClick={() => OpenCustomerViewModal(employee)}
                          >
                            <VisibilityIcon className="text-" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            className="viewbutt"
                            onClick={() =>
                              openDeleteConfirmationModal(employee._id)
                            }
                          >
                            <DeleteIcon className="text-danger" />
                          </IconButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="Filter-Search-Container d-flex justify-content-between pe-3 p-4">
              <div className="Pagination-Text">
                <p>
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredEmployeeList.length / employeePerPage)}
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
                  disabled={indexOfLastEmployee >= filteredEmployeeList.length}
                  style={{ width: 120 }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </Adminlayout>
    </div>
  );
};

export default index;
