import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart2 extends  React.Component {
  constructor(props) {
    super(props);

    const seriesData = props.data ? props.data.map(item => item.total_sales) : [0];
    const categories = props.data ? props.data.map(item => item.month) : [0];

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Sales Check By year",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: categories,
          text : 'sales'
        },
      },
      series: [
        {
          name: "Total Sales",
          data: seriesData,
        },
      ],
    };
  }
  render() {
    console.log("sssss",this.props)

    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart2;
