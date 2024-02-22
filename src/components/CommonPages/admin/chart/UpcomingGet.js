import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";

import TelleDetail from "../../clientdata/viewdetails/TelleDetail";
import ClientDetail from "../../clientdata/viewdetails/ClientDetail";
import CaDetail from "../../clientdata/viewdetails/CaDetail";

export default function UpcomingGet() {
  const [active, setActive] = useState(""); 
  const [user, setUser] = useState();

  let { id } = useParams();
  console.log("checkdata", id);

  const getdatabyid = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}//getbyids/${id}`,
        axiosConfig
      );
      if (res.status === 201) {
        setUser(res?.data?.data[0]);
      }
      console.log("resres", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getdatabyid();
  }, [id]);

  console.log("userr", user);
  return (
    <Root>
      <div></div>
      <h2>History</h2>
      <div className="nav_tab">
        <button
          className={active === "clientdetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("clientdetail");
          }}
        >
          Client Detail
        </button>
        <button
          className={active === "telledetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("telledetail");
          }}
        >
          Tellecaller Detail
        </button>

        <button
          className={active === "cadetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("cadetail");
          }}
        >
          CA Detail
        </button>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <div className="">
              {active === "clientdetail" ? (
                <ClientDetail detail={user} />
              ) : active === "telledetail" ? (
                <TelleDetail detail={user} />
              ) : active === "cadetail" ? (
                <CaDetail detail={user} />
              ) : (
                <ClientDetail  detail={user}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  .nav_tab {
    display: flex;
    gap: 10px;
    align-items: center;
    background: #ffffff;
    width: 80%;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    @media (max-width: 786px) {
      flex-direction: column;
    }

    .btn_1 {
      background-color: transparent;
      border: none;
      width: fit-content;
      padding: 10px;
      background-color: #000080;
      border-radius: 10px;
      color: white;
      &:hover {
        box-shadow: 4px 5px 5px #a1a2a5;
      }
      @media (max-width: 566px) {
        min-width: 80px;
        width: 100%;
        padding: 5px;
        font-size: small;
        &:hover {
          background-color: transparent;
          color: black;
        }
      }
    }
    .active {
      background: #57be1f;
      color: #ffffff;
      @media (max-width: 400px) {
        .active {
          background-color: transparent;
          color: black;
        }
      }
    }
  }
`;
