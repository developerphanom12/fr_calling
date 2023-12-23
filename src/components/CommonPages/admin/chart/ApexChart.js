import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 340,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
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




  componentDidMount() {
    this.updateChartWidth();
    window.addEventListener("resize", this.updateChartWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateChartWidth);
  }

  updateChartWidth = () => {
    const windowWidth = window.innerWidth;

    // Define breakpoints and corresponding chart widths
    const breakpoints = [480, 768, 992, 1200];
    const chartWidths = [200, 300, 340, 400];

    // Find the correct chart width based on the window width
    let width = 340; // Default width
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      if (windowWidth <= breakpoints[i]) {
        width = chartWidths[i];
      }
    }

    // Update the state with the new chart width
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        chart: {
          ...prevState.options.chart,
          width,
        },
      },
    }));
  };


  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={340}
        />
      </div>
    );
  }
}
export default ApexChart;
