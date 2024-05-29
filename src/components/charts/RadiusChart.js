import React, { Component } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

class RadiusChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 220,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "65%",
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: props.color || "#000",
                fontSize: "13px",
              },
              value: {
                color: props.color || "#000",
                fontSize: "20px",
                show: true,
              },
            },
          },
        },
        labels: [props.label],
        colors: [props.color || "#000"],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={[this.props.series]}
            type="radialBar"
            height={250}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default RadiusChart;
