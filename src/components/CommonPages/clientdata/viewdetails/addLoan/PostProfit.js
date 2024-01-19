import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../../../URLS";

export default function PostProfit() {
  const [profit, setProfit] = useState({
    data_id: "",
    profit_details: "",
  });

  const postProfitApi = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/addprofitdata'`,
        profit,
        axiosConfig
      );
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
    postProfitApi();
  };
  return (
    <Root>
      Add Profit Detail
      <div>
        <input placeholder="Profit Details" value={profit?.profit_details} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
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
`;
