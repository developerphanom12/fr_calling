import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ApexChartClient from "./ApexChartClient";
import { EXACHANGE_URLS_TELLE } from "../../URLS";

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
    } catch (e) {
      console.log(e);
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
    margin-top: 63px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .delta {
     
      /* gap: 4px; */
      width: 100%;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      /* height: 67px; */
      border-radius: 5px;
      > div {
        margin-right: 54px;
        p {
          /* margin-right: 12px; */
        }
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
