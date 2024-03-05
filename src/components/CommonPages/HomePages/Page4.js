import React from "react";
import styled from "styled-components";
import "../../../css/style.css";
import "../../../css/bootstrap.css";
import "../../../css/responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Page4() {
  return (
    <Root>
      <section class="footer_address layout_padding2">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-3 info_col">
              <div class="info_contact">
                <h4>Address</h4>
                <div class="contact_link_box">
                  <a href="">
                    <i>
                      {" "}
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </i>
                    <span>Location</span>
                  </a>
                  <a href="">
                    <i>
                      {" "}
                      <FontAwesomeIcon icon={faPhone} />{" "}
                    </i>

                    <span>Call +01 9245007</span>
                  </a>
                  <a href="">
                    <i>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </i>
                    <span>karan.sharma111@yahoo.co.in</span>
                  </a>
                </div>
              </div>
              <div class="info_social">
                <a href="">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 info_col">
              <div class="info_detail">
                <h4>About TeleCaller</h4>
                <p>
                  TeleCaller is a revolutionary app designed to enhance your
                  calling experience. Our mission is to provide users with
                  advanced features and tools to make every call meaningful and
                  efficient.
                </p>
              </div>
            </div>
            <div class="col-md-6 col-lg-2 mx-auto info_col">
              <div class="info_link_box">
                <h4>Check Here</h4>
                <div class="info_links">
                  <a class="active" href="index.html">
                    Home
                  </a>
                  <a class="" href="about.html">
                    About
                  </a>
                  <a class="" href="service.html">
                    Services
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 info_col ">
              <h4>Any Query</h4>
              <form action="#">
                <input type="text" placeholder="Enter email" />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section class="footer">
    <div class="container">
      <p>
        &copy; <span id="displayYear"></span> TeleCaller App © 2024 Powered By Phanom Professionals
       
      </p>
    </div>
  </section>
    </Root>
  );
}
const Root = styled.section`
  background: linear-gradient(130deg, #231a6f, #0f054c);
`;
