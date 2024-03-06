import React from "react";
import styled from "styled-components";
import "../../../css/style.css";
import "../../../css/bootstrap.css";
import "../../../css/responsive.css";
import slider1 from "../../images/team-1.jpg";
import slider2 from "../../images//asas.jpg";
import slider4 from "../../images/team-4.jpg";
import slider5 from "../../images/flex.png";
import slider6 from "../../images/asasas.png";
import slider7 from "../../images/clls.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Page5() {
  return (
    <Root>
      <section class="team_sectionprovider layout_padding">
        <div class="team_container">
          <div class="container ">
            <div class="heading_container heading_center">
              <h2>
                Our <span>Services</span>
              </h2>
              <p>
                Explore the range of services designed to elevate your
                telemarketing efforts.
              </p>
            </div>
            <div class="row">
              <div class="col-md-4 ">
                <div class="box ">
                  <div class="img-box">
                    <img
                      className="imaging"
                      src={slider5}
                      alt="Placeholder Image"
                    />
                  </div>
                  <div class="detail-box">
                    <h5>Call Script Generator</h5>
                    <p>
                      Craft compelling call scripts effortlessly to engage your
                      prospects effectively.
                    </p>
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider6} alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Lead Management</h5>
                    <p>
                      Streamline lead tracking and follow-up tasks for increased
                      conversion rates.
                    </p>
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider7} alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Call Analytics</h5>
                    <p>
                      Gain valuable insights into your calling campaigns to
                      optimize performance.
                    </p>
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="our_team_section layout_padding">
        <div class="container-fluid">
          <div class="heading_container heading_center">
            <h2 class="">
              Our <span> Team</span>
            </h2>
          </div>

          <div class="team_container">
            <div class="row">
              <div class="col-lg-3 col-sm-6">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider1} class="img1" alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Henry Alex</h5>
                    <p>Manager</p>
                  </div>
                  <div className="social_box">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider4} class="img1" alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Alisha Johns</h5>
                    <p>SEO Head</p>
                  </div>
                  <div className="social_box">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider2} class="img1" alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Johnsom Halex</h5>
                    <p>Marketing Head</p>
                  </div>
                  <div className="social_box">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="box ">
                  <div class="img-box">
                    <img src={slider4} class="img1" alt="" />
                  </div>
                  <div class="detail-box">
                    <h5>Alexa Allard</h5>
                    <p>HR Head</p>
                  </div>
                  <div className="social_box">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
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
  .detail-box {
    p {
      font-size: 13px;
      font-weight: 300;
    }
    h5 {
      font-size: 16px;
      margin-top: 17px;
      color: black;
      font-family: inherit;
      font-weight: 900;
    }
    a {
      border: 1px solid;
      padding: 9px;
      font-weight: 400;
      border-radius: 9px;
      background: #4b9f0c;
      color: white;
    }

    .detail-box,
    a :hover {
      cursor: pointer;
      background-color: red;
    }
  }
  .box {
    margin-top: 38px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .img-box {
    img {
      width: 96px;
      height: 82px;
    }
  }
`;
