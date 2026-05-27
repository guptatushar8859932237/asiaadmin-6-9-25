
import { React, useEffect, useState } from "react";
import axios from "axios";
import Chart from 'react-apexcharts'

const Donutchart = () => {
  const [data, setData] = useState({})
  const [data1, setData1] = useState({})
  const [data2, setData2] = useState({})

  const getapidata = async () => {
    const datuser = await axios.post(`${process.env.REACT_APP_BASE_URL}count-of-freight`)
    const response = await datuser.data.data
    setData(response[0].air_freight_count)
    setData1(response[0].road_freight_count)
    setData2(response[0].sea_freight_count)
  }

  useEffect(() => {
    getapidata()
  }, [])

  return (
    <>
      <div className="pie_chart">
        <div id="chart">
          <Chart
            type="donut"
            width={"100%"}
            height={350}
            series={[parseInt(data) || 0, parseInt(data1) || 0, parseInt(data2) || 0]}
            options={{
              labels: ['Air Freight', 'Road Freight', 'Sea Freight'],
              colors: ['#0b4170', '#1cc88a', '#e74a3b'],
              chart: {
                fontFamily: 'inherit'
              },
              dataLabels: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '70%',
                    labels: {
                      show: true,
                      name: { fontSize: '14px', color: '#6c757d' },
                      value: { fontSize: '24px', fontWeight: 700, color: '#1b2245' },
                      total: {
                        show: true,
                        label: 'Total',
                        color: '#6c757d',
                        formatter: function (w) {
                          return w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0)
                        }
                      }
                    }
                  }
                }
              },
              stroke: { width: 0 },
              legend: {
                position: 'bottom',
                markers: { radius: 12 },
                itemMargin: { horizontal: 10, vertical: 5 }
              },
              tooltip: {
                theme: 'light'
              }
            }}
          >
          </Chart>
        </div>
        <div id="html-dist"></div>
      </div>
    </>
  );
};

export default Donutchart;

