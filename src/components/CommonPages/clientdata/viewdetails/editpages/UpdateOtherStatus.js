import React, { useState } from "react";
import styled from "styled-components";
import { closeModal } from "../../../../../redux/users/action";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../../URLS";
import './post.css'
import { RxCross2 } from "react-icons/rx";

export default function UpdateOtherStatus({ status_id }) {
    console.log("staus",status_id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateDatAgain, setUpdateDatAgain] = useState({
    call_status: "",
   
  });

  const updateCAData = async () => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await axios.put(
        `${EXACHANGE_URLS_TELLE}/datapass/${status_id}`,
        updateDatAgain,
        axiosConfig
      );

      if (res?.status === 200) {
        cogoToast.success("Status updated successfully");
        setUpdateDatAgain({
          call_status: "",
         
        });
        navigate("/studash");
        dispatch(closeModal());
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        cogoToast.error(err.response.data.error);
      } else {
        console.error("Error updating CA data:", err);
        cogoToast.error("Failed to update CA data. Please try again later.");
      }
    }
  };
 


  return (
    <Root>
      <div className="login-box1">
        <div className="cross">
          <button onClick={() => dispatch(closeModal())}>
            <RxCross2 />
          </button>
        </div>
        <div className="user-box1">
          <button>
            <div className="status">
              <select
                onChange={(e) => {
                  setUpdateDatAgain({
                    ...updateDatAgain,
                    call_status: e.target.value,
                  });
                }}
              >
                <option value="blank">Select Status</option>
                <option value="hot_lead">Hot Lead</option>
                <option value="cold_lead">Cold Lead</option>
                <option value="prospective_client">Prospective client </option>
                <option value="ghost_client">Ghost Client </option>
                <option value="negative_client">Negative Client</option>
                <option value="close_status">Close Status</option>
              </select>

              <button
                className="editbutton"
                onClick={updateCAData}
              >
                {" "}
                Submit
              </button>
            </div>
          </button>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box1 {
    width: 26%;
    display: flex;
    height: 32vh;
    flex-direction: column;
    padding: 20px;
    background: #9ceff2;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    .cross {
      display: flex;
      justify-content: right;
      width: 100%;

      button {
        display: flex;
        height: 100%;
        font-size: 32px;
        border-radius: 23px;
        background: #9ceff2;
        border: 1px solid #9ceff2;
        color: black;
      }
    }

    .user-box1 {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: black;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;

      button {
        display: flex;
        justify-content: center;
        width: 100%;
        border: none;
        font-size: 19px;
        background: transparent;
      }
      .status {
        display: flex;
        gap: 11px;
        height: 100%;
        padding: 12px;
        font-size: 15px;
        align-items: center;

        .editbutton {
          font-size: 15px;
          border-radius: 12px;
          background-color:#9d3833;
          padding: 7px;
          font-weight: 900;
          color: white;
        }
        select {
          border-radius: 4px;
          border: none;
          font-weight: 900;
          background-color: #00fff9;
          padding: 9px;
          border-radius: 12px;
        }

        option {
          border-radius: 4px;
          border: none;
          font-weight: 900;
          background-color: #00fff9;
          padding: 9px;
          border-radius: 12px;
        }
      }
    }
  }
`;
