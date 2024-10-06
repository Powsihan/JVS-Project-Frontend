import React, { useEffect, useState } from "react";
import Navbar from "@/src/layouts/Navbar";
import Image from "next/image";
import Footer from "@/src/layouts/Footer";
import CommonButton from "@/src/components/CommonButton";
import { useRouter } from "next/navigation";
import "../../styles/vehicle.css";
import "../../styles/admin.css";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { getRecordsByCustomerId } from "@/src/redux/action/records";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import CustomerMessaging from "@/src/components/modals/CustomerMessaging";

const RecordMainPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState(null);
  const [recordsData, setRecordsData] = useState([]);

  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminShow = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res?.status == 200) {
        setCustomerData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);

  useEffect(() => {
    if (customerData) {
      dispatch(setLoading(true));
      getRecordsByCustomerId(customerData?._id, (res) => {
        if (res?.status === 200) {
          setRecordsData(res?.data);
        }
        dispatch(setLoading(false));
      });
    }
  }, [customerData]);

  return (
    <>
      <Navbar />

      <div
        className="container-fluid min-vh-100 records-section"
        style={{ paddingTop: "120px" }}
      >
        <h2 className="mb-4 ps-5 primary-color fw-bold">Vehicle Records</h2>
        <div className="row ps-5 pe-5 mb-5">
          {recordsData?.length > 0 ? (
            recordsData?.map((vehicle, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={index}>
                  <div className="Vehicle-display-card p-1">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "250px",
                      }}
                    >
                      <Image
                        src={vehicle?.vehicleId?.image[0]}
                        alt={`Vehicle ${index}`}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="d-flex justify-content-between pt-2 align-items-center ps-1 pe-1">
                      <h1>{vehicle?.vehicleId?.name}</h1>
                    </div>
                    <hr />
                    <div className="row mb-2 ps-3 pe-3">
                      <div className="col-9">
                        <CommonButton
                          text={"Show the Records"}
                          width={"100%"}
                          onClick={() => {
                            router.push(`/records/${vehicle?._id}`);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <button
                          className="btn btn-secondary"
                          onClick={handleAdminShow}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="No-result-found">
              <h1>No results found</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <CustomerMessaging show={showAdminModal} handleClose={handleAdminClose} />
    </>
  );
};

export default RecordMainPage;
