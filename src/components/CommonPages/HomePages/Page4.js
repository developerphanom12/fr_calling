import React from "react";
import styled from "styled-components";
import stars from "../../images/star.png";

export default function Page4() {
  return (
    <Root>
      <div className="main">
        {" "}
        <div className="head">
          <h1>Hire Smarter With The Telecaller App</h1>
        </div>
        <div className="mainbody">
          <div className="bodyy">
            <div className="mobile">
              <div className="phone">
                <div className="phone-mirror">
                  <div className="topWrapper">
                    <div className="camera"></div>
                    <div className="line-rec"></div>
                  </div>
                  {/* <img src="../images/oppo.png" alt="oppo" height="535" width="312"> */}
                </div>
              </div>
            </div>
            <div className="mobile">
              <div className="phone">
                <div className="phone-mirror">
                  <div className="topWrapper">
                    <div className="camera"></div>
                    <div className="line-rec"></div>
                  </div>
                  {/* <img src="../images/oppo.png" alt="oppo" height="535" width="312"> */}
                </div>
              </div>
            </div>
            <div className="mobile">
              <div className="phone">
                <div className="phone-mirror">
                  <div className="topWrapper">
                    <div className="camera"></div>
                    <div className="line-rec"></div>
                    <p>image of Reviews</p>
                  </div>
                  {/* <img src="../images/oppo.png" alt="oppo" height="535" width="312"> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bodyy2">
            <div className="bottom">
              <div className="imgarea">
                <img src={stars} alt="img" />
              </div>
              <div className="textarea">
                <p>Join the community! Share your experience with us!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  background-color: #f1f1e8;
  padding: 40px 50px 80px 50px;
  @media (max-width: 655px) {
    padding: 0px;
    padding-bottom: 80px;
  }
  .main {
    flex-direction: column;
    background: #ffffff;
    border-radius: 20px;
    align-items: center;
    display: flex;
    gap: 30px;
    .head {
      h1 {
        font-size: 2em;
        margin: 0;
        text-align: center;
        margin: 20px;
      }
      p {
        text-align: center;
      }
    }
    .mainbody {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: flex-end;
      .bodyy {
        display: flex;
        gap: 20px;
        height: 100%;
        position: relative;
        top: 69px;
        .mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          .phone {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 95%;
            background: black;
            border-radius: 40px;
            padding: 10px;
            .phone-mirror {
              position: relative;
              width: 220px;
              height: 400px;
              background-color: #ffffff;
              border-radius: 40px;
              p {
                /* color: #ffffff; */
                padding-top: 40px;
              }
              .topWrapper {
                position: relative;
                width: 130px;
                height: 20px;
                margin: 0px auto 0 auto;
                float: left;
                left: 18%;
                background-color: #232526;
                border-radius: 0 0 50px 50px;
                .line-rec {
                  position: relative;
                  width: 60px;
                  height: 6px;
                  margin: 0px auto 0 auto;
                  float: left;
                  left: 27%;
                  top: 4px;
                  background-color: rgb(83, 83, 82);
                  border-radius: 5px;
                  border: 1px solid rgb(214, 214, 214);
                  .camera {
                    position: relative;
                    float: left;
                    margin-right: 8px;
                    left: 18%;
                    width: 11px;
                    height: 11px;
                    top: 1px;
                    background-color: rgb(83, 83, 82);
                    border-radius: 30px;
                    border: 1px solid rgb(214, 214, 214);
                  }
                }
              }
            }
          }
        }
      }
      .bodyy2 {
        background-color: #fffaf0;
        width: 100%;
        z-index: 12;
        .bottom {
          display: flex;
          height: 140px;
          align-items: center;
          justify-content: center;
          @media (max-width: 678px) {
            padding: 20px;
            width: 100%;
          }
          .imgarea {
            img {
              width: 450px;
              height: 290px;
              @media (max-width: 678px) {
                width: 233px;
                height: 158px;
              }
            }
          }
          .textarea {
            width: 40%;
            p {
              font-size: 1.5em;
              font-weight: 700;
              @media (max-width: 567px) {
                font-size: 1em;
                font-weight: 600;
                padding: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
