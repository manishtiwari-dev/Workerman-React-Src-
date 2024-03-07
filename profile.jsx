import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Anchor } from "component/UIElement/UIElement";
import WebsiteLink from "config/WebsiteLink";
import { deafualtImgPath } from "config/index";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, role,userType, isAuthenticated, user_id ,profileImg} = useSelector(
    (state) => state.login
  );

  /* logout function */
  
  const logoutUser = () => {
   

    if(userType === "subscriber" )
    {
       navigate(`/logout`);

    }
    else{
      navigate(`superadmin/logout`);
    }

   // navigate(`/signout`);

   };

  const [DropShow, SetDropShow] = useState(false);
  const showDropdown = (e) => {
    e.preventDefault();
    SetDropShow(true);
  };


  return (
    <>
      <div className="dropdown dropdown-profile">
        <a
          href={WebsiteLink("/")}
          className="dropdown-link"
          data-toggle="dropdown"
          data-display="static"
          onClick={showDropdown}
          onMouseEnter={showDropdown}
        >
          <div className="avatar avatar-sm">
            <img
              src={
                profileImg
                  ? profileImg
                  : deafualtImgPath
              }
              className="rounded-circle"
              alt=""

              onError={event => {
                event.target.src =deafualtImgPath
                event.onerror = null
              }}
            />
          </div>
        </a>
        {DropShow && (
          <>
            <div
              className="dropdown-menu dropdown-menu-right dropdown-profile-sub tx-13"
              style={{ display: "block" }}
              onMouseLeave={() => {
                SetDropShow(false);
              }}
            >
              <div className="avatar avatar-lg mg-b-15">
                <img
                  src={
                    profileImg
                      ? profileImg
                      : deafualtImgPath
                 //   "https://e-nnovation.net/backend/public/storage/images/profile_avatar.png"
                  }
                  className="rounded-circle"
                  alt=""

                  onError={event => {
                    event.target.src =deafualtImgPath
                    event.onerror = null
                  }}
                />
              </div>

              <h6 className="tx-semibold mg-b-5">
                {name === null || name === "" ? "Guest" : name}
              </h6>
              {/* <p className="mg-b-25 tx-12 tx-color-03">
                {role === null ? "Guest" : role}
              </p> */}
              {isAuthenticated === false ? (
                <Anchor path="/superadmin/login" className="dropdown-item">
                  Sign-in
                </Anchor>
              ) : (
                <>
                  <Anchor
                    path={WebsiteLink(`/user/edit/${user_id}`)}
                    className="dropdown-item"
                  >
                    <FeatherIcon icon="edit-3" fill="white" />
                    Edit Profile
                  </Anchor>

                  <Anchor
                    path={WebsiteLink(`/account-setting`)}
                    className="dropdown-item"
                  >
                    <FeatherIcon icon="edit-3" fill="white" />
                    Account Setting
                  </Anchor>
 
            

                    <button className="dropdown-item" onClick={logoutUser}>
                    <FeatherIcon icon="log-out" fill="white" />
                    Logout
                  </button>  


            
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
