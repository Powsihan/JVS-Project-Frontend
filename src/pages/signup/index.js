import Navbar from "@/src/layouts/Navbar";
import { getContentDetails } from "@/src/redux/action/content";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";

const index = () => {
  const [contentimage, setContentImages] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getContentDetails((res) => {
      if (res && res.data) {
        const activeContent = res.data.filter(content => content.status === "Active");
        setContentImages(activeContent);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        toast.error("Error fetching Content details");
      }
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100">
        <div className="row" style={{ paddingTop: "120px" }}>
          <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
            {contentimage.map((content, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={content.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default index;
