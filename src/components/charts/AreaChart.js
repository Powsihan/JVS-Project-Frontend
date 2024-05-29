import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { getSalesDetails } from '@/src/redux/action/sales';
import { toast } from 'react-toastify';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'category'
        },
        tooltip: {
          x: {
            format: 'MMM yyyy'
          },
        },
      },
    };
  }

  componentDidMount() {
    this.fetchSalesData();
  }

  fetchSalesData() {
    getSalesDetails((res) => {
      if (res && res.data) {
        const salesData = res.data;
        const groupedData = this.groupSalesByStatusAndMonth(salesData);
        this.setState({ series: groupedData });
      } else {
        console.error("Error fetching Sales details", res);
        toast.error("Error fetching Sales details");
      }
    });
  }

  groupSalesByStatusAndMonth(salesData) {
    const salesCountByMonth = {
      Buy: {},
      Sale: {}
    };
  
    const currentYear = new Date().getFullYear();
   
    for (let month = 1; month <= 12; month++) {
      const monthYear = `${currentYear}-${month.toString().padStart(2, '0')}`;
      salesCountByMonth.Buy[monthYear] = 0;
      salesCountByMonth.Sale[monthYear] = 0;
    }
  
    salesData.forEach(sale => {
      const saleYear = new Date(sale.creationDate).getFullYear();
      if (saleYear === currentYear) {
        const monthYear = sale.creationDate.split('-').slice(0, 2).join('-');
        if (salesCountByMonth[sale.status][monthYear]) {
          salesCountByMonth[sale.status][monthYear]++;
        } else {
          salesCountByMonth[sale.status][monthYear] = 1;
        }
      }
    });
  
    const sortedMonths = Object.keys(salesCountByMonth.Buy).sort();
    const seriesData = Object.keys(salesCountByMonth).map(status => ({
      name: status,
      data: sortedMonths.map(monthYear => ({
        x: monthYear,
        y: salesCountByMonth[status][monthYear]
      }))
    }));
  
    return seriesData;
  }
  
  

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default AreaChart;
