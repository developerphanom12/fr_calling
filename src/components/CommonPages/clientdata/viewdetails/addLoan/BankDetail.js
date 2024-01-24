import React from "react";
import styled from "styled-components";





const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function BankDetail({detail}) {
  return (
    <Root>
     <div className="app_table">
        <div className="app_header">
          <div>Loan Date </div>
          <div>Bank Name</div>
          <div>Loan Amount</div>
          <div>Product</div>
          <div>Rate of interest</div>
          <div>Gross Payout</div>
          <div>Total Fees</div>
          <div>GST Amount</div>
          <div>Bank Amount</div>
          <div>Updated Date</div>
        </div>

        <div className="app_body">
          <div>
            <p>{formatDate(detail?.loan?.loan_date)}</p>
          </div>
          <div>
            <p>{detail?.loan?.bankname}</p>
          </div>
          <div>
          <p>{detail?.loan?.loan_amount} RS</p>
          </div>
          <div>
            <p>{detail?.loan?.Product}</p>
          </div>
          <div>
            <p>{detail?.loan?.roi}</p>
            
          </div>
          <div>
            <p>{detail?.loan?.gross_payout} RS</p>
          </div>
          <div>
            <p>{detail?.loan?.fees} RS</p>
          </div>
          <div>
            <p>{detail?.loan?.gst_amount} RS</p>
          </div>
          <div>
            <p>{detail?.loan?.bank_amount} RS</p>
          </div>
          
          <div>
            <p>{formatDate(detail?.loan?.updated_at)}</p>
          </div>
        </div>
      </div>
    </Root>
  );
}


const Root = styled.section`
  display: flex;
  flex-wrap: wrap;

  .app_table {
    display: flex;
    flex-wrap: wrap;
    flex: 5;
    border-radius: 5px;
    margin-top: 5px;
    justify-content: center;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      height: 450px;
      flex-direction: column;
      text-align: center;
      color: black;
      > div {
        flex: 1;
        width: 152px;
        padding: 10px;
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
        width: 152px;
        border: 1px solid #dee2e6;
        text-transform: capitalize;
        align-items: center;
        justify-content: space-around;
        padding: 10px;
        p {
          font-weight: 600;
          font-size: 13px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
      }
      button {
        background-color: #fff;
        border: none;
        svg {
          background-color: #fff;
          color: black;
          width: 20px;
          height: 20px;
        }
      }
      .status {
        display: flex;
        flex-direction: column;
        gap: 5px;
        select,
        button {
          background-color: white;
          color: #623084;
          border: 1px solid #623084;
        }
      }
    }
  }
`;
