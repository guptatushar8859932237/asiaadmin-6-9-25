import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Trackorder() {
  const [orderdata, setOrderdata] = useState({ status: "", description: "" });
  const [countdata, setCountdata] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dataordwer = location?.state?.data[0];
  const handlechange = (e) => {
    const { name, value } = e.target;
    setOrderdata({ ...orderdata, [name]: value });
  };
  const handleclick = () => {
    const datapost = {
      order_id: dataordwer?.order_id,
      status: orderdata.status,
      description: orderdata.description,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-order-status`, datapost)
      .then((response) => {
        toast.success(response.data.message);
        // Update the timeline status
        getorderstatus(); // Re-fetch the status to refresh the timeline with the latest data
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };
  const getorderstatus = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-order-status`, {
        order_id: "OR000" + dataordwer?.order_id,
      })
      .then((response) => {
        setCountdata(response.data.data);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to fetch order status"
        );
      });
  };
  useEffect(() => {
    getorderstatus();
  }, []);

  const handleclicknav = () => {
    navigate("/Admin/order");
  };

  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="row  manageFreight">
            <div className="col-12">
              <div className="d-flex  ">
                <div className="d-flex">
                  <div>
                    <ArrowBackIcon
                      onClick={handleclicknav}
                      className="text-dark"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <h4 className="freight_hd text-start mt-0 ms-3">Update Order Status</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4 noFormaControl">
            <div className="card-body">
              <div className="row align-items-end manageFreight mt-4">
                <div className="col-3">
                  <label className="track_label">Order Id</label>
                  <input
                    className="form-control"
                    disabled
                    value={`OR000${dataordwer?.order_id}` || ""}
                  />
                </div>
                <div className="col-3">
                  <label className="track_label">New Status</label>
                  <select 
                    onChange={handlechange}
                    name="status"
                    value={orderdata.status}
                  >
                    <option value="">Select...</option>
                    <option>Collected from supplier</option>
                    <option>Received at Asia Direct warehouse</option>
                    <option>Dispatched to port</option>
                    <option>Goods at origin port</option>
                    <option>Goods are in transit</option>
                    <option>Arrived at destination port</option>
                    <option>Customs clearing in progress</option>
                    <option>Customs released</option>
                    <option>Goods in transit to warehouse</option>
                    <option>Arrived at Asia Direct warehouse</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>
                </div>
                <div className="col-3">
                  <label className="track_label">Description</label>
                  <input
                    className="form-control"
                    name="description"
                    onChange={handlechange}
                    value={orderdata.description}
                  />
                </div>
                <div className="col-3">
                  <div className="">
                    <button
                      type="button"
                      className="up_datebtn"
                      onClick={handleclick}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
              <div className="row my-5 ">
                <div className="col-12">
                  <div className="track-result">
                    <div className="track-result-block">
                      <div className="track-result-id">
                        <b>Order Tracking:</b> {`OR000${dataordwer?.order_id}`}
                      </div>
                      {/* <div className="track-status">
                        <div className="row">
                          <div className="col-12 col-lg-4"><b>Shipping Via:</b> {dataordwer?.shipping_via}</div>
                          <div className="col-12 col-lg-4"><b>Status:</b> {dataordwer?.current_status}</div>
                          <div className="col-12 col-lg-4"><b>Expected Date:</b> {dataordwer?.expected_date}</div>
                        </div>
                      </div> */}
                      <div className="track-result-bar">
                        <ul className="track-progress">
                          {countdata.map((item, index) => (
                            <li
                              key={index}
                              className={`icon-confirm-order ${
                                item?.is_completed === "1"
                                  ? "icon-green track-active"
                                  : ""
                              } ${
                                item?.status === orderdata.status
                                  ? "icon-highlight"
                                  : ""
                              }`}
                            >
                              <i class="fi fi-rr-check check_track"></i>
                              {item?.status}
                              {/* {item?.is_completed === "1" && (
                                <small>{new Date(item?.created_at).toLocaleDateString("en-GB")}</small>
                              )} */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
