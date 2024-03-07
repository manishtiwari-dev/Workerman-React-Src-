import React from "react";
// import ReactExport from "react-export-excel";

function ExportExcel({ column, data, filename }) {
  
  return (
    <>
      {/* <ExcelFile
        element={
          <a href="#!">
            <FeatherIcon icon="log-out" fill="#fff" />{" "}
            {Trans("EXP_TO_XL", language)}
          </a>
        }
        filename={filename}
      >
        <ExcelSheet data={data} name={filename}>
          {column &&
            column.map((clm, idx) => {
              return (
                <ExcelColumn key={idx} label={clm.label} value={clm.field} />
              );
            })}
        </ExcelSheet>
      </ExcelFile> */}
    </>
  );
}

export default ExportExcel;
