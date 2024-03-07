import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Trans } from "lang/index";
import FeatherIcon from "feather-icons-react";
import POST from "axios/post";
import { Modal } from "react-bootstrap";
import { attendanceClockOutUrl } from "config/index";
import Moment from "react-moment";
import Create from "layouts/superadminHeader/component/clockIn";
import { Button } from "react-bootstrap";
import Notify from "component/Notify";
import { useForm } from "react-hook-form";

function ClockIn() {
  const { apiToken, language, userType, locationData, currentClockIn, timezone } = useSelector((state) => state.login);

  console.log(currentClockIn);

  let currentClockInData = '';
  let location = '';
  if (currentClockIn !== undefined) {
    currentClockInData = JSON.parse(currentClockIn);
  }
  if (location !== undefined) {
    location = JSON.parse(locationData);
  }

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  const [onSelectLoad, SetonSelectLoad] = useState(false);
  const [formloadingStatus, SetformloadingStatus] = useState(false);
  const [clockinVisable, setclockVisible] = useState(true);
  const handleclockClose = () => setclockVisible(false);



  const clockOut = () => {
    SetonSelectLoad(true);
    const formData = {
      api_token: apiToken,
      id: currentClockInData.id,
    };


    POST(attendanceClockOutUrl, formData)
      .then((response) => {
        SetformloadingStatus(false);
        const { status, message, data } = response.data;
        if (status) {
          setError({
            status: true,
            msg: Trans(message, language),
            type: "success",
          });

          localStorage.setItem("currentClockIn", JSON.stringify(''));

          setclockVisible(true);
          console.log(clockinVisable);

          Notify(true, Trans(message, language));
        } else {
          var errObj = {
            status: true,
            msg: "",
            type: "danger",
          };

          if (typeof message === "object") {
            let errMsg = "";
            Object.keys(message).map((key) => {
              console.log(message[key][0]);
              errMsg += Trans(message[key][0], language);
              return errMsg;
            });
            errObj.msg = errMsg;
          } else {
            errObj.msg = Trans(message, language);
          }
          setError(errObj);
        }
      })
    // .catch((error) => {
    //     SetformloadingStatus(false);
    //     setError({
    //         status: true,
    //         msg: error.message,
    //         type: "danger",
    //     });
    // });
  };

  return (

    <>

      <div id="clock" className="d-flex  align-items-center">
        <p
          className="mb-0 text-lg-end text-md-end f-18  pr-2 fw-bold text-dark-grey d-grid align-items-center mt-0">
           {clockinVisable ? '' : <>
         
          {currentClockInData !== null && currentClockInData.clock_out_time === null &&
            (<span className="f-11  text-lightest">
              clockInAt -
              <Moment format="hh:mm:a">
                {currentClockInData?.clock_in_time}
              </Moment>{" "}
            </span>
            )
          }
          </>}
        </p>
        {clockinVisable ? <>
            <a href="#clock-in" id="clockIn" onClick={handleModalShow} className="btn btn-primary btn-bg">
              <FeatherIcon
                icon="log-in"

              />
              Clock In
            </a>
          
           </>

          :
          <>
          
            {currentClockInData !== null && currentClockInData.clock_out_time === null &&
              <a href="#clock" id="clockOut" onClick={clockOut} className="btn btn-primary btn-bg">
                <FeatherIcon
                  icon="log-in"

                />
                Clock Out
              </a>
             } 
          </>}

      </div>

      {/* add modal */}
      <Modal
        show={show}
        onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>{Trans("Clock In", language)}</Modal.Title>
          <Button
            variant="danger"
            onClick={handleModalClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Create
            handleclockClose={handleclockClose}
            handleModalClose={handleModalClose}
          />
        </Modal.Body>
      </Modal>
      {/* end end modal */}

    </>);

}


export default ClockIn;
