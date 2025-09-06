
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
            type="pie"
            width={330}
            height={520}
            series={[parseInt(data), parseInt(data1), parseInt(data2)]}
            options={{
              labels: ['Air Freight', 'Road Freight', 'Sea Freight'], colors: ['#9eece3', '#be191d', '#1b2245']
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

