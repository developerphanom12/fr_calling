import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../URLS";

export default function UniRegister() {
  const [universityImagePreview, setUniversityImagePreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");

  const [formData, setFormData] = useState({
    client_name: "",
    company_name: "",
    gst_no: "",
    dob_client: "",
    client_anniversary: "",
    call_schedule_date: "",
    call_status: "",
    call_status: "",
    attach_file: "",
   
  });

  const [add, setAdd] = useState({
    ca_name: "",
    ca_number: "",
    ca_accountant_name: "",
    ca_company_name: "",
    ca_accountant_number: "",
  });

  const navigate = useNavigate();

  const handleUniversityImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, attach_file: file });
      setUniversityImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, attach_file: "" });
      setUniversityImagePreview("");
    }
  };


  const registerApi = async () => {
    const data = new FormData();
    data.append("client_name", formData.client_name);
    data.append("company_name", formData.company_name);
    data.append("gst_no", formData.gst_no);
    data.append("dob_client", formData.dob_client);
    data.append("client_anniversary", formData.client_anniversary);
    data.append("call_schedule_date", formData.call_schedule_date);
    data.append("call_status", formData.call_status);
    data.append("attach_file", formData.attach_file);
    

    // Append address fields
    Object.keys(add).forEach((key) => {
      data.append(`ca_data[${key}]`, add[key]);
    });

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/addclientdata`,
        data,axiosConfig
      );

      if (res?.status === 200) {
        cogoToast.success("Registered Successfully");
        // Reset form data and navigate to login page
        setFormData({
          client_name: "",
          company_name: "",
          gst_no: "",
          dob_client: "",
          client_anniversary: "",
          call_schedule_date: "",
          call_status: "",
          call_status: "",
          attach_file: "",
        });
        setAdd({
          ca_name: "",
          ca_number: "",
          ca_accountant_name: "",
          ca_company_name: "",
          ca_accountant_number: "",
        });
        setUniversityImagePreview("");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error:", err);
      cogoToast.error("Registration Failed");
    }
  };
  const selectContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    padding: "10px",
    borderRadius: "10px",
    margin: "10px",
    border: "2px dashed #555",
    color: "#444",
    cursor: "pointer",
    transition: "background .2s ease-in-out, border .2s ease-in-out",
  };

  const handleRegisterClick = () => {
    registerApi();
  };
  return (
    <Root>
      <div className="first_div">
        <h2>Client Data</h2>

        <div className="first_box1">
          <div>
            <h4>Your Client Details :-</h4>
          </div>

          <div>
            <div className="name">
              {" "}
              University Name
              <input
                type="name"
                value={formData?.client_name}
                onChange={(e) => {
                  setFormData({ ...formData, client_name: e.target.value });
                }}
                placeholder="University Name"
              />
            </div>
            <div className="name">
              {" "}
              company_name
                            <input
                type="name"
                value={formData?.company_name}
                onChange={(e) => {
                  setFormData({ ...formData, company_name: e.target.value });
                }}
                placeholder="Ambassador Name"
              />
            </div>
            <div className="name">
              GST NO
              <input
                type="name"
                value={formData?.gst_no}
                onChange={(e) => {
                  setFormData({ ...formData, gst_no: e.target.value });
                }}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div>
            <div className="nameyy">
              Email
              <input
                type="date"
                pattern="\d{2}/\d{2}/\d{4}"
                value={formData?.dob_client}
                onChange={(e) => {
                  setFormData({ ...formData, dob_client: e.target.value });
                }}
                placeholder="ex-phanom@gmail.com"
              />
            </div>
            <div className="nameyy">
              User Name
              <input
                 type="date"
                 pattern="\d{2}/\d{2}/\d{4}"
                value={formData?.client_anniversary}
                onChange={(e) => {
                  setFormData({ ...formData, client_anniversary: e.target.value });
                }}
                placeholder="User Name"
              />
            </div>
            <div className="nameyy">
              Year Established
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
                placeholder="Established in Year"
              />
            </div>
             <div>
        <div className="nameyy">
          Type Of University
          <select
            onChange={(e) => {
              setFormData({ ...formData, call_status: e.target.value });
            }}
          >
            <option value="">Please Select</option>
            <option value="cold_lead">cold_lead</option>
            <option value="government">hot_lead</option>
          </select>
        </div>
       
      </div>
          </div>
        </div>
      </div>
      <div className="second_div">
        <div className="company">
          <div>
            {" "}
            <h4> Your CA Details :-</h4>
          </div>

          <div>
            {" "}
            <div className="name">
              ca name
              <input
                value={add?.ca_name}
                onChange={(e) => {
                  setAdd({ ...add, ca_name: e.target.value });
                }}
                placeholder="Street Address"
              />
            </div>
            <div className="name">
              City
              <input
              type="number"
                value={add?.ca_number}
                onChange={(e) => {
                  setAdd({ ...add, ca_number: e.target.value });
                }}
                placeholder="City"
              />
            </div>
            <div className="name">
              State
              <input
                value={add?.ca_accountant_name}
                onChange={(e) => {
                  setAdd({ ...add, ca_accountant_name: e.target.value });
                }}
                placeholder="State"
              />
            </div>
          </div>
          <div>
            <div className="nameyy">
              Country
              <input
                value={add?.ca_company_name}
                onChange={(e) => {
                  setAdd({ ...add, ca_company_name: e.target.value });
                }}
                placeholder="Country"
              />
            </div>
            <div className="nameyy">
              Postal Code
              <input
              type="number"
                value={add.ca_accountant_number}
                onChange={(e) => {
                  setAdd({ ...add, ca_accountant_number: e.target.value });
                }}
                placeholder="Postal Code"
              />
            </div>
          </div>
          <div>
            <div className="nameyyy">
              Upload University Image
              <div className="imgg" style={selectContainerStyle}>
                Click Here
                <img
                  src={
                    universityImagePreview ||
                    "https://www.crizac.co.uk/catalog/assets/images/upload_icon.svg"
                  }
                  alt="Upload"
                  className="inside_img"
                />
                <input type="file" onChange={handleUniversityImagePreview} />
              </div>
            </div>
          
          </div>
        </div>
        

          
          
        <div className="regis">
          <button
            className="btnn"
            onClick={() => {
              handleRegisterClick();
            }}
          >
            Register
          </button>
        </div>
      
      </div>
    </Root>
  );
}
const Root = styled.section`
  font-family: 20px "Roboto", sans-serif;
  margin: 80px 0px 0px 80px;
  max-width: 100vw;
  width: 100%;

  .flex-container {
    display: flex;
    flex-wrap: wrap;
  }

  h4 {
    color: #0e4d92;
    margin: 0;
  }
  .nameyy {
    display: flex;
    flex-direction: column;
    font-size: small;
    width: 32.5%;
    margin-right: 10px;
    color: black;
    input {
      border-radius: 10px;
      padding: 5px;
      color: #202020;
      width: 90%;
      text-decoration: none;
      border: 2px solid #a5d8fa;
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
      border: 2px solid #a5d8fa;
      line-height: 1.5em;
      width: 90%;
      padding: 6px;
      border-radius: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, blue 50%),
        linear-gradient(135deg, blue 50%, transparent 50%),
        linear-gradient(to right, skyblue, skyblue);
      background-position: calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px), 100% 0;
      background-size: 5px 5px, 5px 5px, 40px 45px;
      background-repeat: no-repeat;
      @media (max-width: 555px) {
        padding: 8px;
        background-size: 5px 5px, 5px 5px, 30px 45px;
        align-items: center;
      }

      select:focus {
        background-image: linear-gradient(45deg, white 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, white 50%),
          linear-gradient(to right, gray, gray);
        background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
          100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;
        border-color: grey;
        outline: 0;
      }
    }

    input:focus,
    input:active {
      border-color: #ff6525;
    }
  }

  .name {
    display: flex;
    flex-direction: column;
    font-size: small;
    width: 90%;
    margin-right: 10px;
    color: black;
    input {
      border-radius: 10px;
      padding: 5px;
      color: #202020;
      width: 90%;
      text-decoration: none;
      border: 2px solid #a5d8fa;
      @media (max-width: 900px) {
        width: 100%;
      }
    }

    input:focus,
    input:active {
      border-color: #ff6525;
    }

    .imgg {
      text-align: center;
      position: relative;
      cursor: pointer;
      width: 40%;
      height: 40%;
      &:hover {
        opacity: 0.5;
      }
      .inside_img {
        width: 25%;
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
  .nameyyy {
    display: flex;
    flex-direction: column;
    font-size: small;
    width: 33%;
    margin-right: 10px;
    color: black;
    input {
      border-radius: 10px;
      padding: 5px;
      color: #202020;
      width: 90%;
      text-decoration: none;
      border: 2px solid #a5d8fa;
      @media (max-width: 900px) {
        width: 100%;
      }
    }

    input:focus,
    input:active {
      border-color: #ff6525;
    }

    .imgg {
      text-align: center;
      position: relative;
      cursor: pointer;
      width: 70%;
      height: 40%;
      &:hover {
        opacity: 0.5;
      }
      .inside_img {
        width: 25%;
        object-fit: contain;
      }
      input {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
      }
    }
  }

  .nameee {
    display: flex;
    flex-direction: column;
    font-size: small;
    width: 100%;
    justify-content: space-around;
    color: black;
    select {
      background-color: white;
      color: black;
      text-decoration: none;
      border: 2px solid #a5d8fa;
      line-height: 1.5em;
      width: 29%;
      padding: 8px;
      border-radius: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, blue 50%),
        linear-gradient(135deg, blue 50%, transparent 50%),
        linear-gradient(to right, skyblue, skyblue);
      background-position: calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px), 100% 0;
      background-size: 5px 5px, 5px 5px, 40px 45px;
      background-repeat: no-repeat;
      @media (max-width: 555px) {
        padding: 8px;
        background-size: 5px 5px, 5px 5px, 30px 45px;
        align-items: center;
      }

      select:focus {
        background-image: linear-gradient(45deg, white 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, white 50%),
          linear-gradient(to right, gray, gray);
        background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
          100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;
        border-color: grey;
        outline: 0;
      }
    }
  }

  .first_div {
    h2 {
      color: #0e4d92;
      display: flex;
      justify-content: center;
      margin: 0;
    }

    .first_box1 {
      display: flex;
      flex-direction: column;
      margin: 0px 10px;
      > div {
        display: flex;
        flex: 1;
        padding: 10px;
        gap: 5px;
      }
    }
  }

  .second_div {
    display: flex;
    flex-direction: column;
    font-family: Roboto, sans-serif;
    flex-wrap: wrap;
    width: 100%;

    .company {
      display: flex;
      flex-direction: column;
      margin: 0px 10px;
      width: 100%;

      > div {
        display: flex;
        padding: 10px;
        width: 100%;

        .name1 {
          display: flex;
          flex-direction: column;
          font-size: small;
          width: 100%;
          margin-right: 10px;
          color: black;
        }
        .name2 {
          display: flex;
          flex-direction: column;
          font-size: small;
          width: 100%;
          margin-right: 10px;
          /* padding: 20px; */
          /* gap: 10px; */
          color: black;
        }
      }
    }

    .password {
      display: flex;
      flex-direction: column;
      padding: 10px;
      width: 70%;
      > div {
        display: flex;
        padding: 10px;
      }
    }
  }

  .fifth_div {
    background: #0e4d92;
    color: white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;

    .fifth_box {
      margin: 40px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      /* width:50%; */
      justify-content: center;
      .btnn {
        padding: 10px;
        border-radius: 10px;
        font-size: small;
        border-color: transparent;
        width: 80%;
        font-size: medium;
        color: #ffffff;
        background: rgb(255 94 0);
        margin: 20px;
        background: #000080;
        border-radius: 10px;
        color: #fff;
        padding: 10px 5px;
        background-size: 300% 100%;
        transition: all 0.3s ease-in-out 0s;
        text-transform: uppercase;
        &:hover {
          box-shadow: 10px 5px 5px gray;
          transition: all 0.2s ease-in-out 0s;
          background: linear-gradient(-25deg, #000080 49%, #000080 100%);
        }
      }
    }
  }
  .regis {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .btnn {
      padding: 10px;
      border-radius: 10px;
      font-size: small;
      border-color: transparent;
      width: 15%;
      font-size: medium;
      color: #ffffff;
      margin-right: 108px;
      background: #000080;
      color: #fff;
      background-size: 300% 100%;
      transition: all 0.3s ease-in-out 0s;
      text-transform: uppercase;
      &:hover {
        box-shadow: 10px 5px 5px gray;
        transition: all 0.2s ease-in-out 0s;
        background: linear-gradient(-25deg, #000080 49%, #000080 100%);
      }
    }
  }
  @media (max-width: 768px) {
    .first_box1 > div,
    .company > div,
    .password {
      flex-direction: column;
    }

    .name,
    .name1,
    .name2 {
      width: 100%;
      margin-right: 0;
    }

    .name input,
    .name1 input,
    .name2 input {
      width: calc(100% - 28px);
    }

    .fifth_box {
      margin: 20px;
    }
  }
`;