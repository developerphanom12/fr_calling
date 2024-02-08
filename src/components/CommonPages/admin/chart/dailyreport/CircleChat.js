import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../../../URLS";
import ApexDaily from "./ApexDaily";

const CircleChat = () => {
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
        
        <ApexDaily key={JSON.stringify(salesData)} data={salesData} />
        
      </div>
    </Root>
  );
};

export default CircleChat;

const Root = styled.section`
 
`;
