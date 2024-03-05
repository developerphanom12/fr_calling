import React from "react";
import styled from "styled-components";
import "../../../css/style.css";
import "../../../css/bootstrap.css";
import "../../../css/responsive.css";

import slider from "../../images/slider-img.png";
export default function Page1() {
  return (
    <Root>
      <section class="slider_section ">
        <div id="customCarousel1" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container ">
                <div class="row">
                  <div class="col-md-6 ">
                    <div className="detail-box">
                      <h1>
                        Telecaller <br />
                        Application
                      </h1>
                      <p>
                        The telecaller app optimizes communication and tasks,
                        aiding call management, lead tracking, and productivity
                        enhancement. With intuitive features and user-friendly
                        interface, it streamlines telecalling operations,
                        ensuring efficient workflow and customer engagement.
                      </p>

                      <div className="btn-box">
                        <a href="#" className="btn1">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="img-box">
                      <img src={slider} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Root>
  );
}
const Root = styled.section`
   background: linear-gradient(130deg, #231a6f, #0f054c);

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;

  @media (max-width: 989px) {
    flex-direction: column;
    height: 110vh;
    padding: 0;
  }

  .childfirst {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 44%;
    padding: 40px;
    color: #ffffff;
    @media (max-width: 878px) {
      flex-direction: column-reverse;
      padding: 10px;
      margin: 0;
      width: 90%;
    }
    .child1 {
      align-items: center;
      h1 {
        margin: 10px;
        font-size: 2.5em;

        @media (max-width: 878px) {
          text-align: center;
          font-size: 1.6em;
          width: 100%;
        }
      }
    }
    .child2 {
      display: flex;
      align-items: center;
      height: 15%;
      width: 100%;
      border-radius: 30px;
      background-color: #ffffff;
      border: 1px solid black;
      @media (max-width: 878px) {
        height: 25%;
      }
      input {
        height: 60%;
        margin: 10px;
        width: 65%;
        border-radius: 30px;
        border: none;
      }
      input:focus {
        outline: none;
      }
      button {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 30px;
        border: none;
        margin: 10px;
        width: 35%;
        height: 80%;
        font-size: 18px;
        background-color: #000080;
        color: white;
        svg {
          width: 25px;
          height: 25px;
        }
        &:hover {
          cursor: pointer;
          background-color: blue;
          box-shadow: 4px 7px 7px black;
        }
      }
    }
  }
  .childsecond {
    flex-direction: column;
    width: 55%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 989px) {
      width: 100%;
      height: 30%;
    }

    img {
      width: 100%;
    }
    .child3 {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 20px;
      margin: 10px;
      @media (max-width: 988px) {
        gap: 0px;
      }
      .child3-1 {
        display: flex;
        margin: 10px;
        align-items: center;
        justify-content: flex-end;
        gap: 30px;
        @media (max-width: 988px) {
          display: flex;
          gap: 0px;
          justify-content: center;
        }

        .circle {
          border-top-right-radius: 35%;
          border-bottom-left-radius: 30%;
          height: 90px;
          width: 90px;
          padding: 20px;
          background-color: #056dc5c9;
          box-shadow: 4px 7px 7px black;
        }
        .semicircle {
          margin: 10px;
          border-top-left-radius: 35%;
          border-bottom-left-radius: 30%;
          height: 90px;
          width: 90px;
          padding: 20px;
          background-color: #056dc5c9;
          box-shadow: 4px 5px 5px black;
        }
        .square {
          width: 90px;
          height: 90px;
          border-bottom-left-radius: 20%;
          background-color: #056dc5c9;
          padding: 20px;
          box-shadow: 4px 6px 6px black;
        }
        .semisquare {
          border-top-right-radius: 35%;
          border-bottom-left-radius: 30%;
          height: 90px;
          width: 90px;
          padding: 20px;
          background-color: #056dc5c9;
          box-shadow: 4px 7px 7px black;
          margin: 10px;
        }
      }
    }
    .grpimg {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      z-index: 10;
      backdrop-filter: blur(2px);
      position: absolute;
      width: 35%;
      height: 70%;
      gap: 10px;
      @media (max-width: 988px) {
        justify-content: center;
        width: 90%;
        height: 28%;
      }
      .grp1 {
        img {
          border-radius: 50%;
          width: 160px;
          height: 200px;
          @media (max-width: 677px) {
            width: 100px;
            height: 140px;
          }
        }
      }
      .grp2 {
        img {
          transform: skew(-0.06turn, 18deg);
          width: 160px;
          height: 200px;
          @media (max-width: 677px) {
            width: 100px;
            height: 140px;
          }
        }
      }
    }
  }
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .childfirst .child1 h1 {
    animation: slideInFromLeft 2s ease-in-out forwards;
  }

  .childfirst .child1 h1:nth-child(1) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 1s;
    animation-iteration-count: 10;
  }

  .childfirst .child1 h1:nth-child(2) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 1.5s;
    animation-iteration-count: 10;
  }

  .childfirst .child1 h1:nth-child(3) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 2s;
    animation-iteration-count: 10;
  }

  .childfirst .child1 h1:nth-child(4) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 2.5s;
    animation-iteration-count: 10;
  }
`;
