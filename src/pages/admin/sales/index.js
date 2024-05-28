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
import SalesView from "@/src/components/modals/SalesView";
import { getCustomerInfo } from "@/src/redux/action/customer";
import { getVehicleInfo } from "@/src/redux/action/vehicle";
const index = () => {
  const dispatch = useDispatch();
  const [showAddSection, setShowAddSection] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSalesdata, setSelectedSalesdata] = useState(null);
  const [customerData, setCustomerData] = useState({});
  const [vehicleData, setVehicleData] = useState({});
  const handleOpenAddSection = () => {
    setShowAddSection(!showAddSection);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getSalesDetails(async (res) => {
      if (res && res.data) {
        const sales = res.data;
        setSalesData(sales);
        dispatch(setLoading(false));
        const customerInfoPromises = sales.map(
          (sale) =>
            new Promise((resolve) => {
              getCustomerInfo(sale.customerId, (response) => resolve({ customerId: sale.customerId, data: response.data }));
            })
        );

        const vehicleInfoPromises = sales.map(
          (sale) =>
            new Promise((resolve) => {
              getVehicleInfo(sale.vehicleId, (response) => resolve({ vehicleId: sale.vehicleId, data: response.data }));
            })
        );

        try {
          const customerInfoResponses = await Promise.all(customerInfoPromises);
          const vehicleInfoResponses = await Promise.all(vehicleInfoPromises);

          const customerDataMap = {};
          const vehicleDataMap = {};

          customerInfoResponses.forEach((response) => {
            if (response.data) {
              customerDataMap[response.customerId] = response.data;
            }
          });

          vehicleInfoResponses.forEach((response) => {
            if (response.data) {
              vehicleDataMap[response.vehicleId] = response.data;
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
  }, []);

  const OpenSalesViewModal = (sales) => {
    setSelectedSalesdata(sales);
    setShowViewModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



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
                {salesData.length > 0 ? (
                  salesData.map((sales, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{sales.salesRefID}</td>
                      <td>{formatDate(sales.creationDate)}</td>
                      <td>{vehicleData[sales.vehicleId]?.registerno || "N/A"}</td>
                      <td>{customerData[sales.customerId]?.email || "N/A"}</td>
                      <td>{sales.price}</td>
                      <td>
                        <div
                          className={`Table-status-field ${
                            sales.status === "Sale"
                              ? "Sale-Field"
                              : sales.status === "Buy"
                              ? "Buy-Field":""
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
      <SalesView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        salesDetails={selectedSalesdata}
      />
    </Adminlayout>
  );
};

export default index;
