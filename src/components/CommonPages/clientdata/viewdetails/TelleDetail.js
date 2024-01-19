import React from "react";
import styled from "styled-components";

 

export default function TelleDetail({ detail }) {
  return (
    <Root>
      <div className="app_table">
        <div className="app_header">
          <div>Tellecaller Name</div>
          <div>Tellecaller Email</div>
          <div>Tellecaller Role</div>
        </div>

        <div className="app_body">
          <div>
            <p>{detail?.user?.username}</p>
          </div>

          <div>
            <p>{detail?.user?.email}</p>
          </div>

          <div>
            <p>{detail?.user?.role}</p>
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
      text-align: center;
      color: black;
      > div {
        flex: 1;
        padding: 15px;
        border: 1px solid #dee2e6;
        font-size: 14px;
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
        padding: 15px;
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
