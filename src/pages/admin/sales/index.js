import Adminlayout from '@/src/layouts/Adminlayout'
import React from 'react'
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CommonButton from '@/src/components/CommonButton';
import add from "../../../assets/icons/add.png";
const index = () => {
  return (
  <Adminlayout>
    <div>
          <div className="d-flex justify-content-end pe-3 pb-3">
            <CommonButton
              text={"Add Sales"}
              image={add}
              // onClick={handleOpenAddSection}
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
                    Current Price
                  </th>
                  <th scope="col" className="col-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {filteredVehiclesList.length > 0 ? (
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
                )} */}
              </tbody>
            </table>
          </div>
        </div>
  </Adminlayout>
  )
}

export default index

