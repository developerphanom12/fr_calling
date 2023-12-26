import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import styled from "styled-components";


export default function ColdLead() {
  return (
    <Root>
        <div className="closedata">

        <div>
              <div className="img">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="data">
                <h5>Sagar sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal/>
                </p>
              </div>
            </div>  
            <div>
              <div className="img">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="data">
                <h5>Abhishek sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal />
                </p>
              </div>
            </div>       
          
           
            
           </div>
    </Root>
  )
}
const Root = styled.section`
  
  display: flex;
    width: 100%;
    height: 39vh;
    .closedata{

      > div {
            display: flex;
            /* flex-direction: column; */
            align-items: center;
  
            img {
              width: 43px;
              height: 48px;
              margin: 12px;
              border-radius: 21px;
            }
            .child11  {
            display: flex;
            align-items: center;
  
            p {
              margin-left: 144px;
              font-size: 25px;
              cursor: pointer;
            }
          }
            .data {
              display: flex;
              flex-direction: column;
  
              h5 {
                margin: 0;
                font-size: 1.125rem;
                font-weight: 600;
                font-family: Roboto, sans-serif;
                letter-spacing: 0;
                color: rgba(61, 78, 101, 0.84);
              }
              p {
                font-size: 0.8125rem;
                font-weight: 400;
              }
            
            }
          }
    }
`