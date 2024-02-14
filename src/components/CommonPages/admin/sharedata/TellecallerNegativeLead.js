


import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";
import { appDetailsAction } from "../../../../redux/users/action";
import download from '../../../images/swsws.jpeg'



const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

export default function TellecallerNegativeLead({ popUser = () => {} }) {
  const [applications, setApplications] = useState([]);
  const [uniqueClientNames, setUniqueClientNames] = useState([]);
  const [selectedTele, setSelectedTele] = useState("");
  const dispatch = useDispatch();
  const getHistory = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/negativelead`,
        axiosConfig
      );
      if (res.status === 201) {
        setApplications(res?.data?.data);
      }
      console.log("sabasbasbas",res)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handlePassData = (i) => {
    console.log("getDetails1", i);
    dispatch(appDetailsAction(i));
    popUser(true);
  };

  const filteredApplications = applications.reduce(
    (filteredArray, currentItem) => {
      const isUnique = filteredArray.some(
        (item) => item?.cd === currentItem?.cd
      );
      const matchesSelectedTele = currentItem?.user?.username === selectedTele;

      if (!isUnique && (!selectedTele || matchesSelectedTele)) {
        filteredArray.push(currentItem);
      }

      return filteredArray;
    },
    []
  );

  useEffect(() => {
    const uniqueNames = Array.from(
      new Set(applications.map((item) => item?.user?.username))
    );
    setUniqueClientNames(uniqueNames);
  }, [applications]);
  return (
    <Root>
      <div className="header">
        <h2>Negative Data --</h2>
      </div>
      <div>
  
  <div class="textblock">
    <img  src={download}/>
    <h1>DATA  UPDATE AFTER 30 DAYS</h1>
    <img  src={download}/>
    </div>
</div>
      <div className="app_table">
        <div className="app_header">
          <div> Id</div>
          <div>Client Name</div>
          <div>Company Name</div>
          <div>Tellecaller Name</div>
          <div>Status</div>
          <div>Assign Date</div>
        </div>
        {filteredApplications &&
          filteredApplications.map((i) => {
            return (
              <div
                className="app_body"
                onClick={() => {
                  handlePassData(i);
                }}
              >
                <div className="cams">#{i?.cd}</div>
                <div>
                  <p>
                    Client Name <span>{i?.client_name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Company Name: <span>{i?.company_name}</span>
                  </p>
                </div>

                <div>
                  <p>{i?.user?.username}</p>
                </div>
                <div>
                  <p>{i?.call_status}</p>
                </div>
                <div>
                  <p>{formatDate(i?.created_at)}</p>
                </div>
               
              </div>
            );
          })}
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8f8f8;
  color: #202020;
  font-family: "Roboto", sans-serif;
  height: 100%;

  .header {
    margin-top: 37px;
    display: flex;
  
    h2 {
      color: #202020;
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      margin: 0px 10px;
    }
    select {
      background-color: white;
      color: gray;
      text-decoration: none;
      border: 1px solid #623084;
      line-height: 1.5em;
      width: 250px;
      padding: 5px;
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
    }
    @media (max-width: 566px) {
      padding: 10px;
      flex-direction: column;
      h2 {
        color: #202020;
        font-family: "Roboto", sans-serif;
        font-size: 32px;
        font-weight: 900;
        font-size: 33px;
        margin: 0;
      }
    }

 

   button {
     padding: 5px;
     border-radius: 20px;
     font-size: 13px;
     border: none;
     color: #ffffff;
     background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
     transition: all 0.3s ease-in-out 0s;
     text-transform: uppercase;
     &:hover {
      cursor: pointer;
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
 
  
  .app_table {
    display: flex;
    flex-direction: column;
    margin: 10px;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background:#5d05abb8;
      text-align: center;
      color: white;
      border-bottom: 4px solid #4b217b;
      > div {
        flex: 1;
    border: 1px solid #dee2e6;
    padding: 13px;
      }
    }
    .app_body {
      display: flex;
      font-family: "Roboto", sans-serif;

      .cams {
        text-align: center;
        display: flex;
        height: 3vh;
        align-items: center;
        justify-content: center;
      }
      .iconn {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          color: #63276f;
          width: 20px;
          height: 20px;

          &:hover {
            color: green;
          }
        }
      }
      > div {
        flex: 1;
        border: 0.3px solid #fbfbfd;
        text-transform: capitalize;
        background-color: #e7e7e8;
        text-align: center;
        padding: 10px 5px;
        .person {
          color: #8995ad;
          font-size: 14px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
        p {
          font-weight: 500;
          text-align: left;
          font-size: 13px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
          span {
            font-size: 13px;
            font-weight: 500;
          }
        }

        &:nth-child(odd) {
          background-color: #a061ef26;
        }

        &:nth-child(even) {
          background-color: white;
        }
      }
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 568px) {
    .app_table {
      font-size: smaller;
      margin: 0px;
      overflow-x: scroll;
      .app_header {
        min-width: 135px;
        > div {
          padding: 5px;
          font-size: smaller;
        }
      }
      .app_body {
        min-width: 105px;
        width: 100%;
        > div {
          font-size: 12px;
        }
      }
    }
  }

 
/* 
  .textblock {
    position: absolute;
    white-space: nowrap;
    -webkit-animation: rightThenLeft 4s linear;
}

@-webkit-keyframes rightThenLeft {
    0%   {left: 0%;}
    50%  {left: 100%;}
    100% {left: 0%;}
} */

.textblock {
    display: flex;
    justify-content: center;
    font-size: 19px;
    font-weight: 900;
    color: #6f00ff;

    h1{
        margin: 5px;
    animation: blinkMe 2s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px;
    }
    img{
        width: 42px;
    height: 32px;
    margin-top: 12px;
   }


}
@keyframes blinkMe {
 0% {
  opacity: 0;
 }
 50% {
  opacity: 1;
 }
 100% {
  opacity: 0;
 }
}
`;
