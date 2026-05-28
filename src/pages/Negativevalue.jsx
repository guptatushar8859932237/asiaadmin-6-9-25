import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export default function Negativevalue() {
  const [chartData, setChartData] = useState(null);

  const getStackedData = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}count-graph`)
      .then((response) => {
        const data = response.data.data;
        console.log(data)
        const categories = data.map(item => item.month);
        const seriesData = [
          {
            name: "Rejected freight",
            data: data.map(item => item.rejected_orders)
          },
          {
            name: "Partial freight",
            data: data.map(item => item.partial_orders)
          },
          {
            name: "Accepted freight",
            data: data.map(item => item.accepted_orders)
          },
          {
            name: "Pending freight",
            data: data.map(item => item.pending_orders)
          }
        ];
        setChartData({ categories, series: seriesData });
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  useEffect(() => {
    getStackedData();
  }, []);

  return (
    <div>
      {chartData && (
        <Chart
          type='bar'
          height={350}
          width={"100%"}
          series={chartData.series}
          options={{
            chart: { 
              stacked: true,
              toolbar: { show: false },
              fontFamily: 'inherit'
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                columnWidth: '40%'
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 0
            },
            xaxis: {
              categories: chartData.categories,
              labels: {
                style: { colors: '#6c757d', fontSize: '13px' }
              },
              axisBorder: { show: false },
              axisTicks: { show: false }
            },
            yaxis: {
              labels: {
                style: { colors: '#6c757d', fontSize: '13px' }
              }
            },
            grid: {
              borderColor: '#f1f1f1',
              strokeDashArray: 4,
              yaxis: { lines: { show: true } },
              padding: { top: 0, right: 0, bottom: 0, left: 10 }
            },
            colors: ['#e74a3b', '#f6c23e', '#1cc88a', '#0b4170'],
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              markers: { radius: 12 }
            },
            tooltip: {
              theme: 'light',
              y: { formatter: function (val) { return val + " orders" } }
            }
          }}
        />
      )}
    </div>
  )
}

