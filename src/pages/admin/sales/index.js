import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CommonButton from "@/src/components/CommonButton";
import add from "../../../assets/icons/add.png";
import AddSales from "@/src/components/page/AddSales";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getSalesDetails } from "@/src/redux/action/sales";
import "../../../styles/admin.css";
const index = () => {
  const dispatch = useDispatch();
  const [showAddSection, setShowAddSection] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getSalesDetails((res) => {
      if (res && res.data) {
        setSalesData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        console.error("Error fetching vehicle details", res);
        toast.error("Error fetching vehicle details");
      }
    });
  }, []);

  

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
          <div className="TableSection">
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
                    Customer NIC
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
                {salesData.length > 0 ? (
                  salesData.map((vehicle, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{vehicle.salesRefID}</td>
                      <td>{vehicle.creationDate}</td>
                      <td>{vehicle.vehicleId}</td>
                      <td>{vehicle.customerId}</td>
                      <td>{vehicle.price}</td>
                      <td>
                        <div
                          className={`Table-status-field ${
                            vehicle.status === "Sale"
                              ? "Sale-Field"
                              : vehicle.status === "Buy"
                              ? "Buy-Field":""
                          }`}
                        >
                          {vehicle.status}
                        </div>
                      </td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => OpenVehicleViewModal(vehicle)}
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
                          // onClick={() =>
                          //   openDeleteConfirmationModal(vehicle._id)
                          // }
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
