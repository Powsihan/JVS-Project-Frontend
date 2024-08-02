import CommonButton from "@/src/components/CommonButton";
import { call, chatmaessage, contactChat, contactCompany, contactExpert, facebook, mail } from "@/src/utils/ImagesPath";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import "../../styles/aboutUs.css";
import "../../app/globals.css";
import Navbar from "@/src/layouts/Navbar";
import Footer from "@/src/layouts/Footer";
import CustomerMessaging from "@/src/components/modals/CustomerMessaging";
import ExpertMessaging from "@/src/components/modals/expertMessagingModal";
import { getLoginCustomerDetail } from "@/src/redux/action/customer";
import { setLoading } from "@/src/redux/reducer/loaderSlice";
import { useDispatch } from "react-redux";
import ChatbotComponent from "@/src/components/Chatbot";
import SignInModal from "@/src/components/modals/SignInModal";

const index = () => {
  const dispatch = useDispatch();
  const [logincustomerData, setLoginCustomerData] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminShow = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);

  const [showExpertModal, setShowExpertModal] = useState(false);

  const handleExpertShow = () => setShowExpertModal(true);
  const handleExpertClose = () => setShowExpertModal(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLoginView, setShowLoginView] = useState(false);

  const LoginViewModal = () => {
    setShowLoginView(true);
  };
  const openChatBox = () => {
    setShowChatbot(!showChatbot);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getLoginCustomerDetail((res) => {
      if (res?.status == 200) {
        setLoginCustomerData(res?.data);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, []);
  const aboutuscontent2 = [
    {
      heading: "Contact With Company",
      content: "Contact with admin clarify any doubts and inquiries ",
      buttonText: "Contact",
      image: contactCompany,
      time: true,
      contact: true,
      onclick: handleAdminShow,
    },
    {
      heading: "Contact With Expert",
      content:
        "Contact vehicle experts to clarify any doubts and inquiries related to vehicles",
      buttonText: "Contact",
      image: contactExpert,
      time: true,
      contact: false,
      onclick: handleExpertShow,
    },
    {
      heading: "Contact With Chat Bot ",
      content:
        "Contact the AI chatbot specialized in vehicles to ask only vehicle-related questions and address any doubts",
      buttonText: "Chat",
      image: contactChat,
      time: false,
      contact: false,
      onclick: openChatBox,
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-100" id="contactus">
        <div className="row contactUsImage d-lg-block d-none"></div>
        <div className="row d-flex">
          {aboutuscontent2?.map((data) => (
            <div className="col-lg-4 col-sm-12 col-md-8 d-flex align-items-center justify-content-center pt-4 p-4">
              <div className="card d-flex align-items-center justify-content-center card-contact">
                <Image src={data?.image} alt="" className="mt-1" />
                <div className="row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-center justify-content-center ">
                    {data?.heading}
                  </h5>
                  <p className="card-text d-flex align-items-center justify-content-center ">
                    {data?.content}
                  </p>
                  {data?.time && (
                    <div className="d-flex justify-content-center align-items-center ps-3">
                      <h6 className="mt-2" style={{ color: "gray" }}>
                        Time : 8 am - 6 pm (Monday-Saturday)
                      </h6>
                    </div>
                  )}
                  {data?.contact && (
                    <div className="d-flex  justify-content-center align-items-center  gap-4">
                      <Image src={facebook} alt="" />
                      <Image src={call} alt="" />
                      <Image src={mail} alt="" />
                    </div>
                  )}
                  <div className="pt-3 d-flex align-items-center justify-content-center">
                    <CommonButton
                      text={data?.buttonText}
                      image={chatmaessage}
                      width={200}
                      onClick={
                        logincustomerData ? data?.onclick : LoginViewModal
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ChatbotComponent">
        <ChatbotComponent
          showChatbot={showChatbot}
          setShowChatbot={setShowChatbot}
        />
      </div>
      <Footer />
      <CustomerMessaging show={showAdminModal} handleClose={handleAdminClose} />
      <ExpertMessaging show={showExpertModal} handleClose={handleExpertClose} />
      <SignInModal
        show={showLoginView}
        onHide={() => setShowLoginView(false)}
      />
    </div>
  );
};

export default index;
