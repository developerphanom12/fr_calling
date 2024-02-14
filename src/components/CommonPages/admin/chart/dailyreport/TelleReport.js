import React from 'react';
import ReactApexChart from 'react-apexcharts';

class TelleReport extends React.Component {
  constructor(props) {
    super(props);

    const seriesData = props.data?.data ? props.data?.data.map(item => item.total_sales) : [0];
    const categories = props.data?.data ? props.data?.data.map(item => item.day) : [0];

    this.state = {
      series: [{
        name: 'Total Sales',
        data: seriesData,
      }],
      options: {
        chart: {
          height: 350,
          type: 'area', 
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: categories,
          title: {
            text: 'Day',
          },
        },
        yaxis: {
          title: {
            text: 'Total Sales',
          },
        },
        title: {
          text: 'Today\'s Sales',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          }
        },
      },
    };

    console.log("series", this.state.series);
    console.log("categories", categories);
  }

  render() {
    console.log("props", this.props);
    return (
      <div id="chart" style={{ width: "100%" }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
          
        />
      </div>
    );
  }
}

export default TelleReport;
