import React from "react";
import styled from "styled-components";
import ApexChart from "./CommonPages/admin/chart/ApexChart";
import ApexChart2 from "./CommonPages/admin/chart/Apexchart2";

export default function Dashboard() {
  return (
    <Root>
      <div className="char1">
        <h1 className="curent">Current Sale</h1>
        <div className="apex">
          <ApexChart />
        </div>
        <p className="price">$37,920</p>
        <p>Current balance this billing cycle</p>
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
  flex-wrap: wrap;

  .char1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 18px;
    padding: 10px;
    margin-top: 50px;
    box-shadow: 2px 6px 15px #888888;
    .curent {
      font-size: 1.125rem;
      font-weight: 600;
      font-family: Roboto, sans-serif;
      letter-spacing: 0;
      color: rgba(61, 78, 101, 0.84);
    }
    border-radius: -1px -1px 0 0;
    .price {
      letter-spacing: 2.1px;
      color: #112b4a;
      text-align: center;
      margin-right: 63px;
    }
    p {
    margin-top: 5px;
    margin-right: 26px;
    text-align: center;
    color: rgba(55, 77, 103, 0.54) !important;
  }
  }

  .char {
    width: 50%;
    margin-left: 23px;
    border: 2px solid blanchedalmond;
    /* box-shadow: 0px 1px 4px 0px; */
    margin-top: 50px;
    box-shadow: 2px 6px 15px #888888;

    /* background-color: green; */
  }

 
`;
