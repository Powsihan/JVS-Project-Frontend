import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import InputField from "../InputField";
import { useDispatch } from "react-redux";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { addReview } from "@/src/redux/action/review";
import { toast } from "react-toastify";

const ReviewModal = (props) => {
  const { show, onHide } = props;
  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState({
    review: "",
    status: "",
    ratings: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedReviewData = {
      ...reviewData,
    };

    console.log(updatedReviewData,"dataaaaaaaa");
    addReview(updatedReviewData, (res) => {
      dispatch(setLoading(false));
      if (res.status === 200) {
        toast.success(res.data.message);
        onHide();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleChange = (field, value) => {
    setReviewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Header className="header-outer d-flex justify-content-between">
          <Modal.Title className="Modal-Title">Review and Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row pb-3">
              <InputField
                label={"Review Status"}
                select
                placeholder={"Select the Review Status"}
                onChange={(value) => handleChange("status", value)}
                options={["Excellent", "Good", "Average", "Bad", "Nothing"]}
              />
            </div>
            <div className="row pb-3">
              <div className="form-group">
                <label htmlFor="input-field" className="Text-input-label">
                  Review
                </label>
                <textarea
                  className="form-control"
                  placeholder={"Tell Your Thoughts"}
                  rows={4}
                  onChange={(e) => handleChange("review", e.target.value)}
                />
              </div>
            </div>
            <div className="row pb-3">
              <InputField
                label={"Ratings"}
                select
                placeholder={"Select the Ratings"}
                onChange={(value) => handleChange("ratings", value)}
                options={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ADD Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewModal;
