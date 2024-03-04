import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

class DailyReportChart extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = [props?.data?.close_status, props?.data?.hot_lead, props?.data?.cold_lead,props?.data?.totaldata];
    console.log("hash111111",seriesData)
    this.state = {
      series: seriesData,
      options: {
        chart: { 
          type:'donut',  
        },
      
        labels: ["Close Client","Hot Client","Cold Client","Total Client"],
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
                position: "bottom",
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

export default DailyReportChart;


const Root = styled.section`


.chaasasart{
  margin-top: 39px;
}
`;
