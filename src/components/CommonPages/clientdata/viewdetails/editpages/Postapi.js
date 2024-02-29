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

export default function Postapi({ cd }) {
  console.log("dsdssdsddd:", cd); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    clientid: cd,
    ca_name: "",
    ca_number: "",
    ca_accountant_name: "",
    ca_company_name: "",
    ca_accountant_number: "",
    company_address: "",
  });

  const postApiData = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/cadataAdd`,
        update,
        axiosConfig
      );

      if (res?.status === 201) {
        setUpdate({
          clientid: cd,
          ca_name: "",
          ca_number: "",
          ca_accountant_name: "",
          ca_company_name: "",
          ca_accountant_number: "",
          company_address: "",
        });
        navigate("/studash");
        handleCloseModal();
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        cogoToast.error(err.response.data.error);
      } else {
        console.log("err", err);
      }
    }
  };

  const handleDoneClick = () => {
    postApiData();
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Root>
      <div className="login-box">
        <div className="cross">

        <button onClick={handleCloseModal}><RxCross2 />
</button>
        </div>
        <div className="user-box">
          <input
            type="text"
            value={update?.ca_name}
            onChange={(e) => {
              setUpdate({ ...update, ca_name: e.target.value });
            }}
            placeholder="Client Name"
          />
        </div>
        <div className="user-box">
          <input
            type="number"
            value={update?.ca_number}
            onChange={(e) => {
              setUpdate({ ...update, ca_number: e.target.value });
            }}
            placeholder="number add"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            value={update?.ca_accountant_name}
            onChange={(e) => {
              setUpdate({ ...update, ca_accountant_name: e.target.value });
            }}
            placeholder="account namew"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            value={update?.ca_company_name}
            onChange={(e) => {
              setUpdate({ ...update, ca_company_name: e.target.value });
            }}
            placeholder="company namew"
          />
        </div>

        <div className="user-box">
          <input
            type="number"
            value={update?.ca_accountant_number}
            onChange={(e) => {
              setUpdate({ ...update, ca_accountant_number: e.target.value });
            }}
            placeholder="number namew"
          />
        </div>

        <div className="user-box">
          <input
            type="text"
            value={update?.company_address}
            onChange={(e) => {
              setUpdate({ ...update, company_address: e.target.value });
            }}
            placeholder="number namew"
          />
        </div>
        <div className="datarefresh">
          <button onClick={handleDoneClick}>Done</button>
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
 .login-box{


  .cross{
    display: flex;
    display: flex;
    justify-content: right;
    text-align: center;
    align-items: center;

    button{
      padding: 1px;
    border-radius: 15px;
    font-size: 31px;
    display: flex;
    justify-content: center;
    border: 1px solid #9ceff2;
    background: #9ceff2;
    }
  }
  .datarefresh{
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    button{
      width: 37%;
    padding: 6px;
    font-size: 23px;
    border: 1px solid #00f7ff85;
    border-radius: 17px;
    font-family: initial;
    background: #00f7ff85;
    font-weight: 900;
    }
  }
 }
`;
