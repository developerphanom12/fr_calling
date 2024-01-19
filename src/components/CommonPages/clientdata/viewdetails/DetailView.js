import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import TelleDetail from "./TelleDetail";
import ClientDetail from "./ClientDetail";
import CaDetail from "./CaDetail";
import BankDetail from "./addLoan/BankDetail";
import ProfitDetail from "./addLoan/ProfitDetail";
import PostProfit from "./addLoan/PostProfit";
import PostBank from "./addLoan/PostBank";

export default function DetailView() {
  const [active, setActive] = useState("");
  const [user, setUser] = useState();

  let { cd } = useParams();
  console.log("checkdata", cd);

  const getDetail = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/getbyid/${cd}`,
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
    getDetail();
  }, [cd]);

  console.log("userr", user);
  return (
    <Root>
      <div className="nav_tab">
        <button
          className={active === "telledetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("telledetail");
          }}
        >
          Tellecaller Detail
        </button>
        <button
          className={active === "clientdetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("clientdetail");
          }}
        >
          Client Detail
        </button>
        <button
          className={active === "cadetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("cadetail");
          }}
        >
          CA Detail
        </button>
        <button
          className={active === "profitdetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("profitdetail");
          }}
        >
          Profit Detail
        </button>
        <button
          className={active === "bankdetail" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("bankdetail");
          }}
        >
          Bank Detail
        </button>
      </div>
      <div className="post_detail">
        <button
          className={active === "postprofit" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("postprofit");
          }}
        >
          Add Profit Detail
        </button>
        <button
          className={active === "postbank" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("postbank");
          }}
        >
          Add Bank Detail
        </button>
      </div>

      <div>
        {active === "telledetail" ? (
          <TelleDetail detail={user} />
        ) : active === "clientdetail" ? (
          <ClientDetail detail={user} />
        ) : active === "cadetail" ? (
          <CaDetail detail={user} />
        ) : active === "profitdetail" ? (
          <ProfitDetail detail={user} />
        ) : active === "bankdetail" ? (
          <BankDetail detail={user} />
        ) : active === "postprofit" ? (
          <PostProfit />
        ) : active === "postbank" ? (
          <PostBank />
        ) : (
          <TelleDetail detail={user} />
        )}
      </div>
    </Root>
  );
}
const Root = styled.section`
  h2 {
    margin: 10px;
  }
  .post_detail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
    gap: 10px;
    button {
      border: none;
      border-radius: 20px;
      padding: 7px;
      background: #461c6c;
      color: #fff;
    }
  }
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
      border: none;
      width: fit-content;
      padding: 10px;
      color: gray;
      font-weight: 600;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 1px 1px 5px 1px #a1a2a5;
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
      border-bottom: 4px solid #63276f;
      background-color: #fff;
      color: #63276f;
    }
  }
`;
