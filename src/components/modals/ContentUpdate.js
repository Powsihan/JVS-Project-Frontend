import React, { useState } from "react";
import "../../styles/component.css";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import { contentEdit } from "@/src/redux/action/content";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "@/src/redux/reducer/loaderSlice";

const ContentUpdate = (props) => {
  const dispatch = useDispatch();
  const { show, onHide, contentDetails } = props;
  const [contentData, setContentData] = useState({
    status: contentDetails?.status || "InActive",
  });
  const handleChange = (field, value) => {
    setContentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedContentData = {
      ...contentData,
    };

    const contentID = contentDetails && contentDetails._id;

    const changesMade = Object.keys(updatedContentData).some(
      (key) => updatedContentData[key] !== contentDetails[key]
    );

    if (!changesMade) {
      dispatch(setLoading(false));
      toast.info("No changes made");
    } else {
      contentEdit(contentID, updatedContentData, (res) => {
        dispatch(setLoading(false));
        if (res.status === 200) {
          toast.success(res.data.message);
          onHide();
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
          <Modal.Header className="header-outer d-flex justify-content-between">
            <Modal.Title className="Modal-Title">
              Content Status Update
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Content"}
                    defaultValue={contentDetails && contentDetails.content}
                    onChange={(value) => handleChange("content", value)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <InputField
                    label={"Description"}
                    defaultValue={contentDetails && contentDetails.description}
                    onChange={(value) => handleChange("description", value)}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="input-field" className="Text-input-label">
                      Status
                    </label>
                    <div className="d-flex gap-5 pt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="statusActive"
                        value="Active"
                        checked={contentData.status === "Active"}
                        onChange={(e) => handleChange("status", e.target.value)}
                      />
                      <label
                        className="form-check-label Text-input-label"
                        htmlFor="statusActive"
                      >
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="statusInactive"
                        value="InActive"
                        checked={contentData.status === "InActive"}
                        onChange={(e) => handleChange("status", e.target.value)}
                      />
                      <label
                        className="form-check-label Text-input-label"
                        htmlFor="statusInactive"
                      >
                        InActive
                      </label>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
};

export default ContentUpdate;
