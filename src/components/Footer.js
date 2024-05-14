import React from "react";

const Footer = () => (
  <footer
    className="page-footer font-small blue "
    style={{ backgroundColor: " #07326C" }}
  >
    <div className="container-fluid text-center text-md-left">
      <div className="row   align-items-center justify-content-around">
        <div className="col-2 " style={{ backgroundColor: " white" }}>
          <h2>400</h2>
        </div>
        <div className="col-10" style={{ backgroundColor: " yellow" }}>
        <h2>400</h2>
        </div>
      </div>
      
    </div>
    <div className="footer-copyright text-center py-3">
      © 2020 Copyright:
      <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>
  </footer>
);

export default Footer;
