import React, { useEffect, useState } from "react";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import styled from "styled-components";
import ApexChart2 from "./Apexchart2";

const Mainchart2 = () => {
  const [salesData, setSalesData] = useState([]);
  const [selection, setSelection] = useState("2023");

  const getDataYearly = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/admincheckaalsales?year=${selection}`,
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
    getDataYearly();
  }, [selection]);

  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection);
  };

  return (
    <Root>
      <div>
        <div className="delta">
          <div>
            <p>Check Sale Yearly</p>
          </div>
          <label htmlFor="periodSelect">Select Period:</label>
          <select
            id="periodSelect"
            onChange={(e) => handleSelectionChange(e.target.value)}
            value={selection}
          >
             <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <ApexChart2 key={JSON.stringify(salesData)} data={salesData} />
      </div>
    </Root>
  );
};

export default Mainchart2;

const Root = styled.section`
  > div {
    display: flex;
    flex-direction: column;
    justify-content: left;
    .delta {
      padding: 10px;
      margin-top: 12px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      label {
        justify-content: center;
        display: flex;
        font-size: 14px;
        margin-left: 123px;
      }
      p {
        margin: 0;
    font-size: 14px;
    width: 100%;
    color: rgba(55, 77, 103, 0.54)!important;
      }
      select {
        font-family: ui-serif;
        font-size: 16px;
        margin: 5px;
        width: 26%;
        font-weight: 400;
        border: 1px solid dodgerblue;
        border-radius: 6px;
        height: 4vh;
        padding: 4px;
      }
    }
  }
`;
