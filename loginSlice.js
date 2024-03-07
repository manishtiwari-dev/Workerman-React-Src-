import { createSlice } from "@reduxjs/toolkit";




export const loginSlice = createSlice({
  name: "login",
  initialState: {
    apiToken: localStorage.getItem("access_token"),
    role: localStorage.getItem("role"),
    subsId: localStorage.getItem("subsId"),
    perPageValue: localStorage.getItem("perPageValue"),
    profileImg: localStorage.getItem("profileImg"),
    userType: localStorage.getItem("userType"),
    locationData: localStorage.getItem("locationData"),
    currentClockIn:localStorage.getItem("currentClockIn"),
    timezone:localStorage.getItem("timezone"),

    
    permission: localStorage.getItem("permission"),
    name: localStorage.getItem("username"),
    isAuthenticated:
      localStorage.getItem("access_token") !== null ? true : false,
    language:
      localStorage.getItem("language") !== null
        ? localStorage.getItem("language")
        : "en",
    user_id: localStorage.getItem("user_id"),
    language_list: localStorage.getItem("language_list"),
    module_list: localStorage.getItem("module_list"),
    moduleSectionList: localStorage.getItem("ModuleSectionList"),
    quickSectionList: localStorage.getItem("quickSectionList"),
    userInfo: localStorage.getItem("userInfo"),
    settingInfo: localStorage.getItem("settingInfo"),
    settingGrpKeyInfo: localStorage.getItem("settingGrpKeyInfo"),
    superSettingInfo: localStorage.getItem("superSettingInfo"),
    tempSubMenuHold: localStorage.getItem("tempSubMenuHold"),
    industry: localStorage.getItem("industry"),
    themeColor: localStorage.getItem(" themeColor"),
  },
  
  reducers: {
    updateLoginState: (state, action) => {
      const {
        role,
        subsId,
        perPageValue,
        profileImg,
        permission,
        userType,
        locationData,
        currentClockIn,
        timezone,
        themeColor,
        module_list,
        ModuleSectionList,
        quick_list,
        user,
        languageInfo,
        industry,
        settingInfo,
        settingGrpKeyInfo,
      } = action.payload;
      const { id, first_name, last_name } = action.payload.user;
      const apiToken = action.payload.user.api_token;
      state.apiToken = apiToken;
      state.name = first_name + " " + last_name;
      state.role = role;
      state.subsId = subsId;
      state.perPageValue = perPageValue;
      state.profileImg = profileImg;
      state.isAuthenticated = true;
      state.permission = JSON.stringify(permission);
      state.language = "en";
      state.user_id = id;
      state.industry = industry;
      state.userType = userType;
      state.timezone = timezone;

      
      
      state.themeColor =themeColor;
      state.module_list = JSON.stringify(module_list);
      state.moduleSectionList = JSON.stringify(ModuleSectionList);
      state.quickSectionList = JSON.stringify(quick_list);

     // state.industry = JSON.stringify(industry);
     state.locationData = JSON.stringify(locationData);
     state.currentClockIn = JSON.stringify(currentClockIn);

      state.userInfo = JSON.stringify(user);
      state.settingInfo = JSON.stringify(settingInfo);
      state.settingGrpKeyInfo = JSON.stringify(settingGrpKeyInfo);

      
      if (languageInfo !== "") {
        state.language_list = languageInfo?.lang_value;
        state.language = languageInfo?.language?.languages_code;
        localStorage.setItem("language_list", languageInfo?.lang_value);
        localStorage.setItem(
          "language",
          languageInfo?.language?.languages_code
        );
      }

      localStorage.setItem("access_token", apiToken);
      localStorage.setItem("role", role);
      localStorage.setItem("subsId", subsId);
      localStorage.setItem("perPageValue", perPageValue);
      localStorage.setItem("profileImg", profileImg);
      localStorage.setItem("permission", JSON.stringify(permission));
      localStorage.setItem("username", first_name + " " + last_name);
      localStorage.setItem("user_id", id);
      localStorage.setItem("userType", userType);
      localStorage.setItem("timezone", timezone);

      
      localStorage.setItem("module_list", JSON.stringify(module_list));
      localStorage.setItem(
        "ModuleSectionList",
        JSON.stringify(ModuleSectionList)
      );

    
      localStorage.setItem("quickSectionList", JSON.stringify(quick_list));
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("settingInfo", JSON.stringify(settingInfo));
      localStorage.setItem("settingGrpKeyInfo", JSON.stringify(settingGrpKeyInfo));
      localStorage.setItem("locationData", JSON.stringify(locationData));
      localStorage.setItem("currentClockIn", JSON.stringify(currentClockIn));
      localStorage.setItem("industry", industry);
      localStorage.setItem("themeColor", themeColor);


    },
    updateLangState: (state, action) => {
      const { lang, langDetails } = action.payload;
      state.language = lang;
      state.language_list = langDetails;
      localStorage.setItem("language_list", langDetails);
      localStorage.setItem("language", lang);
    },
    updateSuperSettingState: (state, action) => {
      const json = JSON.stringify(action.payload);
      state.superSettingInfo = json;
      localStorage.setItem("superSettingInfo", json);
    },

    // updateCurrentClockInState: (state, action) => {
    //   const json = JSON.stringify(action.payload);
    //   state.currentClockIn = json;
    //   localStorage.setItem("currentClockIn", json);
    // },

    updateModuleListState: (state, action) => {
      const { module_list, quick_list } = action.payload;
      state.module_list = JSON.stringify(module_list);
      state.quickSectionList = JSON.stringify(quick_list);
      localStorage.setItem("module_list", JSON.stringify(module_list));
      localStorage.setItem("quickSectionList", JSON.stringify(quick_list));

    },
    



    logoutState: (state) => {
      state.apiToken = "";
      state.name = "";
      state.role = "";
      state.subsId = "";
      state.perPageValue = "";
      state.profileImg = "";
      state.isAuthenticated = false;
      state.permission = "";
    
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      localStorage.removeItem("subsId");
      localStorage.removeItem("perPageValue");
      localStorage.removeItem("permission");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      localStorage.removeItem("industry");
      localStorage.removeItem("themeColor");
      localStorage.removeItem("profileImg");
      localStorage.clear();
    },


    tempSubMenu: (state, action) => {
      const temp = JSON.stringify(action.payload);
      localStorage.setItem("tempSubMenuHold", temp);
      state.tempSubMenuHold = temp;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateLoginState,
  logoutState,
  updateLangState,
  updateModuleListState,
  tempSubMenu,
  updateSuperSettingState,
} = loginSlice.actions;

export default loginSlice.reducer;
