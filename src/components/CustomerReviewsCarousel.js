import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getReviewDetails } from "../redux/action/review";
import "../styles/component.css";
import Image from "next/image";

const CustomerReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewDetails((res) => {
      if (res?.status == 200) {
        setReviews(res?.data);
      }
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="review">
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review._id} className="p-3">
            <div className="card review-card p-3">
              <div className="d-flex flex-column align-items-center gap-2">
                <Image
                  src={review.customerId.profilePic}
                  alt={review.customerId.fname}
                  className="card-img-top rounded-circle mx-auto"
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                />
                <div className="text-capitalize">{review.customerId.fname}</div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{review.status}</h5>
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerReviewsCarousel;
