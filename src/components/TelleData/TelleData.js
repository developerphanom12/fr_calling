import React, { useState } from "react";
import styled from "styled-components";
import CloseLead from "./CloseLead";
import ColdLead from "./ColdLead";
import GhostClient from "./GhostClient";
import HotLead from "./HotLead";
import NegativeClient from "./NegativeClient";

export default function TelleData() {
  const [active, setActive] = useState("CloseLead");

  return (
    <Root>
      <div className="nav_tab">
        <button
          className={active === "CloseLead" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("CloseLead");
          }}
        >
          CloseLead
        </button>
        <button
          className={active === "ColdLead" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("ColdLead");
          }}
        >
          ColdLead
        </button>
        <button
          className={active === "GhostClient" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("GhostClient");
          }}
        >
          GhostClient
        </button>
        <button
          className={active === "HotLead" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("HotLead");
          }}
        >
          HotLead
        </button>
        <button
          className={active === "NegativeClient" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("NegativeClient");
          }}
        >
          NegativeClient
        </button>
      </div>
      <div className="table">
        {active === "CloseLead" ? (
          <CloseLead />
        ) : active === "ColdLead" ? (
          <ColdLead />
        ) : active === "GhostClient" ? (
          <GhostClient />
        ) : active === "HotLead" ? (
          <HotLead />
        ) : active === "NegativeClient" ? (
          <NegativeClient />
        ) : (
          <CloseLead />
        )}
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  .nav_tab {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 10px;
    gap: 10px;
    @media (max-width: 786px) {
      flex-direction: column;
    }

    .btn_1 {
      background-color: transparent;
      border: none;
      width: fit-content;
      padding: 7px;
      color: #3a1864;
      font-weight: 600;
      font-size: 14px;

      &:hover {
        cursor: pointer;
      }
      @media (max-width: 566px) {
        /* min-width: 80px; */
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
      border-bottom: 3px solid #57be1f;
      color: #57be1f;
      @media (max-width: 400px) {
        .active {
          background-color: transparent;
          color: black;
        }
      }
    }
  }
  .table {
    display: flex;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media (max-width: 600px) {
      padding: 0;
      width: 90%;
    }
  }
`;
