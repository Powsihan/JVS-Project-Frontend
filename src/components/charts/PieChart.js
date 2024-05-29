import React, { Component } from "react";
import dynamic from "next/dynamic";
import { getVehicleDetails } from "@/src/redux/action/vehicle";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      series: [],
      options: {
        chart: {
          width: 500,
          type: "donut",
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient",
        },
        legend: {
          formatter: function (val, opts) {
            return (
              this.state.data[opts.seriesIndex].name +
              " - " +
              opts.w.globals.series[opts.seriesIndex]
            );
          }.bind(this),
          offsetX: -30,
          offsetY: -20,
        },
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
    getVehicleDetails((response) => {
      const data = response.data;
      const brandCounts = data.reduce((counts, vehicle) => {
        counts[vehicle.brand] = (counts[vehicle.brand] || 0) + 1;
        return counts;
      }, {});

      const seriesData = Object.keys(brandCounts).map((brand) => ({
        name: [brand],
        data: brandCounts[brand],
      }));

      this.setState({
        data: seriesData,
        series: seriesData.map((item) => item.data),
      });
    });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={395}
        />
      </div>
    );
  }
}

export default PieChart;
