import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';


class DailyReportChart extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = [
      props?.data?.close_status || 0,
      props?.data?.hot_lead || 0,
      props?.data?.cold_lead || 0,
      props?.data?.totaldata || 0
    ];

    this.state = {
      series: seriesData,
      options: {
        chart: { 
          type: 'donut'
        },
        labels: ["Close Client", "Hot Client", "Cold Client", "Total Call"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 350,
                type: 'donut'
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  }

  render() {
    return (
      <Root>
        <div className="chart-container">
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

margin-top: 39px;

.chaasasart{
}
`;
