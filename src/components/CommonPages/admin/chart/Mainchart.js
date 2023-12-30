// In your React component

import React, { useEffect, useState } from 'react';
import ApexChart from './ApexChart';
import axios from 'axios';
import { EXACHANGE_URLS_TELLE } from '../../../URLS';
import styled from 'styled-components';

const Mainchart = () => {
    const [salesData, setSalesData] = useState([]);
    const getHistory = async () => {
        const axiosConfig = {
          headers: {  
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        try {
          const res = await axios.get(
            `${EXACHANGE_URLS_TELLE}/admincheckaalsales?selection=today`,
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
      }, []);
    console.log("dd",salesData)
    return (
      <Root>

      <div>
          <ApexChart key={JSON.stringify(salesData)} data={salesData} />
      </div>
      </Root>
  );
  
};

export default Mainchart;

const Root = styled.section`
/* background-color: red; */
border: 1px solid none  ;
`
