import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ApplicationLogo = `application_logo`;
export const ApplicationTitle = `application_title`;
export const ApplicationDomain = `application_domain`;

export const RoleName = `super_admin`;

export const SetKeyValue = (key) => {
  const { superSettingInfo } = useSelector((state) => state.login);

  if (superSettingInfo === null) return "";
  const res = JSON.parse(superSettingInfo);
  if (res.hasOwnProperty(key)) return res[key]; // if key exist return value

  return "";
};



