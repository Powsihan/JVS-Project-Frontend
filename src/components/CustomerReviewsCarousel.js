import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getReviewDetails } from "../redux/action/review";
import "../styles/component.css";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

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
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInWeek) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInMonth) {
      const weeks = Math.floor(diffInSeconds / secondsInWeek);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div id="review" className="px-3 mt-5">
      <Slider {...settings}>
        {reviews?.map((review) => (
          <div key={review?._id} className="p-3">
            <div className="card review-card p-3">
              <div className="d-flex flex-column align-items-center gap-2">
                <Image
                  src={review?.customerId.profilePic}
                  alt={review?.customerId.fname}
                  className="card-img-top rounded-circle mx-auto"
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                />
                <div className="text-capitalize review-name">
                  {review?.customerId?.fname}
                </div>
              </div>
              <div className="card-body mt-3">
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

                <p className="card-text mt-2" style={{ textAlign: "justify" }}>
                  {review?.review}
                </p>
                <p style={{fontSize:'13px' , fontWeight:700 , color:'#505050'}}>{timeAgo(review?.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerReviewsCarousel;
