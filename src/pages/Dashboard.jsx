import Donutchart from "./Donutchart";
import NegativeValuesBarChart from "./Negativevalue";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
export default function Dashboard() {
  ////////////////////////////All state /////////////////////////////////////////////////////
  const [countdata, setCountdata] = useState();
  const navigaet = useNavigate();
  /////////////////////////////get all count in box/////////////////////////////////////////
  const getcountall = async() => {
    try {
      const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}count-all`)
      if(response.data.success ===true){
        console.log(response.data)
        setCountdata(response.data.details)
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  useEffect(() => {
    getcountall()
  }, [])
  return (
    <>
      <div className="wpWrapper dash_wrap">
        <div className="container-fluid">
          <div class="row">
            <div class="col-lg-3" onClick={() => { navigaet('/Admin/manage-customer') }}>
              <div class="cardDash">
                <h4 className="hd_dash">Clients</h4>
                <div class="iconParent">
                  <div class="cardContent">
                    <p className="para_dash"><CountUp end={countdata?.no_of_clients} /></p>
                  </div>
                  <div class="iconGrad">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
                <div class="cardBottom bg1">
                  <p>View More</p>
                  <i class="fi fi-rr-angle-double-small-right"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3" onClick={() => { navigaet('/Admin/managefreight') }}>
              <div class="cardDash">
                <h4 className="hd_dash">Freights</h4>                                                
                <div class="iconParent">                                                
                  <div class="cardContent">                                                
                    <p className="para_dash"><CountUp end={countdata?.no_of_freights} /></p>                                                
                  </div>                                                
                  <div class="iconGrad">                                                
                    <i className="fa fa-plane"></i>                                                
                  </div>                                                 
                </div>                                                
                <div class="cardBottom bg2">                                                
                  <p>View More</p>                                                
                  <i class="fi fi-rr-angle-double-small-right"></i>                                                
                </div>                                                
              </div>                                                
            </div>                                                
            <div class="col-lg-3" onClick={() => { navigaet('/Admin/order') }}>                                                
              <div class="cardDash">                                                
                <h4 className="hd_dash">Orders</h4>                                                
                <div class="iconParent">                                                
                  <div class="cardContent">
                    <p className="para_dash"><CountUp end={countdata?.no_of_orders} /></p>
                  </div>
                  <div class="iconGrad">
                    <i className="fa fa-truck"></i>
                  </div>
                </div>
                <div class="cardBottom bg3">
                  <p>View More</p>
                  <i class="fi fi-rr-angle-double-small-right"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3" onClick={() => { navigaet('/Admin/custom-clearance-order') }}>
              <div class="cardDash">
                <h4 className="hd_dash">Clearances</h4>
                <div class="iconParent">
                  <div class="cardContent">
                    <p className="para_dash"><CountUp end={countdata?.no_of_clearance} /></p>
                  </div>
                  <div class="iconGrad">
                    <i className="fa fa-bars"></i>
                  </div>
                </div>
                <div class="cardBottom bg1"> 
                  <p>View More</p>
                  <i class="fi fi-rr-angle-double-small-right"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3" onClick={() => { navigaet('/Admin/calculation-order') }} >
              <div class="cardDash">
                <h4 className="hd_dash">Clearance Orders</h4>
                <div class="iconParent">
                  <div class="cardContent">
                    <p className="para_dash"><CountUp end={countdata?.no_Of_clearanceOrder} /></p>
                  </div>
                  <div class="iconGrad">
                    <i className="fa fa-codepen"></i>
                  </div>
                </div>
                <div class="cardBottom bg2">
                  <p>View More</p>
                  <i class="fi fi-rr-angle-double-small-right"></i>
                </div>
              </div>
            </div>
            {/* <div class="col-lg-3" onClick={() => { navigaet('/Admin/invoices') }}>
                <div class="cardDash">
                <h4 className="hd_dash">Invoices</h4>
                <div class="iconParent">
                  <div class="cardContent">
                  <p className="para_dash"><CountUp end={countdata?.no_of_invoices} /></p>
                  </div>
                  <div class="iconGrad">
                    <i className="fa fa-codepen"></i>
                  </div>
                </div>
                <div class="cardBottom bg2">
                  <p>View More</p>
                  <i class="fi fi-rr-angle-double-small-right"></i>
                </div>
                </div>
              </div> */}
          </div>
          <div className="chart mt-3">
            <div className="row">
              <div className="col-lg-7">
                <div className="h-100 chartCol card">
                  <h4 className="graph_hd">Freight Status</h4>
                  <NegativeValuesBarChart />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="card h-100 pieSpace">
                  <h4 className="graph_hd">Freights</h4>
                  <Donutchart />
                  <p className="mb-0 text-center">All Freight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
