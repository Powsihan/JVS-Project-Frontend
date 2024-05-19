import Navbar from "@/src/layouts/Navbar";

import React from "react";
import "../../styles/aboutUs.css";
import Image from "next/image";
import aboutUs from "../../assets/images/aboutUs.png";
import vehicleBuy from "../../assets/images/vehicleBuy.png";
import vehicleRequest from "../../assets/images/vehicleRequest.png";
import vehicleCustomize from "../../assets/images/vehicleCustomize.png";
import vehicleAuction from "../../assets/images/vehicleAuction.png";
import vector from "../../assets/icons/Vector.svg";
import Ratingitem from "../../assets/icons/RatingItem.svg";
import Ratinghalf from "../../assets/icons/Ratinghalf.svg";
import useraccount from "../../assets/images/User Account.png";
import experience from "../../assets/images/experience.png";
import vehicle from "../../assets/images/vehicle1.png";
import branch from "../../assets/images/Company.png";
import contactCompany from "../../assets/images/contactCompany.png";
import facebook from "../../assets/icons/facebook.png";
import call from "../../assets/icons/call.png";
import mail from "../../assets/icons/mail.png";
import chatmaessage from "../../assets/images/Chat Message.png";
import contactExpert from "../../assets/images/contactExperts.png";
import contactChat from "../../assets/images/contactChat.png";
import CommonButton from "@/src/components/CommonButton";
import Footer from "@/src/components/Footer";

const index = () => {
  const data = [
    {
      heading: "Vehicle Buying and Selling",
      content:
        "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
      image: vehicleBuy,
    },
    {
      heading: "Preferred Vehicle Request",
      content:
        "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
      image: vehicleRequest,
    },
    {
      heading: "Vehicle Customization",
      content:
        "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
      image: vehicleCustomize,
    },
    {
      heading: "Vehicle Auctions",
      content:
        "We utilize cutting-edge diagnostics and techniques to ensure optimal condition.Elevate car's electrical system to peak performance with our specialized expertise.",
      image: vehicleAuction,
    },
  ];
  const data2 = [
    {
      heading: "Contact With Company",
      content: "Contact with admin clarify any doubts and inquiries ",
      buttonText: "Contact",
      image: contactCompany,
      time: true,
      contact: true,
    },
    {
      heading: "Contact With Expert",
      content:
        "Contact vehicle experts to clarify any doubts and inquiries related to vehicles",
      buttonText: "Contact",
      image: contactExpert,
      time: true,
      contact: false,
    },
    {
      heading: "Contact With Chat Bot ",
      content:
        "Contact the AI chatbot specialized in vehicles to ask only vehicle-related questions and address any doubts",
      buttonText: "Chat",
      image: contactChat,
      time: false,
      contact: false,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
            <Image
              src={aboutUs}
              alt=""
              // style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex flex-column justify-content-center aboutUs-heading">
            <h1>Who we are</h1>
            <h4>We Have 10 Years Of Experience In This Field</h4>
            <p className=" justify-content-center align-content-center pt-2">
              At JAFFNA Vehicle Spot (PVT) LTD, we are more than just a vehicle
              buying and selling company – we are your trusted automotive
              partner. With Three strategically located branches across Sri
              Lanka, we have established ourselves as a beacon of reliability
              and professionalism in the industry. As we embark on our digital
              journey, our primary goal remains unchanged: to expand our reach,
              broaden our customer base, and reinforce our position as a leading
              name in vehicle sales and services. With a commitment to
              excellence and a passion for customer satisfaction, we strive to
              exceed expectations at every turn. Trust Jaffna Vehicle Spot (PVT)
              LTD to navigate your automotive needs with expertise and integrity
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center  about-who-we-are">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>WHY CHOOSE US</h2>
          <h4>
            Trust us to keep your automobile running smoothly and reliably.
          </h4>
        </div>
        <div className="row pt-5 d-flex">
          {data.map((data, index) => (
            <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-items-center mb-5">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={data.image} alt="" />
                </div>
                <div className="justify-content-center align-items-center pt-3 d-flex">
                  <h5>{data.heading}</h5>
                </div>
                <div className="pt-4 d-flex justify-content-center align-items-center ps-5 pe-5">
                  <p>{data.content}</p>
                </div>
                <div className="justify-content-center align-items-center d-flex">
                  <CommonButton text={"Go Visit"} image={vector} width={200} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center ">
        <div
          className="row d-flex align-items-center justify-content-center experience"
          style={{ backgroundColor: "var(--primary-color) " }}
        >
          <div className="justify-content-center align-content-center d-flex pt-5">
            <h1>OUR EXPERIENCES</h1>
          </div>
          <div className="justify-content-center align-content-center d-flex">
            <h5>
              Our dedicated team of skilled technicians and mechanics takes
              pride in delivering top-tier servicing for your beloved vehicle
            </h5>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h6>Rating</h6>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Image src={Ratingitem} alt="" />
              <Image src={Ratingitem} alt="" />
              <Image src={Ratingitem} alt="" />
              <Image src={Ratinghalf} alt="" />
            </div>
          </div>
          <div className="row mt-5  d-flex">
            <div className=" col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={useraccount} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Customer</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={vehicle} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Vehicles</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={branch} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>branches</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <Image src={experience} alt="" />
                </div>
                <div className="d-flex pt-2 justify-content-center align-items-center">
                  <h4>Experiences</h4>
                </div>
                <div className="d-flex  justify-content-center align-items-center count">
                  <h2>546</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center  ">
        <div className="row mt-3  d-flex ">
          <div className="justify-content-center align-content-center d-flex pt-5">
            <h1>OUR EMPLOYEES</h1>
          </div>
          <div className="justify-content-center align-content-center d-flex">
            <h5>Meet with our valuable Employees</h5>
          </div>
        </div>
      </div>

      <div className="container-fluid min-vh-100">
        <div className="row contactUsImage d-lg-block d-none"></div>
        <div className="row d-flex">
          {data2.map((data) => (
            <div className="col-lg-4 col-sm-12 col-md-8 d-flex align-items-center justify-content-center pt-4 p-4">
              <div className="card d-flex align-items-center justify-content-center card-contact">
                <Image src={data.image} alt="" className="mt-1" />
                <div className="row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-center justify-content-center ">
                    {data.heading}
                  </h5>
                  <p className="card-text d-flex align-items-center justify-content-center ">
                    {data.content}
                  </p>
                  {data.time && (
                    <div className="d-flex justify-content-center align-items-center ps-3">
                      <h6 className="mt-2" style={{ color: "gray" }}>
                        Time : 8 am - 6 pm (Monday-Saturday)
                      </h6>
                    </div>
                  )}
                  {data.contact && (
                    <div className="d-flex  justify-content-center align-items-center  gap-4">
                      <Image src={facebook} alt="" />
                      <Image src={call} alt="" />
                      <Image src={mail} alt="" />
                    </div>
                  )}
                  <div className="pt-3 d-flex align-items-center justify-content-center">
                    <CommonButton
                      text={data.buttonText}
                      image={chatmaessage}
                      width={200}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default index;
