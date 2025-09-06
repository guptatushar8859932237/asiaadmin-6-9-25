import React from 'react';
import ReactApexChart from 'react-apexcharts';
const Barchart = () => {
  const chartData = {
    series: [
      {
        name: 'Accepted',
        data: [14, 25, 21, 17, 15, 3, 7, 9, 12, 18, 57, 44],
        colors: "#0b4170"
      },
      {
        name: 'Rejected',
        data: [20, 10, 20, 10, 14, 50, 20, 1, 2, 54, 1, 2],
      },
      {
        name: 'Partial',
        data: [10, 20, 15, 10, 25, , 35, 45, 20, 10, 10, 20],
      },
      {
        name: 'Pending',
        data: [10, 20, 15, 10, 25, , 35, 45, 20, 10, 10, 20],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: ['january', 'febuary', 'March', 'April', 'May', "june", "july", "August", 'September', 'October', 'November', 'December'],
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <>
      <div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
      <h3 className='text-center'>Count of Status</h3>
    </>
  );
};

export default Barchart;