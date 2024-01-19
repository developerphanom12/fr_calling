import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UserDetails } from "../../../../redux/users/action";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ClientDetail({ detail }) {
  const [addedButton, setAddedButton] = useState(false);
  const [select, setSelect] = useState({
    clientid: "",
    call_status: "",
  });
  console.log("data", select);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDetails = useSelector((state) => state?.users?.appDetails);
  console.log("data12", getDetails);
  const approveApi = async () => {
    if (select.call_status === "blank" || select.call_status === "") {
      cogoToast.warn("Please select status");
    } else {
      try {
        const axiosConfig = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const res = await axios.post(
          `${EXACHANGE_URLS_TELLE}/updatecallstatus`,
          select,
          axiosConfig
        );
        cogoToast.success("Status Submitted");
        navigate("/studash");
        if (res?.status === 200) {
          dispatch(UserDetails(res?.data?.data?.appDetails));
        }
      } catch (error) {
        cogoToast.error("Error");
      }
    }
  };

  const handleSubmit = () => {
    approveApi();
  };
  const isAdded = () => {
    setAddedButton(true);
  };
  return (
    <Root>
      <div className="app_table">
        <div className="app_header">
          <div>Client Name</div>
          <div>Company Name</div>
          <div>DOB Client</div>
          <div>Client Aniversary</div>
          <div>Call Status</div>
          <div>Date</div>
        </div>

        <div className="app_body">
          <div>
            <p>{detail?.client_name}</p>
          </div>
          <div>
            <p>{detail?.company_name}</p>
          </div>
          <div>
            <p>{formatDate(detail?.dob_client)}</p>
          </div>
          <div>
            <p>{detail?.client_anniversary}</p>
          </div>
          <div>
            <p>{detail?.call_status}</p>
            <button onClick={isAdded}>
              <IoMdAdd />
              {addedButton && (
                <div className="status">
                  <select
                    onChange={(e) => {
                      setSelect({
                        ...select,
                        call_status: e.target.value,
                        clientid: getDetails.cd,
                      });
                    }}
                  >
                    <option value="blank">Select Status</option>
                    <option value="hot_lead">Hot Lead</option>
                    <option value="cold_lead">Cold Lead</option>
                    <option value="prospective_client">
                      Prospective client{" "}
                    </option>
                    <option value="ghost_client">Ghost Client </option>
                    <option value="negative_client">Negative Client</option>
                    <option value="close_status">Close Status</option>
                  </select>

                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {" "}
                    Submit
                  </button>
                </div>
              )}
            </button>
          </div>
          <div>
            <p>{formatDate(detail?.updated_at)}</p>
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
    flex: 1;
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
