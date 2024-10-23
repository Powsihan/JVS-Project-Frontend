import Adminlayout from "@/src/layouts/Adminlayout";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "@/src/components/modals/ConfirmationModal";
import { toast } from "react-toastify";
import { deleteRecords } from "@/src/redux/action/records";
import "../../../styles/admin.css";
import { deleteReView, getReviewDetails } from "@/src/redux/action/review";
import Image from "next/image";

import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { IconButton } from "@mui/material";

const AdminReviewPage = () => {
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState([]);
  const [selectedReviewData, setSelectedReviewData] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const fetchReviewsDetails = () => {
    getReviewDetails((res) => {
      if (res?.status == 200) {
        setReviewData(res?.data);
      }
    });
  };

  useEffect(() => {
    fetchReviewsDetails();
  }, []);

  const openDeleteConfirmationModal = (recordID) => {
    setSelectedReviewData(recordID);
    setDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleterecordData = (reviewID) => {
    deleteReView(reviewID, (res) => {
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        fetchReviewsDetails();
        closeDeleteConfirmationModal();
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const timeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInSeconds = Math.floor((now - reviewDate) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInWeek) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInMonth) {
      const weeks = Math.floor(diffInSeconds / secondsInWeek);
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Adminlayout>
      <div>
        <div className="d-flex flex-row flex-wrap gap-2">
          {reviewData?.map((review, index) => (
            <div
              style={{ maxWidth: "450px" }}
              className="review-card-wrapper"
              key={index}
            >
              <div className="card review-admin-card p-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      src={review?.customerId.profilePic}
                      alt={review?.customerId.fname}
                      className="card-img-top rounded-circle"
                      style={{ width: "100px", height: "100px" }}
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                    <div className="text-capitalize review-name">
                      {review?.customerId?.fname}
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-column">
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#505050",
                      }}
                    >
                      {timeAgo(review?.createdAt)}
                    </p>
                    <h5 className="card-title primary-color fw-bold">
                      {review?.status}
                    </h5>
                    <div>
                      {Array.from({ length: 5 }).map((_, index) =>
                        index < review.ratings ? (
                          <StarIcon key={index} style={{ color: "#FFD700" }} />
                        ) : (
                          <StarOutlineIcon
                            key={index}
                            style={{ color: "#FFD700" }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-body mt-3">
                  <p
                    className="card-text mt-2"
                    style={{ textAlign: "justify" }}
                  >
                    {review?.review}
                  </p>
                </div>
                <div className="delete-icon-container">
                  <IconButton>
                    <DeleteIcon
                      onClick={() => openDeleteConfirmationModal(review._id)}
                      style={{ cursor: "pointer" }}
                      sx={{ color: "#FF0000", fontSize: "50px" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmationModal
        show={deleteConfirmationModal}
        message="Are you sure you want to delete this Details?"
        heading="Confirmation Delete !"
        variant="danger"
        onConfirm={() => deleterecordData(selectedReviewData)}
        onCancel={closeDeleteConfirmationModal}
      />
    </Adminlayout>
  );
};

export default AdminReviewPage;
