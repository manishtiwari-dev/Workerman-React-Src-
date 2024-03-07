import React, { useState } from "react";
import POST from "axios/post";
import { useForm } from "react-hook-form";
import { attendanceClockInUrl } from "config/index";
import { useSelector } from "react-redux";
import { Trans } from "lang";
import {
    LoaderButton,
    FormGroup,
    Row,
    StatusSelect,
    Col,
    Input,
} from "component/UIElement/UIElement";
import { ErrorMessage } from "@hookform/error-message";
import { Alert } from "react-bootstrap";
import Notify from "component/Notify";

const Create = (props) => {
    const { apiToken, language, userType, locationData, currentClockIn, timezone } = useSelector((state) => state.login);
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: "",
    });
    const [formloadingStatus, SetformloadingStatus] = useState(false);
    let currentClockInData ='';
    let location ='';
    if(currentClockIn !== undefined){
      currentClockInData= JSON.parse(currentClockIn);
    } 
    if(location !== undefined){
     location= JSON.parse(locationData);
    }

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();

    const onSubmit = (formData) => {
        SetformloadingStatus(true);
        formData.api_token = apiToken;

        POST(attendanceClockInUrl, formData)
            .then((response) => {
                SetformloadingStatus(false);
                const { status, message,data } = response.data;
                if (status) {
                    setError({
                        status: true,
                        msg: Trans(message, language),
                        type: "success",
                    });
                    props.handleModalClose();
                    props.handleclockClose();
                localStorage.setItem("currentClockIn", JSON.stringify(response.data.data));

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
            .catch((error) => {
                SetformloadingStatus(false);
                setError({
                    status: true,
                    msg: error.message,
                    type: "danger",
                });
            });
    };




    return (
        <>
            {error.status && (
                <Alert
                    variant={error.type}
                    onClose={() => setError({ status: false, msg: "", type: "" })}
                    dismissible
                >
                    {error.msg}
                </Alert>
            )}
            <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                
                <Row>
                <input type="hidden" id="current-latitude" value={location.latitude}
                      {...register("currentLatitude"
                      )}/>
                <input type="hidden" id="current-longitude" value={location.longitude}  {...register("currentLongitude"
                                )}
                   />
                    <Col col={12}>
                        <FormGroup mb="20px">
                            <label>
                                <b>
                                    {Trans("WORKING_FROM")} {" "}
                                </b>
                            </label>
                            <select
                                {...register("working_from"
                                )}
                                id="working_from"
                                className="form-control  ">
                                <option selected disabled value="">Select
                                </option>
                                <option value="Office">Office</option>
                                <option value="Home">Home</option>

                            </select>
                        </FormGroup>
                    </Col>

                    <Col col={4}>
                        <LoaderButton
                            formLoadStatus={formloadingStatus}
                            btnName={Trans("SUBMIT", language)}
                            className="btn btn-sm btn-bg btn-block"
                        />
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default Create;
