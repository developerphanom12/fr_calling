import React from "react";
import axios from "axios";

function Download() {
  const handleDownloadClick = () => {
    
    const excelDownloadUrl =
      "http://localhost:3700/api/admin/getexcelsheetdata";
      
    axios({
      method: "get",
      url: excelDownloadUrl,    
      responseType: "blob", 
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "application_data.xlsx";
        a.click();
        console.log("response.data",response.data)
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };


  return (
    <div>
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  );
}

export default Download;
 

 