import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart3 extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = [props?.data?.close_status, props?.data?.hot_lead, props?.data?.cold_lead,props?.data?.cold_lead];
    console.log("hash",seriesData)
    this.state = {
      series: [11,11,11,11],
      options: {
        chart: {
          type:'donut',  
        },
      
        labels: ["close status","hot lead","cold lead","cold lead"],
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
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
    );
  }
}

export default ApexChart3;
