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
          height={500}
          width={"100%"}
          series={chartData.series}
          options={{
            title: { text: "Orders " },
            chart: { stacked: true },
            xaxis: {
              title: { text: "Month" },
              categories: chartData.categories
            }, colors: ['#8ee9de', '#33FF57', '#be191d', '#1b2245']
          }}
        />
      )}
    </div>
  )
}

