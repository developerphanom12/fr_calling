import React from "react";
import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { RiStarSmileFill } from "react-icons/ri";
import groupiiimg from "../../images/homeimages.jpeg";
import round from "../../images/contemporary-art-collage-creative-design-two-women-employees-working-on-ladder-of-success-2HJPF9Y.jpg";

export default function Page1() {
  return (
    <Root>
      <div className="childfirst">
        <div className="child1">
          <h1>Check Portfilo.</h1>
          <h1>Tellecallerr</h1>
          <h1>Find Best Solution</h1>
          <h1>You Can Trust.</h1>
        </div>
        <div className="child2">
          <input />
          <button>
            {" "}
            <IoSearchSharp />
            search
          </button>
        </div>
      </div>
      <div className="childsecond">
        <div className="child3">
          <div className="child3-1">
            <RiStarSmileFill />
            <div className="square"></div>
            <div className="circle"></div>
            <div className="semicircle"></div>
          </div>
          <div className="child3-1">
            <RiStarSmileFill />
            <div className="semicircle"></div>
            <div className="square"></div>
            <div className="semisquare"></div>
            <IoMdStarOutline />
          </div>
        </div>
        <div className="grpimg">
          <IoStar />
          <div className="grp1">
            <img src={round} alt="img" />
          </div>

          <div className="grp2">
            <img src={groupiiimg} alt="img" />
          </div>
          <IoStar />
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  background-image: radial-gradient(
    circle farthest-corner at 22.4% 21.7%,
    rgba(4, 189, 228, 1) 0%,
    rgba(2, 83, 185, 1) 100.2%
  );
  display: flex;
  height: 100%;
  padding: 40px;

  @media (max-width: 989px) {
    flex-direction: column;
    height: 70vh;
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
          @media (max-width:677px){
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
          @media (max-width:677px){
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
    animation-iteration-count:10;

  }

  .childfirst .child1 h1:nth-child(2) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 1.5s;
    animation-iteration-count:10;

  }

  .childfirst .child1 h1:nth-child(3) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 2s;
    animation-iteration-count:10;

  }

  .childfirst .child1 h1:nth-child(4) {
    animation: slideInFromLeft 5s ease-in-out forwards;
    animation-delay: 2.5s;
    animation-iteration-count:10;

  }

`;
