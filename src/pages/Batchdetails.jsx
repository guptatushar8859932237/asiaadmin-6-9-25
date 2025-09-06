import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Batchdetails() {
  const navigate = useNavigate();
  const infolocation = useLocation();
  const info1 = infolocation?.state?.data;
  console.log(infolocation?.state?.data);
  const handleclicknav = () => {
    navigate("/Admin/BatchesOrder");
  };
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="formDetails">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex">
                <div>
                  <ArrowBackIcon
                    onClick={handleclicknav}
                    className="text-dark"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div>
                  <h4 className="freight_hd ms-3">Batch's Details</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <label className="hd_label">Batch Number</label>
                  <p className="det_input">{info1?.batch_number}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Agent</label>
                  <p className="det_input">{info1?.agent}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Batch Name</label>
                  <p className="det_input">{info1?.batch_name}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Costs to collect</label>
                  <p className="det_input">{info1?.costs_to_collect}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="hd_label">Costs to dispatch</label>
                  <p className="det_input">{info1?.costs_to_dispatch}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Date Dispatch</label>
                  <p className="det_input">
                    {" "}
                    {new Date(info1?.date_dispatched).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                  </p>
                </div>
                <div className="col">
                  <label className="hd_label">Date Start</label>
                  <p className="det_input">
                    {new Date(info1?.date_start).toDateString("en-CA")}
                  </p>
                </div>
                <div className="col">
                  <label className="hd_label">Destination</label>
                  <p className="det_input">{info1?.destination}</p>
                </div>
              </div>
              <div className="horizontalLine"></div>
              <div className="row">
                <div className="col">
                  <label className="hd_label">Forwarding Agent</label>
                  <p className="det_input">{info1?.forwarding_agent}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Freight</label>
                  <p className="det_input">{info1?.freight}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Time in storage</label>
                  <p className="det_input">{info1?.time_in_storage}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Total Dimensions</label>
                  <p className="det_input">{info1?.total_dimensions}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="hd_label">Total Weight</label>
                  <p className="det_input">{info1?.total_weight}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Warehouse Cost</label>
                  <p className="det_input">{info1?.warehouse_cost}</p>
                </div>
                <div className="col">
                  <label className="hd_label">Waybill</label>
                  <p className="det_input">{info1?.waybill}</p>
                </div>
              </div>
              <div className="horizontalLine"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
