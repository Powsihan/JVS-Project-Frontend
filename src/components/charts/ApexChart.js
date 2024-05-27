import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { getVehicleDetails } from '@/src/redux/action/vehicle';


const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: []
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          title: {
            text: 'Count',
            style: {
              color: "var(--primary-color)",
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Type',
            style: {
              color: "var(--primary-color)",
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    this.fetchChartData();
  }

  fetchChartData = () => {
    getVehicleDetails((response) => {
      if (response.status === 200) {
        const vehicles = response.data;

        const typesCount = {};
        vehicles.forEach(vehicle => {
          typesCount[vehicle.type] = (typesCount[vehicle.type] || 0) + 1;
        });

        const categories = Object.keys(typesCount);
        const data = categories.map(type => typesCount[type]);

        this.setState(prevState => ({
          series: [{ data }],
          options: {
            ...prevState.options,
            xaxis: {
              categories: categories.map(category => [category]),
              labels: {
                style: {
                  colors: colors,
                  fontSize: '12px'
                }
              }
            }
          }
        }));
      } else {
        console.error('Error fetching chart data:', response.statusText);
      }
    });
  };

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
