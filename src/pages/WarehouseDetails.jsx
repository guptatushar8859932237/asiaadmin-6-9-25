import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { FaEdit } from "react-icons/fa";
import { Box, Modal, Button, Typography, IconButton } from "@mui/material";
export default function WarehouseDetails() {
  const location = useLocation();
  const info = location.state.data;
  console.log(info);
  const [documents, setDocuments] = useState({});
  const [selectedData, setSelectedData] = useState({});
  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalviewsection3, setIsModalviewsection3] = useState(false);
  const [show1, setShow1] = useState(false);
  const postassiandata = async () => {
    const payloca = {
      warehouse_assign_order_id: info.warehouse_assign_order_id || info.id,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}getWarehouseOrderProduct`,
          payloca,
        )
        .then((response) => {
          console.log(response.data.data);
          setApidata(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    postassiandata();
  }, []);
  const handleclicknav = () => {
    navigate("/Admin/WarehouseOrder");
  };
  const GetFreightImages = () => {
    const data = {
      freight_id: info.freight_id,
      warehouse_assign_order_id: info.warehouse_assign_order_id || info.id,
      uploaded_by: "1",
    };
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

  const handleCloseModal3 = () => {
    setIsModalOpen3(false);
    setSelectedData({});
  };
  const deleteapi = (id) => {
    console.log(id);
    const data11 = {
      doc_id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteDocument`, data11)
      .then((response) => {
        GetFreightImages();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleEditClick12 = async (freightId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    // ❌ Agar user cancel kare to yahin stop
    if (!result.isConfirmed) return;
    const payload = {
      id: freightId,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}DeleteWarehouseProduct`,
        payload,
      );
      if (response?.data?.success) {
        Swal.fire("Deleted!", "Product deleted successfully", "success");
        postassiandata(); // refresh data
      } else {
        Swal.fire("Error!", "Failed to delete product", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  const handleEditClick = async (freight_ID) => {
    console.log(freight_ID);
    const payload = {
      id: freight_ID,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getWarehouseProductById`,
        payload,
      );
      if (response?.data?.success) {
        setSelectedData(response.data.data);
      } else {
        toast.error("Failed to fetch product details");
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen3(true);
  };
  const handleEditClickview = async (freight_ID) => {
    console.log(freight_ID);
    const payload = {
      id: freight_ID,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getWarehouseProductById`,
        payload,
      );
      if (response?.data?.success) {
        setSelectedData(response.data.data);
      } else {
        toast.error("Failed to fetch product details");
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalviewsection3(true);
  };
  const handleCloseadadModal3 = () => {
    setIsModalviewsection3(false);
    setSelectedData({});
  }

  const handlechangepro = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(selectedData);
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  const handpechangepro = async () => {
    const payload = {
      id: selectedData.id,
      product_description: selectedData.product_description,
      warehouse_ref: selectedData.warehouse_ref,
      date_received: selectedData.date_received,
      package_type: selectedData.package_type,
      packages: selectedData.packages,
      dimension: selectedData.dimension,
      weight: selectedData.weight,
      supplier_address: selectedData.supplier_address,
      supplier: selectedData.supplier,
      warehouse_order_id: selectedData.warehouse_order_id,
      costs_to_collect: selectedData.costs_to_collect,
      warehouse_cost: selectedData.warehouse_cost,
      warehouse_dispatch: selectedData.warehouse_dispatch,
      cost_to_dispatch: selectedData.cost_to_dispatch,
      waybill_ref: selectedData.waybill_ref,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateWarehouseProduct`,
        payload,
      );
      if (response?.data?.success) {
        toast.success("   Product updated successfully");
        postassiandata();
        setIsModalOpen3(false);
        setSelectedData({});
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const totalWeight = apidata.reduce(
  (sum, item) => sum + Number(item.weight || 0),
  0
);

const totalPackages = apidata.reduce(
  (sum, item) => sum + Number(item.packages || 0),
  0
);

const totalDimension = apidata.reduce(
  (sum, item) => sum + Number(item.dimension || 0),
  0
);
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
                  <h4 className="det_hd text-start ms-3">
                    Warehouse Full Details
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="details_box">
            <div className="row">
              <div className="col-md-4 pe-4">
                <div className=" card desti_card">
                  <div className="card-body">
                    <div>
                      <h6 className="orgin_hd">Warehouse Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div className="table-responsive">
                        <table className="det_show">
                          <tbody>
                            <tr>
                              <td className="fright_num">
                                <p className="client_para1">Freight number:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.freight_number}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Date:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {new Date(info.created_at).toLocaleDateString(
                                    "en-GB",
                                  )}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Client:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.client_name}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Client Ref:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.customer_ref}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Groupage:</p>
                              </td>
                              <td>
                                <p className="client_para1">{info?.batch_number}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Costs Estimates</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div className="table-responsive">
                        <table className="det_show">
                          <thead>
                            <tr>
                              <td className="ship_hd1"></td>
                              <td className="ship_hd2">Warehouse</td>
                              <td className="ship_hd3 pe-2">Other</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="client_para1">Collection</p>
                              </td>
                              <td>
                                <p className="client_para1"></p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.order_warehouse_cost}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              {/* <td>
                                <p className="client_para1">Warehouse</p>
                              </td> */}
                              <td>
                                <p className="client_para1"></p>
                              </td>
                              {/* <td>
                                <p className="client_para1">
                                  {info.warehouse_cost}
                                </p> */}
                              {/* </td> */}
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 ">cost to collect</p>
                              </td>
                              <td>
                                <p className="client_para1 "></p>
                              </td>
                              <td>
                                <p className="client_para1 ">
                                  {info.order_costs_to_collect}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 ">
                                 Handling Costs
                                </p>
                              </td>
                              <td>
                                <p className="client_para1 "></p>
                              </td>
                              <td>
                                <p className="client_para1 ">
                                  {info.handling_cost}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 ">
                                  Origin Incidental cost
                                </p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3"></p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3">
                                  {info.origin_Incidental_costs}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pe-4">
                <div className=" card desti_card">
                  <div className="card-body">
                    <div>
                      <h6 className="orgin_hd">Packages Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div className="table-responsive">
                        <table className="det_show">
                          <tbody>
                            <tr>
                              <td className="fright_num">
                                <p className="client_para1">Weight:</p>
                              </td>
                              <td>
                                <p className="client_para1">
 {totalWeight   }
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Dimensions:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {totalDimension}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Packages:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {totalPackages}
                                </p>
                              </td>
                            </tr>
                            {/* <tr>
                              <td>
                                <p className="client_para1">Orders:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  
                                </p>
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card desti_card">
              <div className="card-body mb-3">
                {Object.keys(documents).map((groupName, groupIndex) => (
                  <div key={groupIndex} className="mb-2">
                    <label>{groupName} :</label>
                    {documents[groupName]?.map((item, index) => (
              <div className="image-box">
  <img
    src={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
    alt="doc"
    className="preview-img"
    onClick={() =>
      window.open(
        `${process.env.REACT_APP_BASE_URLdocument}${item?.document}`,
        "_blank"
      )
    }
  />

  <DeleteIcon
    onClick={() => deleteapi(item.id)}
    className="delete-icon"
  />
</div>
                    ))}
                  </div>
                ))}
                {/* Quotation (separate because it's not part of groups) */}
              <div className="mb-2">
  <label>Attach Quotation :</label>

  {info.attachment_Estimate && (
    <div className="image-box ms-2">
      <img
        src={`${process.env.REACT_APP_BASE_URLdocument}${info?.attachment_Estimate}`}
        alt="quotation"
        className="preview-img"
        onClick={() =>
          window.open(
            `${process.env.REACT_APP_BASE_URLdocument}${info?.attachment_Estimate}`,
            "_blank"
          )
        }
      />
    </div>
  )}
</div>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-2">
            <table className="table table-striped tableICon">
              <thead>
                <tr>
                  <th scope="col">Product Description</th>
                  <th scope="col">Waybill</th>
                  <th scope="col">Warehouse Ref</th>
                  <th scope="col">Date Received</th>
                  <th scope="col">Package Type</th>
                  <th scope="col">Packages</th>
                  <th scope="col">Dimension</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ border: "none" }}>
                {apidata &&
                  apidata.length > 0 &&
                  apidata.map((item, index) => {
                    return (
                      <>
                        <tr className="border-bottom" key={index}>
                          <td>{item.product_description}</td>
                          <td>{item.tracking_number}</td>
                          <td>{item.warehouse_ref}</td>
                          <td>
                            {new Date(item.date_received).toLocaleDateString(
                              "en-GB",
                            )}
                          </td>
                          <td>{item.package_type}</td>
                          <td>{item.packages}</td>
                          <td>{item.dimension}</td>
                          <td>{item.weight}</td>
                          <td>
                             {item?.id ? (
                              <VisibilityIcon
                                onClick={() => handleEditClickview(item.id)}
                                style={{ color: "#1d2044", cursor: "pointer" }}
                              />
                            ) : (
                              ""
                            )}
                            {item?.id ? (
                              <FaEdit
                                onClick={() => handleEditClick(item.id)}
                                style={{ color: "#1d2044", cursor: "pointer" }}
                              />
                            ) : (
                              ""
                            )}
                            {item?.id ? (
                              <DeleteIcon
                                onClick={() => handleEditClick12(item.id)}
                                style={{ color: "#1d2044", cursor: "pointer" }}
                              />
                            ) : (
                              ""
                            )}
                           
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <Modal open={isModalOpen3} onClose={handleCloseModal3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Warehouse Detail</Typography>
              <IconButton onClick={handleCloseModal3}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div className="newModalGap  noFormaControl">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Product Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="product description"
                    value={selectedData.product_description || ""}
                    onChange={handlechangepro}
                    name="product_description"
                  />
                </div>
                <div className="col-md-6 noFormaControl">
                  <label className="form-label">Harzadous</label>
                  <select
                    onChange={handlechangepro}
                    value={selectedData.Hazardous || ""}
                    name="Hazardous"
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Ref.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedData.warehouse_ref || ""}
                    placeholder="warehouse reference"
                    name="warehouse_ref"
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Data Received</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_received"
                    value={
                      selectedData.date_received
                        ? new Date(selectedData.date_received)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 noFormaControl">
                  <label className="form-label">Package Type</label>
                  <select
                    name="package_type"
                    value={selectedData.package_type || ""}
                    onChange={handlechangepro}
                  >
                    <option value="">Select...</option>
                    <option value="box">Box</option>
                    <option value="crate">Crate</option>
                    <option value="pallet">Pallet</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Total Packages</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    value={selectedData.packages || ""}
                    name="packages"
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Dimension</label>
                  <input
                    type="text"
                    name="dimension"
                    value={selectedData.dimension || ""}
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    className="form-control"
                    value={selectedData.weight || ""}
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Supplier Address</label>
                  <input
                    type="text"
                    name="supplier_address"
                    value={selectedData.supplier_address || ""}
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={selectedData.supplier || ""}
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Order</label>
                  <input
                    type="text"
                    name="warehouse_order_id"
                    className="form-control"
                    placeholder="0.00"
                    value={selectedData.warehouse_order_id || ""}
                    onChange={handlechangepro}
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Costs to Collect</label>
                  <input
                    type="text"
                    name="costs_to_collect"
                    className="form-control"
                    placeholder="0.00"
                    value={selectedData.costs_to_collect || ""}
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse dispatch</label>
                  <input
                    type="text"
                    value={selectedData.warehouse_dispatch || ""}
                    name="warehouse_dispatch"
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Waybill Ref</label>
                  <input
                    type="text"
                    value={selectedData.waybill_ref || ""}
                    name="waybill_ref"
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Cost</label>
                  <input
                    type="text"
                    name="warehouse_cost"
                    className="form-control"
                    placeholder="0.00"
                    value={selectedData.warehouse_cost || ""}
                    onChange={handlechangepro}
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cost to Dispatch</label>
                  <input
                    type="text"
                    name="cost_to_dispatch"
                    value={selectedData.cost_to_dispatch || ""}
                    className="form-control"
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3"></div>
              <div class="modal-footer"></div>
            </div>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handpechangepro}>
                Edit Product
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={isModalviewsection3} onClose={handleCloseadadModal3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Warehouse Detail</Typography>
              <IconButton onClick={handleCloseModal3}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div className="newModalGap  noFormaControl">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Product Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="product description"
                    disabled
                    value={selectedData.product_description || ""}
                    onChange={handlechangepro}
                    name="product_description"
                  />
                </div>
                <div className="col-md-6 noFormaControl">
                  <label className="form-label">Harzadous</label>
                  <select
                    onChange={handlechangepro}
                    value={selectedData.Hazardous || ""}
                    name="Hazardous"
                    disabled
                  >
                    <option>Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Ref.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedData.warehouse_ref || ""}
                    placeholder="warehouse reference"
                    disabled
                    name="warehouse_ref"
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Data Received</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_received"
                    disabled
                    value={
                      selectedData.date_received
                        ? new Date(selectedData.date_received)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 noFormaControl">
                  <label className="form-label">Package Type</label>
                  <select
                    name="package_type"
                    disabled
                    value={selectedData.package_type || ""}
                    onChange={handlechangepro}
                  >
                    <option value="">Select...</option>
                    <option value="box">Box</option>
                    <option value="crate">Crate</option>
                    <option value="pallet">Pallet</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Total Packages</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    value={selectedData.packages || ""}
                    name="packages"
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Dimension</label>
                  <input
                    type="text"
                    name="dimension"
                    value={selectedData.dimension || ""}
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    onChange={handlechangepro}
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Weight</label>
                  <input
                    type="text"
                    disabled
                    name="weight"
                    className="form-control"
                    value={selectedData.weight || ""}
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Supplier Address</label>
                  <input
                    type="text"
                    name="supplier_address"
                    disabled
                    value={selectedData.supplier_address || ""}
                    className="form-control"
                    placeholder="0.00"
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={selectedData.supplier || ""}
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    onChange={handlechangepro}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Order</label>
                  <input
                    type="text"
                    name="warehouse_order_id"
                    className="form-control"
                    placeholder="0.00"
                    value={selectedData.warehouse_order_id || ""}
                    onChange={handlechangepro}
disabled
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Costs to Collect</label>
                  <input
                    type="text"
                    name="costs_to_collect"
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    value={selectedData.costs_to_collect || ""}
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse dispatch</label>
                  <input
                    type="text"
                    value={selectedData.warehouse_dispatch || ""}
                    name="warehouse_dispatch"
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    onChange={handlechangepro}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Waybill Ref</label>
                  <input
                    type="text"
                    value={selectedData.waybill_ref || ""}
                    name="waybill_ref"
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Warehouse Cost</label>
                  <input
                    type="text"
                    name="warehouse_cost"
                    className="form-control"
                    placeholder="0.00"
                    disabled
                    value={selectedData.warehouse_cost || ""}
                    onChange={handlechangepro}
                    onKeyPress={handlekey}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cost to Dispatch</label>
                  <input
                    type="text"
                    name="cost_to_dispatch"
                    value={selectedData.cost_to_dispatch || ""}
                    className="form-control"
                    disabled
                    placeholder="0.00"
                    onKeyPress={handlekey}
                    onChange={handlechangepro}
                  />
                </div>
              </div>
              <div className="row mb-3"></div>
              <div class="modal-footer"></div>
            </div>
           
          </Box>
        </Modal>
      </div>
    </div>
  );
}
