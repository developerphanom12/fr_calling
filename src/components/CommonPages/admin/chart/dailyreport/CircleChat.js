import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

class CircleChat extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = [
      props?.data?.totalcount?.cold_count || 0,
      props?.data?.totalcount?.ghost_client_count || 0,
      props?.data?.totalcount?.close_status_count || 0,
      props?.data?.totalcount?.hot_lead_count || 0,
      props?.data?.totalcount?.negative_client_count || 0,
      props?.data?.totalcount?.prospective_client_count || 0
    ];
 
    this.state = {
      series: seriesData,
      options: {
        chart: {
          type: 'donut',
        },
        labels: ["Cold Client", "Ghost Client", "Close Client", "Hot Client", "Negative Client", "Prospective Client"],
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
    const { series } = this.state;
    const hasData = series.some(value => value > 0);

    return (
      <Root>
        <div className="chart-container">
          {hasData ? (
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="donut"
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </Root>
    );
  }
}

export default CircleChat;

const Root = styled.section`
  .chart-container {
    margin-top: 39px;
  }
`;
