import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DailyReportChart from "./DailyReportChart";
import { EXACHANGE_URLS_TELLE } from "../../URLS";

const DailyReport = () => {
  const [salesData, setSalesData] = useState({
    close_status: 0,
    hot_lead: 0,
    cold_lead: 0,
    totaldata: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await axios.get(
          `${EXACHANGE_URLS_TELLE}/gettelledatadaily`,
          axiosConfig
        );
        if (res.status === 200) {
          const responseData = res.data.data;
          setSalesData(responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Root>
      <div>
        
        <DailyReportChart key={JSON.stringify(salesData)} data={salesData} />
        
      </div>
    </Root>
  );
};

export default DailyReport;

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
    font-size: 11px;
    font-weight: 900;
    margin-left: 17px;
    color: black;
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
