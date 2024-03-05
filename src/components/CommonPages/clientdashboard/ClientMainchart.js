import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ApexChartClient from "./ApexChartClient";
import { EXACHANGE_URLS_TELLE } from "../../URLS";
import cogoToast from "cogo-toast";

const ClientMainchart = () => {
  const [salesData, setSalesData] = useState([]);
  const [selection, setSelection] = useState("last7days");

  const getHistory = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/checksalebyId?selection=${selection}`,
        axiosConfig
      );
      console.log("resss", res);
      if (res.status === 201) {
        setSalesData(res?.data?.data);
      }
    }catch (err) {
      if (err.response && err.response.status === 404) {
        cogoToast.error(err.response.data.error);
      } else {
        console.log("err", err);
      }
    }
  };

  useEffect(() => {
    getHistory();
  }, [selection]);

  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection);
  };

  return (
    <Root>
      <div>
        <div className="delta">
          <div>
            <p>Current Sale</p>
          </div>
          <label htmlFor="periodSelect">Select Period:</label>
          <select
            id="periodSelect"
            onChange={(e) => handleSelectionChange(e.target.value)}
            value={selection}
          >
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last28days">Last 28 Days</option>
            <option value="last90days">Last 90 Days</option>

          </select>
        </div>
        <ApexChartClient key={JSON.stringify(salesData)} data={salesData} />
      </div>
    </Root>
  );
};

export default ClientMainchart;

const Root = styled.section`
  > div {
    display: flex;
    flex-direction: column;
    .delta {
     
      width: 100%;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 5px;
      > div {
        margin-right: 54px;
         
      }

      label {
        /* justify-content: center; */
      }
      select {
        font-family: ui-serif;
        font-size: 16px;
        margin: 5px;
        width: 26%;
        font-weight: 400;
        border: 1px solid #35fddb;
        border-radius: 6px;
        height: 4vh;
        padding: 4px;
      }
    }
  }
`; 
