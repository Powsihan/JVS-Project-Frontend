import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "../InputField";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/component.css";
import { IconButton } from "@mui/material";

const ContentView = (props) => {
  const { show, onHide, contentDetails } = props;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#17B530 ";
      default:
        return "#F73B3B";
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
        <Modal.Header className="header-outer d-flex justify-content-between">
          <Modal.Title className="Modal-Title">
            Content Details View
          </Modal.Title>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div className="fw-bold" style={{ color: "var(--primary-color)" }}>
              {contentDetails?.status}
            </div>
            <IconButton>
              <CircleIcon
                sx={{
                  color: getStatusColor(contentDetails?.status),
                }}
              />
            </IconButton>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={contentDetails?.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <InputField
                  label={"Content"}
                  defaultValue={contentDetails?.content}
                  disable
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <InputField
                  label={"Description"}
                  defaultValue={contentDetails?.description}
                  disable
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContentView;
