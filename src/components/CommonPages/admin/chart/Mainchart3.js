import React, { useEffect, useState } from "react";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import styled from "styled-components";
import ApexChart3 from "./ApexChart3";

const Mainchart3 = () => {
  const [salesData, setSalesData] = useState({});
console.log("dead",salesData)
  const getdata = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/getcallstatus`,
        axiosConfig
      );
      console.log("aasasas", res);
      if (res.status === 201) {
        setSalesData(res?.data?.data);
      }
    } catch (e) {
      console.log(e);   
    }
  };

 useEffect(() =>{
  getdata();
 },[])
 

  return (
    <Root>
      <div>
        
        <ApexChart3 key={JSON.stringify(salesData)} data={salesData} />
        
      </div>
    </Root>
  );
};

export default Mainchart3;

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
    font-size: 17px;
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
