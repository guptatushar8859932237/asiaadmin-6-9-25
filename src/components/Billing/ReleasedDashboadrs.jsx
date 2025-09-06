import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function ReleasedDashboadrs() {
  const [data, setData] = React.useState([]);
  const [dataitem, setDataitem] = React.useState("");
  useEffect(() => {
    getdatatable();
  }, []);

  const getdatatable = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}GetRealeseDashboard`
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlechangedropdown = (e, item2) => {
    const data1 = e.target.value;
    console.log(data1, item2);

    handlehitapi(data1, item2);
  };

  const handlehitapi = async (data1, item2) => {
    setDataitem(data1);
    try {
      const datapost = {
        order_id: item2.order_id,
        invoice_id: item2.id,
        cargo_inspection: data1,
        release_instruction: item2.release_instruction,
        Status: data1 === "Confirmed" ? "Close" : "Open",
        realese_id: item2.realese_id,
      };
      console.log(datapost);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}ManageRealeseDashboard`,
        datapost
      );
      console.log(response);
      getdatatable();
      if (response.data.status === 200) {
        toast.success("Data Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="row manageFreight">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="freight_hd">Released Dashboard</h4>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <div className="me-2">
                    <input
                      className="py-1 rounded ps-1"
                      type="text"
                      placeholder="Search"
                      id="outlined-basic"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-striped tableICon">
              <thead>
                <tr>
                  <th scope="col">Order Number</th>
                  <th scope="col">Costumer Name</th>
                  <th scope="col">clearing Status</th>
                  <th scope="col">cargo Inspection</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Release Instruction</th>
                  <th scope="col">Delivery</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody style={{ border: "none" }}>
                {data &&
                  data.length > 0 &&
                  data.map((item, index) => {
                    console.log(item);
                    return (
                      <tr className="border-bottom" key={index}>
                        <td>{item.order_number	}</td>
                        <td>{item.order_user_name}</td>
                        <td>{item.clearance_status}</td>
                        <td>
                          <select
                            onChange={(e) => {
                              handlechangedropdown(e, item);
                            }}
                            value={item.cargo_inspection}
                            name="status"
                          >
                            <option value="">Select...</option>
                            <option value="Inprogress">In Progress</option>
                            <option value="Querry">Querry</option>
                            <option value="Confirmed">Confirmed</option>
                          </select>
                        </td>
                        <td>{item.status}</td>
                        <td>
                          {item.release_instruction }
                        </td>
                        <td>{item.order_status}</td>
                        <td>
                          {" "}
                          {item.cargo_inspection === "Confirmed"
                            ? "Close"
                            : "Open"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
