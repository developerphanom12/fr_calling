import React, { useState } from "react";
import styled from "styled-components";
import ApexChart from "./CommonPages/admin/chart/ApexChart";
import ApexChart2 from "./CommonPages/admin/chart/Apexchart2";

export default function Dashboard() {
  return (
    <Root>

      <div className="char1">
        <h1 className="curent">Current Sale</h1>
        <div className="apex">
        <p className="p111">
          <ApexChart />
          
          </p>

        </div>
        <p className="price">$37,920</p>
        <p>Current balance this billing cycle
</p>
      </div>
      <div className="char">
        <ApexChart2 />
      </div>
    </Root>
  );
}

const Root = styled.section`
display: flex;
margin-top: 12px;
    padding: 16px;

.char1{
  margin-left: 18px;
    width: 33%;
    height: 331px;
    padding: 10px;
    margin-top: 50px;
    box-shadow: 2px 6px 15px #888888;

    /* border: 2px solid blanchedalmond; */
    /* box-shadow: 0px 1px 4px 0px white; */
}

.char{
  width: 60%;
    height: 347px;  
      margin-left: 23px;
    border: 2px solid blanchedalmond;
    /* box-shadow: 0px 1px 4px 0px; */
    margin-top: 50px;
    box-shadow: 2px 6px 15px #888888;

  /* background-color: green; */
}
.curent{
  font-size: 1.125rem;
    font-weight: 600;
    font-family: Roboto,sans-serif;
    letter-spacing: 0;
    color: rgba(61,78,101,.84);}
    border-radius: -1px -1px 0 0;
    .price{
      font-size: 30px;
    letter-spacing: 2.1px;
    color: #112b4a;
    line-height: 2.1875rem;
    text-align: center;
    margin-right: 63px;
    }

    p{
      margin-top: 5px;
    margin-right: 26px;
    text-align: center;
    color: rgba(55,77,103,.54)!important;
}
.p111{
  margin-left: 12px;
}
`;
