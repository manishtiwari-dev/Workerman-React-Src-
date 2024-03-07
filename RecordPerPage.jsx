import React  from "react";
import { useSelector } from "react-redux";


function RecordPerPage({ filterItem, perPageItem }) {
  const { settingGrpKeyInfo, perPageValue } = useSelector((state) => state.login);
  const keyinfo = JSON.parse(settingGrpKeyInfo);
  const searchItem = (value) => {
    filterItem("perpage", value, "")
  }


  let optionValuesAry = '';
  if (keyinfo.setting_options !== '' && keyinfo.setting_options !== null && keyinfo.option_type === 'dropdown') {
    let optionString = keyinfo.setting_options;
    optionValuesAry = optionString.split(',');
  } else {
    optionValuesAry = '';
  }

  return (
    <label htmlFor="perPage">
      {keyinfo.setting_key === "per_page_item" && (
        <React.Fragment>
          <select
            name="perPage"
            id="perPage"
            className="form-control"
            defaultValue={perPageValue}
            onChange={(e) => searchItem(e.target.value)}
          >
            {optionValuesAry.length && optionValuesAry.map((label) => <option value={label} >{label}</option>)}

          </select>
        </React.Fragment>
      )}

    </label>
  )
}

export default RecordPerPage
