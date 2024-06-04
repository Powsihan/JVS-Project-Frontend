import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useRef, useState } from "react";
import "../../../styles/admin.css";
import InputField from "@/src/components/InputField";
import CommonButton from "@/src/components/CommonButton";
import { Button } from "react-bootstrap";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { useDispatch } from "react-redux";
import {
  addContent,
  deleteContent,
  getContentDetails,
} from "@/src/redux/action/content";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import ContentView from "@/src/components/modals/ContentView";
import ContentUpdate from "@/src/components/modals/ContentUpdate";
import { uploadImage } from "@/src/redux/action/imageUpload";

const index = () => {
  const [contentData, setContentData] = useState({
    content: "",
    description: "",
    image: "",
  });

  const [contentdetailsData, setContentDetailsData] = useState([]);

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [contentPerPage, setcontentPerPage] = useState(10);
  const indexOfLastContent = currentPage * contentPerPage;
  const indexOfFirstContent = indexOfLastContent - contentPerPage;
  const currentContents = contentdetailsData.slice(
    indexOfFirstContent,
    indexOfLastContent
  );

  const [selectedContentdata, setSelectedContentdata] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openDeleteConfirmationModal = (contentID) => {
    setSelectedContentdata(contentID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteContentData = (contentID) => {
    deleteContent(contentID, (res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchContentDetails();
        closeDeleteConfirmationModal();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleChange = (field, value) => {
    setContentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    let data = { ...contentData };

    if (file) {
      const uploadedImageUrl = await dispatch(uploadImage(file));
      if (uploadedImageUrl) {
        data.image = uploadedImageUrl;
      }
    }

    addContent(data, (res) => {
      dispatch(setLoading(false));
      if (res.status === 200) {
        setFile(null);
        toast.success(res.data.message);
        resetForm();
        fetchContentDetails();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const resetForm = () => {
    setContentData({
      content: "",
      description: "",
      image: "",
    });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

 

  const fetchContentDetails = () => {
    dispatch(setLoading(true));
    getContentDetails((res) => {
      if (res && res.data) {
        setContentDetailsData(res.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Content details");
      }
    });
  };

  useEffect(() => {
    fetchContentDetails();
  }, []);


  const OpenContentViewModal = (content) => {
    setSelectedContentdata(content);
    setShowViewModal(true);
  };

  const OpenVehicleEditModal = (content) => {
    setSelectedContentdata(content);
    setShowEditModal(true);
  };


  const handleEditModalClose = (content) => {
    setShowEditModal(false);
    fetchContentDetails();
  };

  return (
    <Adminlayout>
      <div>
        <div className="Filter-Search-Container container-fluid mb-4">
          <h1 className="row ps-2 mb-3">Content Details</h1>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <InputField
                label={"Content"}
                placeholder={"Enter the Content"}
                defaultValue={contentData.content}
                onChange={(value) => handleChange("content", value)}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <InputField
                label={"Description"}
                placeholder={"Enter the Description"}
                defaultValue={contentData.description}
                onChange={(value) => handleChange("description", value)}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  Image
                </label>
                <input
                  className="form-control"
                  placeholder="Choose Profile Picture"
                  type="file"
                  id="profilePicture"
                  ref={fileInputRef}
                  onChange={(e) => {
                    console.log(e);
                    e?.target && setFile(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
            <CommonButton text={"Add"} width={164} onClick={handleSubmit} />
            <Button
              variant="secondary"
              style={{ width: 111 }}
              onClick={resetForm}
            >
              Cancel
            </Button>
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
                  Content
                </th>
                <th scope="col" className="col-3">
                  Description
                </th>
                <th scope="col" className="col-1">
                  Status
                </th>
                <th scope="col" className="col-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentContents.length > 0 ? (
                currentContents.map((content, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{content.content}</td>
                    <td>{content.description}</td>
                    <td>
                      <div
                        className={`Table-status-field ${
                          content.status === "Active"
                            ? "Active-Field"
                            : "InActive-Field"
                        }`}
                      >
                        {content.status}
                      </div>
                    </td>
                    <td className="col-2">
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => OpenContentViewModal(content)}
                      >
                        <VisibilityIcon className="" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => OpenVehicleEditModal(content)}
                      >
                        <EditIcon className="text-success" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="viewbutt"
                        onClick={() => openDeleteConfirmationModal(content._id)}
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
              {Math.ceil(contentdetailsData.length / contentPerPage)}
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
              disabled={indexOfLastContent >= contentdetailsData.length}
              style={{ width: 120 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Content?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleteContentData(selectedContentdata)}
        onCancel={closeDeleteConfirmationModal}
      />
       <ContentView
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        contentDetails={selectedContentdata}
      />
      <ContentUpdate
        show={showEditModal}
        onHide={handleEditModalClose}
        contentDetails={selectedContentdata}
      />
    </Adminlayout>
  );
};

export default index;
