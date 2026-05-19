import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
export default function Shipmentdeailspage() {
  const navigate = useNavigate();
  const [datat1, setDatat1] = useState("");
  const [tabledata, setTabledata] = useState([]);
  const [tabledata1, setTabledata1] = useState([]);
  const location = useLocation();
  const [documents, setDocuments] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const datat = location.state.data[0];
  console.log("datat", datat);
  const handleclick = () => {
    navigate("/admin/manage-shipment");
  };
  useEffect(() => {
    GetShipmentDetails();
  }, []);
  const GetShipmentDetails = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}GetShipmentDetails`, {
        shipment_id: location.state.data[0].id,
      })
      .then((response) => {
        console.log(response.data);
        setDatat1(response.data.shipment);
        setTabledata(response.data.details);
        setTabledata1(response.data.clearance);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const GetFreightImages = () => {
    const data = { shipment_id: datat.id, uploaded_by: "1" };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}GetFreightImages`, data)
      .then((response) => {
        console.log(response.data.data);
        setDocuments(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };
  useEffect(() => {
    GetFreightImages();
  }, []);

  const handleOpenStatusModal = () => {
    setShipmentStatus(datat1?.status || "");
    setStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModal(false);
  };
  const handleUpdateStatus = async () => {
    try {
      const payload = {
        shipment_id: datat.id,
        status: shipmentStatus,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update-shipment-status`,
        payload,
      );

      if (response.data.success) {
        toast.success("Status Updated Successfully");

        handleCloseStatusModal();

        GetShipmentDetails();
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update status");
    }
  };
  const deleteapi = (id) => {
    console.log(id);
    const data11 = {
      doc_id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}ShipmentDocument`, data11)
      .then((response) => {
        GetFreightImages();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div>
          <div>
            <div className="row">
              <div className="container">
                <div className="client_details">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          style={{ cursor: "pointer" }}
                          onClick={handleclick}
                          className="mt-2 me-2"
                        />
                      </div>
                      <h2 className="me-3">Shipment Details</h2>
                    </div>

                    <div className="mb-2 ">
                      <button
                        className="btn btn-primary"
                        onClick={handleOpenStatusModal}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-6">
                      <div className="cardShip">
                        <div className="parentShipDetail">
                          <div>
                            <strong>Freight</strong>
                          </div>
                          <div>
                            <p>{datat1?.freight}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Waybill</strong>
                          </div>
                          <div>
                            <p>{datat1.waybill}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Carrier</strong>
                          </div>
                          <div>
                            <p>{datat1?.carrier}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Vessel</strong>
                          </div>
                          <div>
                            <p>{datat1?.vessel}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Container No</strong>
                          </div>
                          <div>
                            <p>{datat1?.container}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>House Bill</strong>
                          </div>
                          <div>
                            <p>{datat1?.load}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Release Type</strong>
                          </div>
                          <div>
                            <p>{datat1.release_type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="cardShip">
                        <div className="parentShipDetail">
                          <div>
                            <strong>Origin Agent</strong>
                          </div>
                          <div>
                            <p>{datat1?.origin_agent}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Country of Origin</strong>
                          </div>
                          <div>
                            <p>{datat.origin_country_name}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Port of Loading</strong>
                          </div>
                          <div>
                            <p>{datat1?.port_of_loading}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>ETD</strong>
                          </div>
                          <div>
                            <p>
                              {new Date(datat1?.ATD).toLocaleDateString(
                                "en-GB",
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Destination Agent</strong>
                          </div>
                          <div>
                            <p>{datat1?.destination_agent}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Country of Destination</strong>
                          </div>
                          <div>
                            <p>{datat.des_country_name}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Port of Discharge</strong>
                          </div>
                          <div>
                            <p>{datat1?.port_of_discharge}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>ETA</strong>
                          </div>
                          <div>
                            <p>
                              {new Date(datat1?.ETD).toLocaleDateString(
                                "en-GB",
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <div className="cardShip">
                        <div className="parentShipDetail">
                          <div>
                            <strong>Status</strong>
                          </div>
                          <div>
                            <p>{datat1.status}</p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Master Bill </strong>
                          </div>
                          <div>
                            <p>
                              {datat1?.document ? (
                                <a
                                  href={`${process.env.REACT_APP_BASE_URLdocument}${datat?.document}`}
                                >
                                  View Documnet
                                </a>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong> House Bill </strong>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Arrival Notification </strong>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                        <div className="parentShipDetail">
                          <div>
                            <strong>Other</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card desti_card">
                        <div className="card-body mb-3">
                          {Object.keys(documents).map(
                            (groupName, groupIndex) => (
                              <div key={groupIndex} className="mb-2">
                                <label>{groupName} :</label>
                                {documents[groupName]?.map((item, index) => (
                                  <div
                                    key={item.id}
                                    className="d-flex align-items-center"
                                  >
                                    <a
                                      href={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="view_docu ms-2"
                                    >
                                      View Document
                                    </a>
                                    <DeleteIcon
                                      onClick={() => deleteapi(item.id)}
                                      className="text-danger ms-2"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ),
                          )}
                          <div className="mb-2">
                            <label>Attach Quotation :</label>
                            {datat.attachment_Estimate && (
                              <a
                                href={`${process.env.REACT_APP_BASE_URLdocument}${datat?.attachment_Estimate}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view_docu ms-2"
                              >
                                View Document
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">ETD</h6>
                            <p>{new Date(datat1?.ATD).toLocaleDateString("en-GB")}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">ETA</h6>
                            <p>{new Date(datat1?.ETD).toLocaleDateString("en-GB")}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Carrier</h6>
                            <p>{datat1?.carrier}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Container No</h6>
                            <h6>{datat1?.container}</h6>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Destination Agent</h6>
                            <h6>{datat1?.destination_agent}</h6>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Freight</h6>
                            <p>{datat1?.freight}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Load</h6>
                            <p>{datat1?.load}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Origin Agent</h6>
                            <p>{datat1?.origin_agent}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Port of Discharge</h6>
                            <p>{datat1?.port_of_discharge}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Port of Loading</h6>
                            <p>{datat1?.port_of_loading}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Release Type</h6>
                            <p>{datat1.release_type}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Status</h6>
                            <p>{datat1.status}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Vessel</h6>
                            <p>{datat1?.vessel}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Waybill</h6>
                            <p>{datat1.waybill}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Country of Origin</h6>
                            <p>{datat.origin_country_name}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Country of Destination</h6>
                            <p>{datat.des_country_name}</p>
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">View Document</h6>
                            <a href={`${process.env.REACT_APP_BASE_URLdocument}${datat?.document}`}>View Document</a>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="inner_section">
                            <h6 className="fw-bold">Date of Dispatch</h6>
                            <p >{new Date(datat1?.date_of_dispatch).toLocaleDateString("en-GB")}</p>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <table className="table mt-4 table-striped tableICon">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Freight / Order No.</th>
                      <th>Client Name</th>
                      <th>HAWB / Tracking</th>
                      <th>Total Weight</th>
                      <th>Total CBM</th>
                      <th>Nature of Goods</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabledata?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item?.freight_number} / {item?.order_number}
                        </td>
                        <td>{item?.client_name}</td>
                        <td>{item?.hawb}</td>
                        <td>{item?.weight}</td>
                        <td>{item?.dimensions}</td>
                        <td>{item?.nature_of_goods}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="table mt-4 table-striped tableICon">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Freight / Order No.</th>
                      <th>Client Name</th>
                      <th>Total Weight</th>
                      <th>Port of Loading</th>
                      <th>Port of Discharge</th>
                      <th>Nature of Goods</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabledata1
                      ?.filter((item) => item?.clearance_id) // ✅ ONLY clearance data
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.clearance_number} </td>
                          <td>{item?.client_name}</td>
                          <td>{item?.total_weight}</td>
                          <td>{item?.port_of_loading}</td>
                          <td>{item?.port_of_discharge}</td>
                          <td>{item?.nature_of_goods}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={statusModal} onClose={handleCloseStatusModal}>
        <Box
          className="warehouse_modal123"
          sx={{
            position: "absolute",
            overflow: "scroll",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 300,
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="row">
            <h5 className=" fw-bold fs-5 mb-3">
              <span style={{ color: "#1b2245" }}>Update Status for </span>
            </h5>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>

              <Select
                value={shipmentStatus}
                label="Status"
                onChange={(e) => setShipmentStatus(e.target.value)}
              >
                <MenuItem value="Goods at origin port">
                  Goods at origin port
                </MenuItem>

                <MenuItem value="Goods are in transit">
                  Goods are in transit
                </MenuItem>

                <MenuItem value="Arrived at destination port">
                  Arrived at destination port
                </MenuItem>

                <MenuItem value="Customs clearing in progress">
                  Customs clearing in progress
                </MenuItem>

                <MenuItem value="Customs released">Customs released</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="text-end mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
