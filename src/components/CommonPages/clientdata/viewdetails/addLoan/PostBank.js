import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../../../URLS";

export default function PostBank() {
  const [loan, setLoan] = useState({
    data_id: "",
    loan_date: "",
    bankname: "",
    loan_amount: "",
    Product: "",
    roi: "",
    gross_payout: "",
    net_payout: "",
    fees: "",
    gst_amount: "",
    bank_amount: "",
  });

  const postBankApi = async () => {
    try {
        const axiosConfig = {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
      const res = await axios.post(`${EXACHANGE_URLS_TELLE}/addloandata`, loan,axiosConfig);
      console.log("resres", res?.data?.data);
      if (res?.status === 201) {
        cogoToast.success("Added Successfully");
      }
    } catch (err) {
      console.log("err", err);
      cogoToast.error("An error occurred ");
    }
  };

  const handleSubmit = () => {
    postBankApi();
  };
  return (
    <Root>
      Add Bank Detail :{loan?.data_id}
      <div>
        <input
          placeholder="Date"
          type="text"
          value={loan?.loan_date}
          onChange={(e) => {
            setLoan({ ...loan, loan_date: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Bank Name"
          type="text"
          value={loan?.bankname}
          onChange={(e) => {
            setLoan({ ...loan, bankname: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Loan Amount"
          type="number"
          value={loan?.loan_amount}
          onChange={(e) => {
            setLoan({ ...loan, loan_amount: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Product(home loan, car loan)"
          type="text"
          value={loan?.Product}
          onChange={(e) => {
            setLoan({ ...loan, Product: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="ROI(Rate of interest)"
          type="text"
          value={loan?.roi}
          onChange={(e) => {
            setLoan({ ...loan, roi: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Gross Payout"
          type="text"
          value={loan?.gross_payout}
          onChange={(e) => {
            setLoan({ ...loan, gross_payout: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Net Payout"
          type="text"
          value={loan?.net_payout}
          onChange={(e) => {
            setLoan({ ...loan, net_payout: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Fees"
          type="text"
          value={loan?.fees}
          onChange={(e) => {
            setLoan({ ...loan, fees: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="GST Amount"
          type="text"
          value={loan?.gst_amount}
          onChange={(e) => {
            setLoan({ ...loan, gst_amount: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          placeholder="Bank Account"
          type="text"
          value={loan?.bank_amount}
          onChange={(e) => {
            setLoan({ ...loan, bank_amount: e.target.value });
          }}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px;
  > div {
    margin: 5px;
    padding: 5px;
    input {
      margin: 5px;
      border: 1px solid gray;
      padding: 10px;
      border-radius: 3px;
    }
    input:focus-visible {
      border: 1px solid gray;
      outline: 2px solid white;
    }
  }
  > div {
    button {
      border: none;
      border-radius: 20px;
      padding: 7px;
      background: #461c6c;
      color: #fff;
    }
  }
`;
