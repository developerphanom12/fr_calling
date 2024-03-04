import React, { useEffect, useState } from "react";
import ApexChart from "./ApexChart";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import styled from "styled-components";
import cogoToast from "cogo-toast";

const Mainchart = () => {
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
        `${EXACHANGE_URLS_TELLE}/admincheckaalsales?selection=${selection}`,
        axiosConfig
      );
      console.log("resss", res);
      if (res.status === 201) {
        setSalesData(res?.data?.data);
      }
    } catch (err) {
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

  const handleSelectionChange = (e) => {
    const newSelection = e.target.value;
    setSelection(newSelection);
  };

  return (
    <Root>
      <div>
        <div className="delta">
          <div>
            <p>Current Sale</p>
          </div>
          <label htmlFor="periodSelect">Select :</label>
          <select
            id="periodSelect"
            onChange={handleSelectionChange}
            value={selection}
          >
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last28days">Last 28 Days</option>
            <option value="last90days">Last 90 Days</option>

          </select>
        </div>
        <ApexChart key={JSON.stringify(salesData)} data={salesData} />
      </div>
    </Root>
  );
};

export default Mainchart;

const Root = styled.section`
padding: 10px;
    width: 96%;
    height: 100%;
      > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    .delta {
      width: 100%;
      margin-bottom: 35px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 5px;
      > div {
        p {
        font-size: 16px;
        width:100px;
        font-size: 23px;
        }
      }

      label {
        
        font-size: 14px;
    width: 100%;
      }
      select {
        font-family: ui-serif;
    /* font-size: 13px; */
    /* margin: 5px; */
    /* width: 100px; */
    /* font-weight: 400; */
    border: 1px solid dodgerblue;
    border-radius: 6px;
    height: 4vh;
    padding: 2px;
      }
    }
  }
`;
