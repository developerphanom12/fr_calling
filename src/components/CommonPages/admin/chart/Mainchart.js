import React, { useEffect, useState } from "react";
import ApexChart from "./ApexChart";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import styled from "styled-components";

const Mainchart = () => {
  const [salesData, setSalesData] = useState([]);
  const [selection, setSelection] = useState("today");

  const getHistory = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/admincheckaalsales?selection=${selection}`,
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
        <ApexChart key={JSON.stringify(salesData)} data={salesData} />
      </div>
    </Root>
  );
};

export default Mainchart;

const Root = styled.section`
  > div {
    .delta {
      gap: 4px;
      display: flex;
      justify-content: right;
      align-items: center;
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
