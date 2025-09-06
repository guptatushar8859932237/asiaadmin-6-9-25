import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ShipArrivalChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Cash Flow",
        data: [
          20.42, 30.6, 46.1, 50.2, 14.16, 11.1, -6.09, -12.34, -17.88, -43.07,
          -36.07, -18, -8, -10, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8,
          27.03, 54.4, 47.2, 43.3, 18.6, -48.6, -41.1, -39.6, -37.6, -29.4,
          -21.4, -2.4,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100,
                to: 100,
                color: "#1b2245"
              },
              {
                from: -50,
                to: 0,
                color: "#be191d",
              },
            ],
            positive: "#0b4170", 
          },
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: "Growth",
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "%";
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2011-01-01",
          "2011-02-01",
          "2011-03-01",
          "2011-04-01",
          "2011-05-01",
          "2011-06-01",
          "2011-07-01",
          "2011-08-01",
          "2011-09-01",
          "2011-10-01",
          "2011-11-01",
          "2011-12-01",
          "2012-01-01",
          "2012-02-01",
          "2012-03-01",
          "2012-04-01",
          "2012-05-01",
          "2012-06-01",
          "2012-07-01",
          "2012-08-01",
          "2012-09-01",
          "2012-10-01",
          "2012-11-01",
          "2012-12-01",
          "2013-01-01",
          "2013-02-01",
          "2013-03-01",
          "2013-04-01",
          "2013-05-01",
          "2013-06-01",
          "2013-07-01",
          "2013-08-01",
          "2013-09-01",
        ],
        labels: {
          rotate: -90,
        },
      },
    },
  });

  return (
    <div>
      <div id="chart" className="chartArrival">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ShipArrivalChart;
