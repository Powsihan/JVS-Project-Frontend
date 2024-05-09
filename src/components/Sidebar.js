import React from "react";

const Sidebar = () => {
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 side-bar-body sticky-top mt-2">
      <div class="w-100 align-items-center align-content-center text-center">
        <a href="/" class="text-decoration-none">
          <img
            class="side-bar-logo"
            src="../../../../assets/images/Logo.png"
            loading="lazy"
          />
        </a>
      </div>
      <hr />
      <div class="menu-text d-none d-lg-block">MENU</div>
      <ul class="nav nav-pills flex-column mb-auto mt-4 gap-2">
        <div class="">
          <li class="nav-item">
            <a routerLinkActive="active" class="nav-link" aria-current="page">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  {/* <img class="side-bar-icon" [src]='item.url' loading="lazy" /> */}
                </div>
                <div class="d-none d-lg-block item-lable">powsi</div>
              </div>
            </a>
          </li>
        </div>
      </ul>
      <div class="w-100"></div>

      <div></div>
    </div>
  );
};

export default Sidebar;
