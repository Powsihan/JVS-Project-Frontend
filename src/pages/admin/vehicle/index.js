import Adminlayout from "@/src/layouts/Adminlayout";
import React from "react";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import "../../../styles/admin.css";

const index = () => {
  const filteredproductList = [
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Sold",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Pending",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
    {
      VehicleName: "sdfsdfd",
      Category: "uhyughyh",
      Model: "Model",
      Price: "500",
      Register: "JUHUHSU4454",
      Status: "Available",
    },
  ];
  return (
    <Adminlayout>
      <div>
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
                  Category
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
              {filteredproductList.length > 0 ? (
                filteredproductList.map((vehicle, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{vehicle.VehicleName}</td>
                    <td>{vehicle.Category}</td>
                    <td>{vehicle.Model}</td>
                    <td>{`Rs.${vehicle.Price}`}</td>
                    <td>{vehicle.Register}</td>
                    <td>
                      {" "}
                      <div
                        className={`Table-status-field ${
                          vehicle.Status === "Available"
                            ? "Available-Field"
                            : vehicle.Status === "Pending"
                            ? "Pending-Field"
                            : "Sold-Field"
                        }`}
                      >
                        {vehicle.Status}
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
                  <td colSpan="7">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Adminlayout>
  );
};

export default index;
