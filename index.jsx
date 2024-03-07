import React, { useState } from "react";
import { Anchor } from "component/UIElement/UIElement";
import Menu from "./component/menu";
import Notification from "layouts/superadminHeader/component/notification";
import ClockSystem from "layouts/superadminHeader/component/clockSystem";
import Messages from "layouts/superadminHeader/component/messages";
import Profile from "layouts/superadminHeader/component/profile";
import { useSelector } from "react-redux";
import WebsiteLogo from "assets/img/Logo.png";
import { ApplicationLogo } from "config/StaticKey";
import { GetKeyValue } from "global/GetKeyValue";
import FeatherIcon from "feather-icons-react";

function Index() {
  const { isAuthenticated, superSettingInfo, module_list } = useSelector(
    (state) => state.login
  );
  // const setList
  const menuList = JSON.parse(module_list);

  // console.log(menuList);

  function sidebarShow() {
    document.body.classList.add("sidebar-show");
    //document.body.setAttribute("id", "sidebarMenu");
  }

  // Function to clear complete cache data
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    alert("Complete Cache Cleared");
  };

  return (
    <React.Fragment>
      <header className="navbar navbar-header navbar-header-fixed">
        <a
          id="mainMenuOpen"
          className="burger-menu"
          onClick={sidebarShow}>
          <FeatherIcon
            icon="menu"
            fill="white"
            //  onClick={sidebarShow}
          />
        </a>
        <div className="navbar-brand">
          <Anchor
            path="/"
            className="df-logo">
            <img
              src={
                GetKeyValue(ApplicationLogo, superSettingInfo)
                  ? GetKeyValue(ApplicationLogo, superSettingInfo)
                  : WebsiteLogo
              }
              height="40"
            />
          </Anchor>
        </div>
        <div
          id="navbarMenu"
          className="navbar-menu-wrapper">
          <div className="navbar-menu-header">
            <a
              href="/"
              id="mainMenuClose">
              <i data-feather="x"></i>
            </a>
          </div>

          <Menu />
        </div>
        <div className=" navbar-right w-50">
          {isAuthenticated && (
            <>
              {/* {menuList &&
                menuList.map((module, idxs) => {
                  const { module_slug, module_id } = module;
                  return (
                    <>
                      {module_slug === "hrm" || module_slug == "hrm" ? (
                        <ClockSystem />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })} */}

              <ClockSystem />
              <Notification />
              <Profile />
            </>
          )}
        </div>
      </header>
    </React.Fragment>
  );
}

export default Index;
