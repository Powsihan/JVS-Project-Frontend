import Navbar from "@/src/layouts/Navbar";
import React from "react";
import Image from "next/image";
import JVS from "../../assets/images/JVS1.png";
import cardemo from "../../assets/images/cardemo.png";
import "../../styles/auction.css";
import carmodel from "../../assets/icons/f7_car-fill.svg";
import automanu from "../../assets/icons/auto-manu.svg";
import currency from "../../assets/icons/cash-coin 1.svg";
import { useRouter } from "next/navigation";


const index = () => {
//   const url = buildUrl('samples/powsi/1_ac11zf', {
//     cloud: {
//       cloudName: 'dkvtkwars',
//     },
//   });
const router=useRouter();
 
  return (
    <>
      <Navbar />
      <div className="row d-flex align-content-center aboutUs justify-content-center min-vh-100 ">
      <div className="image d-flex align-content-center justify-content-center ">
            <Image
              src={JVS}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          </div>
      </div>
      <div className="row container-fluid d-flex align-content-center aboutUs justify-content-center p">
        <h3>Popular vehicles</h3>
      </div>

      <div className="row container-fluid d-flex align-content-center aboutUs justify-content-center pt-3 m-2">
      <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-content-center pt-4 p-4">
            <div
                className="card d-flex align-items-center justify-content-center set-image"
                style={{ width: "20rem",height:"24rem"}}
              >
                <Image src={cardemo} alt="" className="w-100"/>
                <div className=" row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 "><Image src={carmodel} alt=""/>
                  2023 BMW 530 XI</h5>
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-3"><Image src={automanu} alt=""/>
                  Automatic</h5>
                  <div className="justify-content-between d-flex">
                  <h5 className="card-title  d-flex align-items-left justify-content-start gap-2 "><Image src={currency} alt=""/>
                 Current price:</h5>
                 <h6 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 ">
                 Rs.400000</h6>
                 </div>
                  <div className="pt-2 pb-2 d-flex align-items-center justify-content-center">
                  <button className="justify-content-center align-items-center w-100">
                   View details
                   </button>
                   </div>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-content-center pt-4 p-4">
            <div
                className="card d-flex align-items-center justify-content-center set-image"
                style={{ width: "20rem",height:"24rem"}}
              >
                <Image src={cardemo} alt="" className="w-100"/>
                <div className=" row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 "><Image src={carmodel} alt=""/>
                  2023 BMW 530 XI</h5>
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-3"><Image src={automanu} alt=""/>
                  Automatic</h5>
                  <div className="justify-content-between d-flex">
                  <h5 className="card-title  d-flex align-items-left justify-content-start gap-2 "><Image src={currency} alt=""/>
                 Current price:</h5>
                 <h6 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 ">
                 Rs.400000</h6>
                 </div>
                  <div className="pt-2 pb-2 d-flex align-items-center justify-content-center">
                  <button className="justify-content-center align-items-center w-100">
                   View details
                   </button>
                   </div>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-content-center pt-4 p-4">
            <div
                className="card d-flex align-items-center justify-content-center set-image"
                style={{ width: "20rem",height:"24rem"}}
              >
                <Image src={cardemo} alt="" className="w-100" />
                <div className=" row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 "><Image src={carmodel} alt=""/>
                  2023 BMW 530 XI</h5>
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-3"><Image src={automanu} alt=""/>
                  Automatic</h5>
                  <div className="justify-content-between d-flex">
                  <h5 className="card-title  d-flex align-items-left justify-content-start gap-2 "><Image src={currency} alt=""/>
                 Current price:</h5>
                 <h6 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 ">
                 Rs.400000</h6>
                 </div>
                  <div className="pt-2 pb-2 d-flex align-items-center justify-content-center">
                  <button className="justify-content-center align-items-center w-100">
                   View details
                   </button>
                   </div>
                 
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 col-md-6 d-flex align-items-center justify-content-center pt-4 p-4">
            <div
                className="card d-flex align-items-center justify-content-center set-image"
                style={{ width: "20rem",height:"24rem"}}
              >
                <Image src={cardemo} alt="" className="w-100" />
                <div className=" row card-body d-flex align-items-center justify-content-center ">
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 "><Image src={carmodel} alt=""/>
                  2023 BMW 530 XI</h5>
                  <h5 className="card-title ps-3 d-flex align-items-left justify-content-start gap-3"><Image src={automanu} alt=""/>
                  Automatic</h5>
                  <div className="justify-content-between d-flex">
                  <h5 className="card-title  d-flex align-items-left justify-content-start gap-2 "><Image src={currency} alt=""/>
                 Current price:</h5>
                 <h6 className="card-title ps-3 d-flex align-items-left justify-content-start gap-2 ">
                 Rs.400000</h6>
                 </div>
                  <div className="pt-2 pb-2 d-flex align-items-center justify-content-center">
                  <button className="justify-content-center align-items-center w-100" onClick={()=>{router.push('/auction/detail')}}>
                   View details
                   </button>
                   </div>
                 
                </div>
              </div>
            </div>
            
      </div>
                       
      </>

export default index;
