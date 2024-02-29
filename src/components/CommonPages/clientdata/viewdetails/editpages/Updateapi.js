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

export default function UpdateCAForm({ ca_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    ca_name: "",
    ca_number: "",
    ca_accountant_name: "",
    ca_company_name: "",
    ca_accountant_number: "",
    company_address: "",
  });

  const updateCAData = async () => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await axios.put(
        `${EXACHANGE_URLS_TELLE}/updateadetail/${ca_id}`,
        updateData,
        axiosConfig
      );

      if (res?.status === 200) {
        cogoToast.success("CA data updated successfully");
        setUpdateData({
          ca_name: "",
          ca_number: "",
          ca_accountant_name: "",
          ca_company_name: "",
          ca_accountant_number: "",
          company_address: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  return (
    <Root>
      <div className="login-box">
        <div className="cross">
          <button onClick={() => dispatch(closeModal())}><RxCross2 /></button>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="ca_name"
            value={updateData.ca_name}
            onChange={handleInputChange}
            placeholder="Client Name"
          />
        </div>
        <div className="user-box">
          <input
            type="number"
            name="ca_number"
            value={updateData.ca_number}
            onChange={handleInputChange}
            placeholder="Number Add"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            name="ca_accountant_name"
            value={updateData.ca_accountant_name}
            onChange={handleInputChange}
            placeholder="Account Name"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            name="ca_company_name"
            value={updateData.ca_company_name}
            onChange={handleInputChange}
            placeholder="Company Name"
          />
        </div>
        <div className="user-box">
          <input
            type="number"
            name="ca_accountant_number"
            value={updateData.ca_accountant_number}
            onChange={handleInputChange}
            placeholder="Accountant Number"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            name="company_address"
            value={updateData.company_address}
            onChange={handleInputChange}
            placeholder="Company Address"
          />
        </div>
        <div className="datarefresh">
          <button onClick={updateCAData}>Done</button>
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
