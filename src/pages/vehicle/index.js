import Navbar from '@/src/layouts/Navbar'
import React from 'react'
import "../../styles/vehicle.css"
import Image from 'next/image';
import vehicle1 from "../../assets/images/vehicle1.jpeg";
import vehicle2 from "../../assets/images/Home_min_Back.png";
import vehicle3 from "../../assets/images/Login-home-back.png";
import SearchIcon from "@mui/icons-material/Search";
import car from "../../assets/icons/car.svg";
import calender from "../../assets/icons/calender.svg";
import settings from "../../assets/icons/settings.svg";
import fuel from "../../assets/icons/fuel.svg";
import CommonButton from '@/src/components/CommonButton';

const index = () => {
  return (
    <>
      <Navbar />
      {/* <div className="container-fluid Vehicle-Container "> page 1
        <div className='row '>
          <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner d-flex align-items-center ">
              <div class="carousel-item active">
                <Image src={vehicle1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <Image src={vehicle2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <Image src={vehicle3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className='justify-content-center align-items-center d-flex pt-2' >
          <div className='container row pb-3 ' style={{backgroundColor:"#f2f3f3" ,borderRadius: "15px"}}>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Year"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Price Range"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Fuel Type"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className='justify-content-center align-items-center d-flex pt-1'>
          <div className='container row pb-3 '  style={{backgroundColor:"#f2f3f3", borderRadius: "15px"}}>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Colour"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Modal"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 pt-3'>
              <div className="search-input-container" >
                <form>
                  <div className='' >
                    <input
                      className="SearchBox"
                      type="text"
                      placeholder="Brand"
                      value={""} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className='justify-content-center align-item-center d-flex pt-4 Related-Vehicles'><h4>Related Vehicles</h4></div>
        <div className='row'>
          <div className='vehicle-card justify-content-center align-item-center d-flex col-lg-3 col-md-6 col-sm-12 pt-3 gap-3'>
            <div className="card car" >
              <Image src={vehicle1} class="d-block w-100" alt="..." />
              <div className="card-body">
                <div className="d-flex  align-items-center justify-content-between ">
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={car} alt="" /> Pre Owned</h5>
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={calender} alt="" />2000</h5>
                </div>

                <div className="d-flex  align-items-center justify-content-between ">
                  <h6 class="card-text justify-content-around d-flex gap-3"><Image src={settings} alt="" />Automic </h6>
                  <h6 class="card-text justify-content-around d-flex gap-2"><Image src={fuel} alt="" />Petrol </h6>
                </div>
                <h5 className="card-title pb-2">Rs 400,000.00</h5>
                <div className="  d-flex align-items-center justify-content-center "  >
                  <button className='see-more-button d-flex align-items-center justify-content-center w-100' >
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='vehicle-card justify-content-center align-item-center d-flex col-lg-3 col-md-6 col-sm-12 pt-3 gap-3'>
            <div className="card car" >
              <Image src={vehicle1} class="d-block w-100" alt="..." />
              <div className="card-body">
                <div className="d-flex  align-items-center justify-content-between ">
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={car} alt="" /> Pre Owned</h5>
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={calender} alt="" />2000</h5>
                </div>

                <div className="d-flex  align-items-center justify-content-between ">
                  <h6 class="card-text justify-content-around d-flex gap-3"><Image src={settings} alt="" />Automic </h6>
                  <h6 class="card-text justify-content-around d-flex gap-2"><Image src={fuel} alt="" />Petrol </h6>
                </div>
                <h5 className="card-title pb-2">Rs 400,000.00</h5>
                <div className="  d-flex align-items-center justify-content-center "  >
                  <button className='see-more-button d-flex align-items-center justify-content-center w-100' >
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='vehicle-card justify-content-center align-item-center d-flex col-lg-3 col-md-6 col-sm-12 pt-3 gap-3'>
            <div className="card car" >
              <Image src={vehicle1} class="d-block w-100" alt="..." />
              <div className="card-body">
                <div className="d-flex  align-items-center justify-content-between ">
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={car} alt="" /> Pre Owned</h5>
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={calender} alt="" />2000</h5>
                </div>

                <div className="d-flex  align-items-center justify-content-between ">
                  <h6 class="card-text justify-content-around d-flex gap-3"><Image src={settings} alt="" />Automic </h6>
                  <h6 class="card-text justify-content-around d-flex gap-2"><Image src={fuel} alt="" />Petrol </h6>
                </div>
                <h5 className="card-title pb-2">Rs 400,000.00</h5>
                <div className="  d-flex align-items-center justify-content-center "  >
                  <button className='see-more-button d-flex align-items-center justify-content-center w-100' >
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='vehicle-card justify-content-center align-item-center d-flex col-lg-3 col-md-6 col-sm-12 pt-3 gap-3'>
            <div className="card car" >
              <Image src={vehicle1} class="d-block w-100" alt="..." />
              <div className="card-body">
                <div className="d-flex  align-items-center justify-content-between ">
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={car} alt="" /> Pre Owned</h5>
                  <h5 className="card-title justify-content-around d-flex gap-2"><Image src={calender} alt="" />2000</h5>
                </div>

                <div className="d-flex  align-items-center justify-content-between ">
                  <h6 class="card-text justify-content-around d-flex gap-3"><Image src={settings} alt="" />Automic </h6>
                  <h6 class="card-text justify-content-around d-flex gap-2"><Image src={fuel} alt="" />Petrol </h6>
                </div>
                <h5 className="card-title pb-2">Rs 400,000.00</h5>
                <div className="  d-flex align-items-center justify-content-center "  >
                  <button className='see-more-button d-flex align-items-center justify-content-center w-100' >
                    See More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


















      {/* 
<div className='container-fluid d-flex min-vh-100'>
  <div className='col-6 vehicle-details justify-content-center align-items-center d-flex ' style={{marginTop:'50px'}}>
<Image src={vehicle1} alt=''/>
  </div>
  <div className='col-6 ' style={{backgroundColor:"red" }} >
    <div className=''>
      <h3 style={{backgroundColor:"yellow" }}>fscs</h3>
      <h3>fsvs</h3>
    </div>
  </div>
</div> */}



      <div className='container-fluid min-vh-100 d-flex ' style={{ marginTop: '200px',  }} >
        
          <div className='col-6  align-items-center justify-content-center ' >
            <Image src={vehicle1} className="d-block w-100" alt="..." />
          </div>
          <div className='col-6  ' >
            <div className='vehicle-details  justify-content-around  d-flex  '>
              <div className=' justify-content-center  ' >MARUTI BALENO</div>
              <div className='justify-content-center  '>Rs 400,000.00</div>
            </div>
            <div className='row justify-content-center align-items-center pt-2' >
              <div className='col-4 justify-content-center d-flex align-items-center'>acs</div>
              <div className='col-4 justify-content-center d-flex align-items-center'>acs</div>
              <div className='col-4 justify-content-center d-flex align-items-center'>acs</div>
            </div>
            
            {/* <div className='row justify-content-center d-flex align-items-center ' >
            <button className='see-more-button d-flex align-items-center justify-content-center w-100' >
                    See More
                  </button>
            </div> */}
            </div>
       
      </div>












    </>
  )
}

export default index
