import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";

export default function AddData() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    file: null,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const MasterSHeetExcel = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', formData.file);

      const axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/exceldata`,
        formDataObj,
        axiosConfig
      );

      console.log("resr", res);

      if (res.status === 200) {
        setFormData({ file: null });
        cogoToast.success("Submit Successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Root>
      <div className="sheet">
        <h3>Add Mastersheet Data</h3>
        <div className="name">
          User Name
          <input
            type="file"
            onChange={handleFileChange}
            placeholder="Import excel sheet"
          />
        </div>
        <div className="regis">
          <button
            onClick={() => {
              MasterSHeetExcel();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
 

 .sheet{

   h3 {
     text-shadow: 4px 5px 5px gray;
     margin: 10px;
   }
   .name {
     display: flex;
     flex-direction: column;
     font-size: small;
     width: 80%;
     margin-right: 10px;
     padding: 10px;
     gap: 10px;
     color: black;
 
     select {
       background-color: white;
       color: black;
       text-decoration: none;
       border: 2px solid lightgray;
       line-height: 1.5em;
       padding: 10px;
       width: 50%;
       border-radius: 10px;
       -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
       box-sizing: border-box;
       -webkit-appearance: none;
       -moz-appearance: none;
       background-image: linear-gradient(45deg, transparent 50%, black 50%),
         linear-gradient(135deg, black 50%, transparent 50%),
         linear-gradient(to right, dodgerblue, skyblue);
       background-position: calc(100% - 20px) calc(1em + 2px),
         calc(100% - 15px) calc(1em + 2px), 100% 0;
       background-size: 5px 5px, 5px 5px, 40px 45px;
       background-repeat: no-repeat;
       &:hover {
         box-shadow: 4px 4px 5px darkgray;
         transition: all 0.1s ease-in-out 0s;
       }
       @media (max-width: 555px) {
         padding: 8px;
         width: 100%;
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
  }
  > div {
    .regis {
      display: flex;
      margin: 5px;
      button {
        display: flex;
        flex-direction: column;
        width: 17%;
        height: 45px;
        margin: 5px;
        padding: 5px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 10px;
        border: transparent;
        background: #000080;
        color: #fff;
        background-size: 300% 100%;
        transition: all 0.3s ease-in-out 0s;
        text-transform: uppercase;
        &:hover {
          background: #000080;
          transition: all 0.1s ease-in-out 0s;
          box-shadow: 4px 5px 5px gray;
        }
        @media (max-width:666px) {
          width:50%;
        }
      }
    }
  }
  input {
    border-radius: 10px;
    padding: 10px;
    color: #202020;
    width: 50%;
    text-decoration: none;
    border: 2px solid lightgray;
    @media (max-width: 600px) {
      min-width: 100px;
      width: 100%;
    }
  }
`;