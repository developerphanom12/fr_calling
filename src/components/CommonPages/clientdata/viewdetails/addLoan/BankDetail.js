import React from "react";
import styled from "styled-components";

export default function BankDetail() {
  return (
    <Root>
      Bank Deatil
      <div className="table">
        <div>
          <p>Date</p>
        </div>
        <div>
          <p>Bank Name</p>
        </div>
        <div>
          <p>Bank Account</p>
        </div>
        <div>
          <p>Loan Amount</p>
        </div>
        <div>
          <p>Product(home loan,car loan)</p>
        </div>
        <div>
          <p>Gross Payout</p>
        </div>
        <div>
          <p>Net Payout</p>
        </div>
        <div>
          <p>Fees</p>
        </div>
        <div>
          <p>GST(Amount)</p>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  gap: 20px;
  .table{
    display: flex;
    gap: 20px;
    border: 1px solid black;
    padding: 10px;
  }
`;
