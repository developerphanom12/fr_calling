import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

class CircleChat extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = [props?.data?.totalcount?.cold_count,props?.data?.totalcount?.ghost_client_count, props?.data?.totalcount?.close_status_count,props?.data?.totalcount?.hot_lead_count,props?.data?.totalcount?.negative_client_count,props?.data?.totalcount?.prospective_client_count];
    console.log("hash",seriesData)
    this.state = {
      series: seriesData,
     options: {
  chart: {
    type: 'donut',
  },
  labels: ["Cold Client", "Ghost Client","Close Client", "Hot Client", "Negative Client" ,"Prospective Client"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 350,
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "bottom", // Change position to "bottom"
        },
      },
    },
  ],
},

    };
  }
  render() {
    return (
      <Root>


      <div className="chaasasart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
      </Root>
    );
  }
}

export default CircleChat;


const Root = styled.section`


.chaasasart{
  margin-top: 39px;
}
`;
