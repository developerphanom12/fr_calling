import React from "react";
import styled from "styled-components";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function CaDetail({ detail }) {
  return (
    <Root>
      <div className="app_table">
        <div className="app_header">
          <div>CA Name</div>
          <div>CA PhoneNumber</div>
          <div>CA Accountant Name</div>
          <div>CA Company Name</div>
          <div>Date</div>
        </div>

        <div className="child1">
          <div>
            <p>
              {" "}
              <span>{detail?.cadetails?.ca_name}</span>
            </p>
          </div>

          <div>
            <p>
              {" "}
              <span>{detail?.cadetails?.ca_number}</span>
            </p>
          </div>

          <div>
            <p>
              {" "}
              <span>{detail?.cadetails?.ca_accountant_name}</span>
            </p>
          </div>
          <div>
            <p>
              {" "}
              <span>{formatDate(detail?.cadetails?.updated_at)}</span>
            </p>
          </div>
         
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;

  .app_table {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    height: 45vh;
    margin-top: 50px;
    justify-content: center;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      flex-direction: column;
      width: 24%;
    height: 45vh;
      background-color: #3B71CA;
      text-align: center;
      color: white;
      /* width: 100%;
      height: 5.9vh; */
      border: none;

      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        /* padding: 4px; */
        font-size: 17px;
        align-items: center;
        justify-content: left;
        display: flex;
      }
    }
    .app_body {
      display: flex;
      flex-direction: column;
      font-family: "Roboto", sans-serif;
      .cams {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .iconn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div {
        flex: 1;
        border: 0.3px solid #fbfbfd;
        text-transform: capitalize;
        background-color: #e7e7e8;
        text-align: center;
        padding: 15px 5px;
        .person {
          color: #8995ad;
          font-size: 14px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
        p {
          font-weight: 600;
          text-align: left;
          font-size: small;
          @media (max-width: 789px) {
            font-size: 10px;
          }
          span {
            font-weight: 500;
          }
        }

        &:nth-child(odd) {
          background-color: #e7e7e8;
        }

        &:nth-child(even) {
          background-color: white;
        }
      }
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
  .child1 {
    display: flex;
    flex-direction: column;

    > div {
      flex: 1;
      border: 0.3px solid #fbfbfd;
      text-transform: capitalize;
      background-color: #e7e7e8;
      text-align: center;
      padding: 7px 10px;
      height: 13px;

      .person {
        color: #8995ad;
        font-size: 14px;
        @media (max-width: 789px) {
          font-size: 10px;
        }
      }
      p {
        font-weight: 600;
        text-align: left;
        font-size: small;
        @media (max-width: 789px) {
          font-size: 10px;
        }
        span {
          font-weight: 500;
          color: white;

        }
      }

      &:nth-child(odd) {
        background-color: #3B71CA;
        width: 177px;
        color: white;
      }

      &:nth-child(even) {
        background-color: #3B71CA;
        width: 177px;
        color: white;
      }
    }
    p {
      display: flex;
      font-size: 12px;
      cursor: pointer;
      color: gray;
    }
  }
`;
