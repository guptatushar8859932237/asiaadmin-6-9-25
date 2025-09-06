
import React from "react";
import ReactApexChart from "react-apexcharts";

const Verticalchart = () => {
  // Sample data for the basic bar chart
  const chartData = {
    series: [
      {
        name: "Series 1",
        data: [30, 40, 45, 50],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "50px",
          endingShape: "flat",
        },
      },
      colors: ['#1b2245'],
      stroke: {
        show: true,
        width: 2,
      },
      
      xaxis: {
        categories: [
          "Status",
          "In-Trsansit",
          "At Local Port",
          "Ready for Dispatch",
        ],
      },
  
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
        width="100%"
      />
     
    </div>
  );
};

export default Verticalchart;
