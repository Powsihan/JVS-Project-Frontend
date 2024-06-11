import CommonButton from "@/src/components/CommonButton";
import { aboutuscontent2 } from "@/src/data/content";
import { call, chatmaessage, facebook, mail } from "@/src/utils/ImagesPath";
import Image from "next/image";
import React from "react";
import "../../styles/home.css";
import "../../styles/aboutUs.css";
import "../../app/globals.css";
import Navbar from "@/src/layouts/Navbar";
import Footer from "@/src/layouts/Footer";

const index = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100" id="contactus">
        <div className="row contactUsImage d-lg-block d-none"></div>
        <div className="row d-flex">
          {aboutuscontent2.map((data) => (
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
      <Footer />
    </div>
  );
};

export default index;
