import React from "react";
import styled from "styled-components";

export const DailyReport = ({ detail }) => {
  return (
    <Root>
      <div className="app_table">
        <div>
          <p className="heading">Daily Report</p>
        </div>
        <div className="app_header">
          <div className="ap1">Client Name </div>
          <div>Company Name</div>
          <div>Call Schedule Date</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        <div className="app_body">
          <div className="btnus">
            <p>dhfbvhsd</p>
          </div>
          <div>
            <p>dhfbvhsd</p>
          </div>
          <div className="btnus">
            <p>dhfbvhsd</p>
          </div>
          <div>
            <p>dhfbvhsd</p>
          </div>
          <div className="btnus">
            <p>dhfbvhsd</p>
          </div>
        </div>

        <div className="btn1">
          <button className="nt2">Next</button>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  display: flex;
  max-width: 100vw;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 230px;
  .app_table {
    border: 3px solid #c2b4ce;
    border-radius: 12px;
    transform: translate(0, -50%);
    padding: 10px;
    max-width: 40vw;
    width: 100%;
    max-height: 40vh;
    height: 100%;
    > div {
      .heading {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 23px;
        margin: 0px;
        padding: 7px;
        margin-bottom: 4px;
        font-weight: 600;
        font-family: fangsong;
      }
    }
  }
  .app_header {
    display: flex;
    background-color: #5d05abb8;
    border: 1px solid #dee2e6;
    > div {
      font-weight: 500;
      display: flex;
      align-items: center;
      border: 1px solid #dee2e6;
      width: 100%;
      max-width: 13vw;
      color: white;
      height: 5vh;
      justify-content: center;
      text-align: center;
      font-size: 12px;
    }
  }

  .app_body {
    display: flex;
    /* gap: 54px; */
    border-radius: 0px;
    height: 6vh;
    > div {
      border: 1px solid #dee2e6;
      width: 15vw;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
    }
    .btnus {
      color: black;
      display: flex;
      background-color: #e7e7e8;
      justify-content: center;
      text-align: center;
      align-items: center;
    }
  }
  .btn1 {
    margin-top: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    .nt2 {
      font-size: 24px;
    width: 101px;
    height: 5vh;
    font-weight: 900;
    padding: 0px;
    color: white;
    border: 1px solid #005aff;
    background: #005aff;
    border-radius: 8px;
    cursor: pointer;
    }
  }
`;
