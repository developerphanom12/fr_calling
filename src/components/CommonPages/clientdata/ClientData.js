import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../URLS";

export default function ClientData() {
  const [formData, setFormData] = useState({
    client_name: "",
    company_name: "",
    dob_client: "",
    client_anniversary: "",
    call_schedule_date: "",
    client_companyaddress:"",
    client_phonenumber:"",
    client_email:"",
    remark:"",
    attach_file:null,
    call_status: "",
  });
  const [add, setAdd] = useState({
    ca_name: "",
    ca_number: "",
    ca_accountant_name: "",
    ca_company_name: "",
    ca_accountant_number: "",
    company_address:"",
  });

  const navigate = useNavigate();
  const registerApi = async () => {
    const data = new FormData();
    data.append("client_name", formData.client_name);
    data.append("client_email", formData.client_email);
    data.append("client_phonenumber", formData.client_phonenumber);
    data.append("client_companyaddress", formData.client_companyaddress);
    data.append("company_name", formData.company_name);
    data.append("remark", formData.remark);
    data.append("dob_client", formData.dob_client);
    data.append("client_anniversary", formData.client_anniversary);
    data.append("call_schedule_date", formData.call_schedule_date);
    data.append("call_status", formData.call_status);
  
    if (
      add.ca_name ||
      add.ca_number ||
      add.ca_accountant_name ||
      add.ca_company_name ||
      add.ca_accountant_number ||
      add.company_address
    ) {
      Object.keys(add).forEach((key) => {
        if (add[key]) {
          data.append(`ca_data[${key}]`, add[key]);
        }
      });
    }
  
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/addclientdata`,
        data,
        axiosConfig
      );
  
      if (res?.status === 200) {
        cogoToast.success("Registered Successfully");
        setFormData({
          client_name: "",
          company_name: "",
          dob_client: "",
          client_anniversary: "",
          call_schedule_date: "",
          call_status: "",
          attach_file: null,
          remark: "",
        });
        setAdd({
          ca_name: "",
          ca_number: "",
          ca_accountant_name: "",
          ca_company_name: "",
          ca_accountant_number: "",
          company_address: "",
        });
        navigate("/history");
      }
    } catch (err) {
      console.error("Error:", err);
      cogoToast.error("Registration Failed");
    }
  };
  
  const handleRegisterClick = () => {
    registerApi();
  };

  return (
    <Root>
      <h4>Your Client Data :-</h4>
      <div className="first_box1">
        <div className="name">
          {" "}
          Client Name
          <input
            type="name"
            value={formData?.client_name}
            onChange={(e) => {
              setFormData({ ...formData, client_name: e.target.value });
            }}
            placeholder="Client Name"
          />
        </div>
        <div className="name">
          {" "}
          Client Email
          <input
            type="email"
            value={formData?.client_email}
            onChange={(e) => {
              setFormData({ ...formData, client_email: e.target.value });
            }}
            placeholder="Email"
          />
        </div>
        <div className="name">
          {" "}
          Client Number
          <input
            type="email"
            value={formData?.client_phonenumber}
            onChange={(e) => {
              setFormData({ ...formData, client_phonenumber: e.target.value });
            }}
            placeholder="Number"
          />
        </div>
        <div className="name">
          {" "}
          Company name
          <input
            type="name"
            value={formData?.company_name}
            onChange={(e) => {
              setFormData({ ...formData, company_name: e.target.value });
            }}
            placeholder="Company Name"
          />
        </div>
        <div className="name">
          {" "}
          Company Address
          <input
            type="name"
            value={formData?.client_companyaddress}
            onChange={(e) => {
              setFormData({ ...formData, client_companyaddress: e.target.value });
            }}
            placeholder="Company Address"
          />
        </div>

        <div className="name">
          Dob CLient
          <input
            type="date"
            pattern="\d{2}/\d{2}/\d{4}"
            value={formData?.dob_client}
            onChange={(e) => {
              setFormData({ ...formData, dob_client: e.target.value });
            }}
            placeholder="Dob Client"
          />
        </div>
        <div className="name">
          Client Aniversary (optional)
          <input
            type="date"
            pattern="\d{2}/\d{2}/\d{4}"
            value={formData?.client_anniversary}
            onChange={(e) => {
              setFormData({
                ...formData,
                client_anniversary: e.target.value,
              });
            }}
            placeholder="(Optional)"
          />
        </div>
        <div className="name">
          Call Schedule
          <input
            type="date"
            pattern="\d{2}/\d{2}/\d{4}"
            value={formData?.call_schedule_date}
            onChange={(e) => {
              setFormData({
                ...formData,
                call_schedule_date: e.target.value,
              });
            }}
            placeholder="Call Schedule on which date"
          />
        </div>
        <div className="name">
          Call Status
          <select
            onChange={(e) => {
              setFormData({ ...formData, call_status: e.target.value });
            }}
          >
            <option value="">Please Select</option>
            <option value="cold_lead">cold_lead</option>
            <option value="hot_lead">hot_lead</option>
          </select>
        </div>
        <div className="name">
          {" "}
           Remark  
          <input
            type="name"
            value={formData?.remark}
            onChange={(e) => {
              setFormData({ ...formData, remark: e.target.value });
            }}
            placeholder="Remark  "
          />
        </div>
      </div>
      <h4> Your CA Details :-</h4>{" "}
      <div className="second_div">
        <div className="name">
          CA Name
          <input
            value={add?.ca_name}
            onChange={(e) => {
              setAdd({ ...add, ca_name: e.target.value });
            }}
            placeholder=" Chartered accountant Name"
          />
        </div>
        <div className="name">
          CA Number
          <input
            type="number"
            value={add?.ca_number}
            onChange={(e) => {
              setAdd({ ...add, ca_number: e.target.value });
            }}
            placeholder="CA Number"
          />
        </div>
        <div className="name">
          CA Company Name
          <input
            value={add?.ca_company_name}
            onChange={(e) => {
              setAdd({ ...add, ca_company_name: e.target.value });
            }}
            placeholder=" Chartered accountant Company Name"
          />
        </div>
        <div className="name">
        CA Address
          <input
            value={add?.company_address}
            onChange={(e) => {
              setAdd({ ...add, company_address: e.target.value });
            }}
            placeholder="CA Address"
          />
        </div>
        <div className="name">
          Accountant Name
          <input
            value={add?.ca_accountant_name}
            onChange={(e) => {
              setAdd({ ...add, ca_accountant_name: e.target.value });
            }}
            placeholder="CA Accountant Name"
          />
        </div>
        <div className="name">
          Accountant Number
          <input
            type="number"
            value={add.ca_accountant_number}
            onChange={(e) => {
              setAdd({ ...add, ca_accountant_number: e.target.value });
            }}
            placeholder="Accountant Number"
          />
        </div>
        <div className="name">
          Attach Any File
          <input
              type="file"
              // onChange={handleImage}
            />
        </div>
      </div>
      <div className="regis">
        <button
          className="btnn"
          onClick={() => {
            handleRegisterClick();
          }}
        >
          Submit
        </button>
      </div>
    </Root>
  );
}
const Root = styled.section`
  font-family: 20px "Roboto", sans-serif;
  margin: 0px;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    color: #461c6c;
    margin: 10px 0px;
    padding: 5px;
  }

  .first_box1 {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    box-shadow: 1px 1px 5px 1px gray;
    border-radius: 10px;

    .name {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      width: 24%;
      padding: 5px;
      color: black;
      input {
        border-radius: 10px;
        padding: 5px;
        color: #202020;
        width: 90%;
        margin: 10px 0px;
        text-decoration: none;
        border: 1px solid #623084;
        @media (max-width: 600px) {
          width: 100%;
        }
      }
      @media (max-width: 900px) {
        width: 90%;
      }

      select {
        background-color: white;
        color: gray;
        text-decoration: none;
        border: 1px solid #623084;
        line-height: 1.5em;
        width: 93%;
        padding: 3px;
        margin: 10px 0px;
        border-radius: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, #1e0945 50%),
          linear-gradient(135deg, #1e0945 50%, transparent 50%),
          linear-gradient(to right, #63276f, #f064e7, #a74fad);
        background-position: calc(100% - 20px) calc(1em + 2px),
          calc(100% - 15px) calc(1em + 2px), 100% 0;
        background-size: 5px 5px, 5px 5px, 40px 45px;
        background-repeat: no-repeat;
        @media (max-width: 555px) {
          padding: 8px;
          background-size: 5px 5px, 5px 5px, 30px 45px;
          align-items: center;
        }
      }

      input:focus,
      input:active {
        border-color: #ff6525;
      }
    }
  }

  .second_div {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    box-shadow: 1px 1px 5px 1px gray;
    border-radius: 10px;

    .name {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      width: 24%;
      padding: 5px;
      color: black;
      input {
        border-radius: 10px;
        padding: 5px;
        color: #202020;
        width: 90%;
        margin: 10px 0px;
        text-decoration: none;
        border: 1px solid #623084;
        @media (max-width: 900px) {
          width: 100%;
        }
      }

      input:focus,
      input:active {
        border-color: #ff6525;
      }
      input[type="file"]::file-selector-button {
        background-color: #623084;
        border: 1px solid #3a1864;
        padding: 0.2em 0.4em;
        border-radius: 0.4em;
        transition: 1s;
        color: #fff;
        cursor: pointer;
        margin-left: 10px;
      }

      input[type="file"]::file-selector-button:hover {
        border: 1px solid #119af6;
        background-color: #62bdfa;
      }
      .imgg {
        text-align: center;
        position: relative;
        cursor: pointer;
        width: 40px;
        height: 40px;
        &:hover {
          opacity: 0.5;
        }
        .inside_img {
          width: 60px;
          object-fit: contain;
        }
        input {
          position: absolute;
          height: 100%;
          width: 100%;
          opacity: 0;
        }
      }
      @media (max-width: 900px) {
        width: 90%;
      }
    }
  }
  .regis {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .btnn {
      padding: 10px;
      border-radius: 50px;
      font-size: small;
      border: none;
      width: 200px;
      font-size: medium;
      color: #ffffff;
      margin-right: 108px;
      background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
      background-size: 300% 100%;
      transition: all 0.3s ease-in-out 0s;
      text-transform: uppercase;
      &:hover {
        box-shadow: 1px 1px 5px 1px gray;
        transition: all 0.2s ease-in-out 0s;
        background: linear-gradient(
          -25deg,
          #3a1864 20%,
          #461c6c 49%,
          #471f75 100%
        );
      }
    }
  }
`;
