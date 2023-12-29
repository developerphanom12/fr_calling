import React from "react";
import styled from "styled-components";
import ApexChart from "./CommonPages/admin/chart/ApexChart";
import ApexChart2 from "./CommonPages/admin/chart/Apexchart2";
import { TfiMenu } from "react-icons/tfi";
import { HiDotsHorizontal } from "react-icons/hi";
import TelleData from "./TelleData/TelleData";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Root>
      <div className="char1">
        <h1 className="curent">Current Sale</h1>
        <div className="apex">
          <ApexChart />
        </div>
        <p className="price">$37,920</p>
        <p>Current balance this billing cycle</p>
      </div>
      <div className="char">
        <ApexChart2 />
      </div>
      <div className="chart1">
        <div className="upcoming">
          <div className="div1">
            <p className="none">Recent Activity</p>
            <div className="datapicker">
              <DatePicker
                className="p1"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <TelleData />
        </div>
        <div className="upcoming1">
          <div className="upcomming_child">
            <div className="child1">
              <h1>Upcoming Appointments</h1>
              <p>
                <TfiMenu />
              </p>
            </div>
          </div>
          <div className="upcomming_child1">
            <div>
              <div className="img">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIoAkwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcBBQIDBAj/xABAEAABAwMABgcFBQUJAQAAAAABAAIDBAURBhIhMUFRBxNhcYGhsRQiMlKRQmJywfAVM5Ki0RYjJENEVLLC4TT/xAAaAQACAwEBAAAAAAAAAAAAAAAABAMFBgIB/8QALBEAAgICAAYBAwMFAQAAAAAAAAECAwQRBRIhMUFRIhNx8GGRsUKBocHRMv/aAAwDAQACEQMRAD8AvFERABVV0n6V1Aq32a3TGKKIAVL2nBe4jOrnkARnnnHfauV84X6Z892r5Zdrn1Mjj/Edn5Lib6EtSTe2ah794G7kF1rJWFGTBERABETIQARMjmE37kAZa7V3LuEmtvXQgKD3ZMdD9L63R6UM1nT0BPv0+d3azO4+R48CLvt9bTXGiiq6OVskErdZjx+th3r5mierN6Ibu5lZUWiR5McrOuiBO5w2OHiMHwXUJeCOyG1tFrIiKUXCIiACIiAPDd7jT2m3TV1W7Vhhbk8yeAHavna7VntdfU1QZ1QnldJ1YOsG5JOPNWj0x1EjLfbqYEiOSV73YO8tAAH8xVQzlRTfXQxUtLZ1ErCcM8EXJ2EXooaKquEogoqeSZ+7DW5A7zuHipxYtAooSyovL2yPG0U7PhHed57hgd6VyMynHW5vr68nca5S7EZsOjdffMOgHU0wO2eUbAfujifLtU8tmhtoomZmiNZN89Qcj+Hd6ntUgjY2JjWxtaxgGGsaMAdi5LNZXE77npPlj6X/AEchTGPc8woaIM1PY6fV+URDHoorpZofTy0klXaqcR1EY1nQRD3ZAOAaPtcRjft71M+OOKJWjJtpmpxZ3KEZLTKMqKSqpce1U80Od3WMLc/VdWFelRDDUQmKeNs0Tt7JGggqrNMdHxZKtr6bPsc+TEDt1HcWE9x2dmeWTpMLikciX05LUhOylwW0aBhUn0CqvZdLLW8E4M3V456wLfzUWCkWhMTp9K7Qxv8AuWO8GnW/Iq18kL7H0QiIpxQIiIAIiIArrpkmgFrt8Dh/iHTuew8mhpB83NVPzbs8FYvTLM518oos+5HS648XOB/4hQGkopq5tRI04jp4nPe7uGQPql7JKO3Iari3FJHVQU5ra2mpWO1TNK2PXxnVyQMqenRTR+xwNnu00k23DWvcQ1x5Brdp8SVGNCKc1Ok1GMZbDrSkfhaceeFZN0slHdpIn1glzESG6j8Ag42eXYqTiWU6741uTUdbeu41VDcW9Gih0ytlK0QUduljhbsAYGM8gt3Z79QXY6lO9zJmjJjlbh2PQrQ1Fy0NoZjSuhicY/dc9kJeGn8W3PhlbagsNn9ogulvB1dr4zHJljs7M4/LYkcivHUOZwnFvs35+5JCTb0mmbxERVAwdFXVQUVO+erkbFE3e53pjiVHJdN6Fj9WGlqZG/N7rfJby7Wqmu0DIqrrNVjw8BjsHIUerqnRK0TexzU8UkrNjh1Zl1D2k8ewKxw66JrUoSnL0iGyTj50ja2jSS33SQQxl0Mx+COYD3u4jYe5dem9IKvRysJbmSnHXNPLVOT5Fy66OyWC4mnuNvB1A8Pb1Ty0EjgRwPZsW7roBVUVTAd00TmHxBC5nKqm+MqtrT6p+AW5ReyjlKujqqipNLbbJO0FjnmJufsOc0tBHiQPFRaJrpThrSTqk4A5DJXroZnU8sU8Z9+Nwe3vBBHotlvTENdD6eREU4oEREAEREAVP00UpFbbawAkPifGdnynP/YrQWCma7RmoDB71Q2Tb27Wj0VodINjffdGp4YGa1VCevgGNpcM5A7S0uA7wqu0PrGvppKJxAkicXgH5D+j9VUcXUlTzR8NMscFpy0zs6MKUOqqytI3MbEw9+0+jfqpvdGzvtlY2kJFQYXiL8Wqcea8Gidq/ZNsfHscZZ3ygjg3YGj6ALdLOZuQrcl2R7dNf2GoQ1DlZQ4xgYy3s5eCs7o4ZONHXGYEMfO4w54tw3yzkrZ1WjVmqqr2megjdMTkkEtB7wCAfELaxsZExkcTGtjYNUNaMADkOxPcQ4rDKpVcY697/wBC9GNKufM2ckXF72MGXua0dpwsNmiccNkYTyDgqMdOaoudk7aiRlWD1+uRIDv1sq9Fqrjo7abnP19ZRtfLxeHFhd36pGfHKtOF58MSUudbT9foLZNLtS14I50YMn9kr3yA+zmRgYD82DrY/lU4XVTU8NLA2CmibFEwe6xmwBdqUzL1kXytS1slqhyQUSrdHaAf2hrcszHTOezB3ZLi3H01l4rZQ+0aQxW+MEg1jYicfZ18EqY1UVPaH3GoLtYOndO87tpOdX6+q49ElnfX3ua9VDT1VNrajiNjpnjbjuByfxBaTh9ssi2c/wCnSQvkJV1xXnqXEiIrsqwiIgAiIgAqj6StFJbTUnSOy5YwvBqGN/ynE/GOwneOfPOy3FEtOdIrVR2Svo5KmKWqmhfC2Bjg5wLhjbjcB2riaTWmd1tqXQiehF9/a1LPBKxsc9OQSG7ntPHyP1Ck6p2xXX9jXqOqjyYgdWZo+0w/nuPgrgikZLGySJzXseMtc05DhzB4rG8UxFRbuK+L/GW9NnOuvc5IijmljrrT9VU2+SQQRjMjY9pBzvPZ9dySop+tYobS37JJS5Vs3dZSipa0EkPbuIXmp7b1UjXSvDg05DQopDphcm7Jo6eUdrCD5H8l2O00rT8FLTD8WsfQhPPhOUvC/c5WQtaJxlFBKG53y8V8TYJnNDXgu1G6rGD73PuKnaVysWWM1GTW3/g9hPm7BdFdVR0VHPUz7GRML3eAXedm9QTpGvIa1logf75IfUEH+FvoT4LzEx3kXKH7/YLJ8sdmrt8dz05vUVEzEUIPWSau1sTeLjzO3Z342bSrxs1sprRbYaCijLIIm4GdpJ3kntJ2qqeim+W60VNTDXyNhFU1nVzP2NBaXZBPD4vJXFBPDURiSCVksbtzmODgfELc0VwrjywWkVF05Sl1OxERTEIREQAREQAVc6adG7rvXS3GzVDKeonOtNDLnq3u+YED3SeOw57DvsZF41s9UmntHzjpFopd9HGxvuVOOrkJDJI3azc8ieB5ePJbLQvShttLbfcXn2Qk9XKT+5Pb930PleVZSU9bTSU9XA2aGQYcx4yCFWekPRWdd09hnDmn/T1DsEDkHcfH6lK5OLC+DhLsMV3aeyRghzQ5pBBGQRxTd29ygVv/ALTaLuEFVbap9IDtjewua0fdeMgfrZxUrtN7pLpC58ZdEWnUcyUYLXeiyOXw+7Ge31j7/OxZQtjM667Ry2VrtZ0Jif8ANCdXy3eS80GiFtY/MpqJR8r5AB5AeqkAIO457kUMczIjHlU2dOuPo66eCGmhbFBEyNg+ywYH0XYuqaqhiZrSStaOROSopcNJrhcGOg0doKmTh14hc8+DQPXPcvcfFuypfBb9sJzjWupsNKtJILJAY4tR9c8HUjO5o+Z3YOA492VWVLT114uTYacSVFZUyeL3HjngO3cB3KY2vo3vtznE9fija86z5ah+vIe0NBznvwrO0Y0VtmjcJFFEXzuGJamXBe/mOwbtnYN52rWYOBHGjpd33ZXXX8zK3tXRReJpmi51VPS0/wBoQuMjz2bgB35PcVbdrt1PaqGnoaOMMp4G6jBv2cz2k7+Z2r2orFRSFZScu4REXpyEREAEREAFjI5pkc1F7/pAYnOpre4GQHEkny9g7VBkZEKIc0yWmmd0uWBua+60dB+/lHWY+Bu1x8P6qP1WlsxOKSmaxvzSHWJ8Bj1Ubc5znOc5xc520uJzntPasLP3cVvsfw+KLynhtMF8urNjNfbnNtNXIwcmAN9Nq8E00kz2vmlkkcBjWe4k+a4rDlW3WWWR+TbHPpQgvitGBs+EkLJeeZ+pWESRxoAuG447l7orpXxD3Kyo8X63qvCFyTNEpw6xejqNcZL5I3dNpRcI/wB91c4+83VPlj0W7oNJqKpOpMHU7z8/w/X+oChKKxq4jkVP/wBbX6/myC3h9FnjX2LUDmuALSCDtBB3pkc1X1nvVRbngEmWnJ96InzH67+anNJVRVdO2eB+tG7cfyKv8TNhkrp0fopMnEnQ+vVez0oiJ0VCIiACIsZHMIA0mklzNDR9VC7/ABE2Q37o4uUG+vic95XuvVaa+4zTZOpnVjHJo3f18V4lkc7Jd9za7LsafCx/o1JPu+5hFlEmNmEWUQBxwmquSLzlR5yowiyi9PTCLKIAwt1o1dPYazqZXYp5jtzsDHc+7gtMnopabZVTU490R3VRtg4S8lp5B4hZWq0ervbbYxzz/ex/3b+8f+YW1WyrsVkFOPZmTnBwk4vugiIuzkLU6RVD6e0zmMOL3jUBaN2d57NmVtl5bh/8U34SoMltUya9P+CSppWRbXkrTITOzPBei6NDJvcAbnkMLyHY7ZsysVF7WzWwfNHZzymVxRdHRyymVxRAHLKZXFEAcsplcUQByymVxRAHLKE43rgfiWR+6zxR4DxskOhtS5lfJT4cY5GZOz4SNxPft8lNlHtFmtbG/VaB7o3BSFajhLbxU/v/ACZjPkpXtpBERWQmf//Z" />
              </div>
              <div className="data">
                <h5>Ankita sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal />
                </p>
              </div>
            </div>
            <div>
              <div className="img">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="data">
                <h5>Shekher sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal />
                </p>
              </div>
            </div>
            <div>
              <div className="img">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="data">
                <h5>Avi sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal />
                </p>
              </div>
            </div>
            <div>
              <div className="img">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="data">
                <h5>Avineet sharma</h5>
                <p>Tuesday, 26 December 2023</p>
              </div>
              <div className="child11">
                <p>
                  <HiDotsHorizontal />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  margin-top: 12px;
  padding: 16px;
  flex-wrap: wrap;
  justify-content: space-around;

  .char1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 18px;
    padding: 10px;
    margin-top: 50px;
    width: 30%;
    border-radius: 21px;

    height: 46vh;
    .curent {
      font-size: 1.125rem;
      font-weight: 600;
      font-family: Roboto, sans-serif;
      letter-spacing: 0;
      color: rgba(61, 78, 101, 0.84);
    }
    border-radius: -1px -1px 0 0;
    .price {
      letter-spacing: 2.1px;
      color: #112b4a;
      text-align: center;
      margin-right: 63px;
    }
    p {
      margin-top: 5px;
      margin-right: 26px;
      text-align: center;
      color: rgba(55, 77, 103, 0.54) !important;
    }
  }
  .char1:hover {
    
  }

  .char {
    width: 50%;
    margin-left: 23px;
    /* box-shadow: 0px 1px 4px 0px; */
    margin-top: 50px;
    /* background-color: green; */
  }

  .chart1 {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 23px;

    .upcoming {
      display: flex;
      flex-direction: column;
      min-height: 51vh;
      min-height: 51vh;
      height: 51vh;
      width: 57%;
      margin-top: 35px;
      /* border: 1px solid black; */
    
      .div1 {
        display: flex;
        justify-content: space-between;
        .none {
          text-align: center;
        }
        p {
          font-size: 1.2rem;
          font-weight: 600;
          font-family: Roboto, sans-serif;
          letter-spacing: 0;
          color: rgba(61, 78, 101, 0.84);
          margin: 20px;
        }
        .datapicker {
          display: flex;

          .p1 {
            border: 2px solid #0088ff;
            border-radius: 12px;
            text-align: center;
            color: white;
            cursor: pointer;
            font-weight: 500;
            font-size: 23px;
            width: 120px;
            height: 9px;
            margin-top: 18px;
            padding: 14px;
            margin-right: 15px;
            background: #0088ff;
          }
        }
      }
    }

    .upcoming1 {
      display: flex;
      flex-direction: column;
      min-height: 51vh;
      height: 51vh;
      min-width: 35%;
      margin-top: 35px;

      /* border: 1px solid black; */
      h1 {
        margin: 14px;
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      .upcomming_child {
        .child1 {
          display: flex;
          align-items: center;
          justify-content: space-between;

          p {
            width: 9%;
            font-size: 25px;
            cursor: pointer;
          }
        }
      }
      .upcomming_child1 {
        display: flex;
        /* align-items: center; */
        flex-direction: column;

        h1 {
          display: flex;
        }
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
          .child11 {
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
    }
  }
  .char:hover {
   
  }
`;
