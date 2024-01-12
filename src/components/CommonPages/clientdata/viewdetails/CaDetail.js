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

        <div className="app_body">
          <div>
            <p>{detail?.cadetails?.ca_name}</p>
          </div>

          <div>
            <p>{detail?.cadetails?.ca_number}</p>
          </div>

          <div>
            <p>{detail?.cadetails?.ca_accountant_name}</p>
          </div>
          <div>
            <p>{formatDate(detail?.cadetails?.updated_at)}</p>
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
    flex: 1;
    margin-top: 50px;
    justify-content: center;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      flex-direction: column;
      width: 24%;
      text-align: center;
      color: black;
      > div {
        flex: 1;
        padding: 15px;
        border: 1px solid #dee2e6;
        font-size: 17px;
        align-items: center;
        display: flex;
      }
    }
    .app_body {
      display: flex;
      flex-direction: column;
      font-family: "Roboto", sans-serif;

      > div {
        flex: 1;
        display: flex;
        border: 1px solid #dee2e6;
        text-transform: capitalize;
        align-items: center;
        padding: 10px;
        p {
          font-weight: 600;
          font-size: 13px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
      }
    }
  }
`;
