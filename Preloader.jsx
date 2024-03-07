import React from "react";
import Imgicon from "assets/img/workerMan_icon.gif";

function Preloader() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="d-flex flex-wrap align-items-center m-auto" style={{minHeight:"100vh"}}>
              {/* <div
                className="spinner-border"
                // style={{ height: "3rem", width: "3rem" }}
              > */}
                  <img src={Imgicon} width="100" height="100"  alt=""  className="m-auto" />

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preloader;
