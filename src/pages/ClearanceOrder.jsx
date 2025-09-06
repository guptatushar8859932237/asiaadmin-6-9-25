import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const pageSize = 10;
export default function ClearanceOrder() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const dropdownRefs = useRef({});
  const submenuRefs = useRef({});

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleClickOutside = (event) => {
    let isClickInside = false;

    // Check all open dropdowns and submenus
    Object.keys(dropdownRefs.current).forEach((key) => {
      if (
        dropdownRefs.current[key]?.contains(event.target) ||
        submenuRefs.current[key]?.contains(event.target)
      ) {
        isClickInside = true;
      }
    });

    if (!isClickInside) {
      setOpenDropdown(null);
      setOpenSubmenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action, item) => {
    console.log(`${action}:`, item);
  };

  const [age, setAge] = React.useState("");
  const [data1, setData1] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [country, setCountry] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [apidata, setApidata] = useState({});
   const [formFiles, setFormFiles] = useState({
      supplier_invoice: [],
      other_documents: [],
      licenses: [],
      packing_list: [],
    });
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clearanceid, setClearanceid] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getCleranceOrder`
      );
      console.log(response.data.data);
      setData1(response.data.data);
    } catch (error) {
      console.error(error?.response?.data || error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const userid = JSON.parse(localStorage.getItem("data123"))?.id;
  const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;
  const handleclick = async (item) => {
    try {
      const postdata = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/CompleteCleranceOrder",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        postdata
      );
      if (permission.data.success === true) {
        const data11 = {
          clerance_id: item.id,
        };
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}CompleteCleranceOrder`,
            data11
          )
          .then((response) => {
            getdata();
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        toast.error("Permission Denied");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };
  const handleclick1212 = async (item) => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/InprocessCleranceOrder",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success === true) {
        const data11 = { clerance_id: item.id };
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}InprocessCleranceOrder`,
            data11
          );
          getdata();
          console.log(response.data);
        } catch (error) {
          console.error("Error in second request:", error);
          toast.error("Failed to process clearance order.");
        }
      } else {
        toast.error("Permission Denied: You don’t have access to this page");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };
  const handleclick121212 = async (item) => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/StillToCleranceOrder",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success === true) {
        const data11 = { clerance_id: item.id };
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}StillToCleranceOrder`,
            data11
          );
          getdata();
          console.log(response.data);
        } catch (error) {
          console.error("Error in second request:", error);
          toast.error("Failed to process clearance order.");
        }
      } else {
        toast.error("Permission Denied: You don’t have access to this page");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const filteredData = data1.filter((item) => {
    console.log(item);
    return (
      item?.clearance_number
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.goods_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.port_of_entry_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.port_of_exit_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (currentData) => {
    setCurrentPage(currentData);
  };
  useEffect(() => {
    getcountry();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        console.log(response.data);
        setCountry(response.data.data);
      })
      .catch((error) => {
        toast.errror(error.response.data.data);
      });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const postData = () => {
    const datapost = {
      status: data.status,
      origin: data.origin,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      clearingType: data.clearingType,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getCleranceOrder`, datapost)
      .then((response) => {
        if (response.data.success === true) {
          handleCloseModal();
          setData1(response.data.data);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal1 = (item) => {
    console.log(item);
    setIsModalOpen1(true);
    setClearanceid(item.clearance_id);
  };
  const handleCloseModal1 = () => setIsModalOpen1(false);

  const handlecciew = async (item) => {
    navigate("/Admin/Clearancedetails", {
      state: { clearance_id: item },
    });
  };

  const handleclickdelete12 = async (item) => {
    console.log(item);
    const datauser = item;
    console.log(datauser);
    navigate("/Admin/Custom-details", {
      state: { data: [datauser], data1: "update" },
    });
  };
  const handleclickdelete1234 = async (item) => {
    console.log(item);
    const datauser = item;
    console.log(datauser);
    const data1 = "update";
    navigate("/Admin/Editclearence", {
      state: { data: [datauser], data1 },
    });
  };

  const handleclickdelete = async (item) => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/DeleteClearanceOrder",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success === true) {
        console.log(item);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}DeleteClearanceOrder`,
            {
              clearance_order_id: item.clearance_id,
            }
          );
          if (response.data.success) {
            getdata();
            toast.success(
              response.data.message || "Order deleted successfully"
            );
          } else {
            toast.error(response.data.message || "Failed to delete order");
          }
        } catch (error) {
          console.error("Error deleting clearance order:", error);
          if (error.response && error.response.status === 400) {
            toast.error(
              error.response.data.message ||
                "Permission Denied: You don’t have access to delete this order"
            );
          } else {
            toast.error("Something went wrong while deleting the order.");
          }
        }
      } else {
        toast.error("Permission Denied: You don’t have access to this action");
      }
    } catch (error) {
      console.error("Error checking permission:", error);

      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };

  const handlechangefile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const docupload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("clearing_id", clearanceid); // Assuming you have the clearance ID in your state
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}AttachedCustomOrderDoc`,
        formData
      );
      console.log(response);
      if (response.data.success === true) {
        toast.success("Document uploaded successfully");
        getdata();
        setIsModalOpen1(false);
      } else {
        toast.error("Failed to upload document");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document.");
    }
  };
  const handleOpenModal4 = () => setIsModalOpen2(true);
  const handleCloseModal4 = () => setIsModalOpen2(false);
  const handleclickdelete123423 = (id) => {
    console.log(id);
    const regdata = data1.filter((item) => item !== id.id);
    console.log(regdata);
    setApidata(id);
    handleOpenModal4();
  };

  const handlechnageupdate = (e) => {
    const { name, value } = e.target;
    setApidata({ ...apidata, [name]: value });
  };

   const handleFileChange = (e, fieldName) => {
    const files = Array.from(e.target.files);
    setFormFiles((prev) => ({
      ...prev,
      [fieldName]: files,
    }));
  };  
  
  const handleupdateupdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("clearing_id", apidata.id);
      formdata.append("freight", apidata.customer_ref);
      formdata.append("freight_option", apidata.freight_option);
      formdata.append("is_Import_Export", apidata.is_Import_Export);
      formdata.append("is_cong_shipp", apidata.is_cong_shipp);
      formdata.append("goods_desc", apidata.goods_desc);
      formdata.append("nature_of_goods", apidata.nature_of_goods);
      formdata.append("packing_type", apidata.packing_type);
      formdata.append("total_dimension", apidata.total_dimension);
      formdata.append("total_box", apidata.total_box);
      formdata.append("total_weight", apidata.total_weight);
      formdata.append("loading_country", apidata.loading_country);
      formdata.append("discharge_country", apidata.discharge_country);
      formdata.append("client", apidata.client);
      formdata.append("port_of_discharge", apidata.port_of_discharge);
      formdata.append("port_of_loading", apidata.port_of_loading);
      formdata.append("comment_on_docs", apidata.comment_on_docs);
      formdata.append("customer_ref", apidata.customer_ref);
      formdata.append("sales_representative", apidata.sales_representative);
      formdata.append("documentName", apidata.documentName);
      console.log(formdata);
         Object.values(formFiles).forEach((files) => {
  files.forEach((file) => {
    formdata.append("document", file); // static key
  });
});
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}update-clearing`,
        formdata
      );

      toast.success(response.data.message);
      getdata();
      handleCloseModal4(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen2}
        onClose={handleCloseModal4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            width: "800px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <div className="modal-header">
            <h2>
              <h2 id="modal-modal-title">Update Clearance</h2>
            </h2>
            <button className="btn btn-close" onClick={handleCloseModal4}>
              <CloseIcon />
            </button>
          </div>
          <div className="newModalGap noFormaControl">
            <div className="row mb-3">
              <div className="col-6">
                <label>Freight</label>
                <select
                  name="customer_ref"
                  value={apidata.customer_ref}
                  onChange={handlechnageupdate}
                >
                  <option value="">Select...</option>
                  <option value="Sea">Sea</option>
                  <option value="Air">Air</option>
                  <option value="Road">Road</option>
                </select>
              </div>
              <div className="col-6">
                <label>Are You</label>
                <div className="shipRefer">
                  <input
                    type="radio"
                    id="statusShipper"
                    name="is_cong_shipp"
                    value="shipper"
                    checked={apidata.is_cong_shipp === "Shipper"}
                    onChange={handlechnageupdate}
                  />
                  <label htmlFor="statusShipper">Shipper </label>
                  <input
                    type="radio"
                    id="statusConsignee"
                    name="is_cong_shipp"
                    value="consignee"
                    checked={apidata.is_cong_shipp === "Consignee"}
                    onChange={handlechnageupdate}
                  />
                  <label htmlFor="statusConsignee">Consignee </label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label>Is This</label>
                <div className="shipRefer">
                  <input
                    type="radio"
                    id="statusShipper"
                    name="is_Import_Export"
                    value="import"
                    checked={apidata.is_Import_Export === "import"}
                    onChange={handlechnageupdate}
                  />
                  <label htmlFor="statusShipper">Import </label>
                  <input
                    type="radio"
                    id="statusConsignee"
                    name="is_Import_Export"
                    value="export"
                    checked={apidata.is_Import_Export === "export"}
                    onChange={handlechnageupdate}
                  />
                  <label htmlFor="statusConsignee">Export </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6 className="md_heading text-start mt-0">Port of Clearing Details</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="destination" className="form-label">
                    Port of Loading Country
                  </label>
                  <select
                    id="port_of_entry"
                    name="loading_country"
                    onChange={handlechnageupdate}
                    value={apidata.loading_country}
                  >
                    <option>Select...</option>
                    {country &&
                      country.length > 0 &&
                      country.map((item, index) => {
                        // console.log(item);
                        return (
                          <>
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_entry" className="form-label">
                    Port of Exit Country
                  </label>
                  <select
                    id="port_of_entry"
                    name="discharge_country"
                    value={apidata.discharge_country}
                    onChange={handlechnageupdate}
                  >
                    <option>Select...</option>
                    {country &&
                      country.length > 0 &&
                      country.map((item, index) => {
                        // console.log(item);
                        return (
                          <>
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_exit" className="form-label">
                    Port of Loading
                  </label>
                  <input
                    className="form-control"
                    name="port_of_loading"
                    onChange={handlechnageupdate}
                    value={apidata.port_of_loading}
                    placeholder="Port of Loading"
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="clearing_agent" className="form-label">
                    Port of Discharge
                  </label>
                  <input
                    className="form-control"
                    name="port_of_discharge"
                    value={apidata.port_of_discharge}
                    onChange={handlechnageupdate}
                    placeholder="Port of Discharge"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6 className="md_heading text-start">Cargo Details</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_exit" className="form-label">
                    Product Description
                  </label>
                  <input
                    className="form-control"
                    name="goods_desc"
                    value={apidata.goods_desc}
                    onChange={handlechnageupdate}
                    placeholder="Product Description"
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="clearing_agent" className="form-label">
                    Nature of Goods
                  </label>
                  <select
                    id="clearing_agent"
                    name="nature_of_goods"
                    onChange={handlechnageupdate}
                    value={apidata.nature_of_goods}
                  >
                    <option>Select...</option>
                    <option value="General Cargo">General Cargo</option>
                    <option value="Battery">Battery</option>
                    <option value="Powders">Powders</option>
                    <option value="Harzadous">Hazardous</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_exit" className="form-label">
                    Type of Packing
                  </label>
                  <select
                    name="packing_type"
                    value={apidata.packing_type}
                    onChange={handlechnageupdate}
                  >
                    <option>Select...</option>
                    <option value="box">Box</option>
                    <option value="crate">Crate</option>
                    <option value="Pallet">Pallet</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="clearing_agent" className="form-label">
                    Comment on Goods
                  </label>
                  <input
                    className="form-control"
                    name="comment_on_docs"
                    value={apidata.comment_on_docs}
                    onChange={handlechnageupdate}
                    placeholder="Comment on Docs"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_exit" className="form-label">
                    No of package
                  </label>
                  <input
                    className="form-control"
                    name="total_box"
                    value={apidata.total_box}
                    onChange={handlechnageupdate}
                    placeholder="0.00"
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="clearing_agent" className="form-label">
                    Total Dimension
                  </label>
                  <input
                    className="form-control"
                    name="total_dimension"
                    value={apidata.total_dimension}
                    onChange={handlechnageupdate}
                    placeholder="0.00"
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="port_of_exit" className="form-label">
                    Weight
                  </label>
                  <input
                    className="form-control"
                    name="total_weight"
                    value={apidata.total_weight}
                    onChange={handlechnageupdate}
                    placeholder="0.00"
                  ></input>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="clearing_agent" className="form-label">
                    Add Attachment
                  </label>
                  <select
                    className="w-100 py-2 px-2 sel_custom"
                    name="documentName"
                    value={apidata.documentName}
                    onChange={handlechnageupdate}
                  >
                      <option value="">Select...</option>
                            <option value="Customs Documents">Customs docs</option>
                            <option value="Supporting Documents">Supporting docs</option>
                            <option value="Invoice, Packing List">Invoice / Packing L</option>
                            <option value="Product Literature">Product Literature</option>
                            <option value="Letters of authority">LOA</option>
                            <option value="Waybills">Freight Docs</option>
                            <option value="Waybills">Shipping instruction</option>
                            <option value="Supplier Invoices">Freight Invoices </option>
                            <option value="AD_Quotations">Attach Quote</option>
                  </select>
                </div>
              </div>
            </div>

               <div className="col-6 mt-3">
                          <label>Upload Document</label>
                          <input
                            type="file"
                            multiple
                            className="w-100 mb-3 rounded"
                            onChange={(e) =>
                              handleFileChange(e, "other_documents")
                            }
                          />
                        </div>

            <Button variant="contained" onClick={handleupdateupdate}>
              Update
            </Button>
          </div>
        </Box>
      </Modal>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <>
          <div className="wpWrapper">
            <div className="container-fluid">
              <div className="row manageFreight">
                <div className="d-flex justify-content-between">
                  <h4 className="freight_hd">Order Clearance</h4>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <input
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="px-2 py-1 rounded"
                      />
                    </div>
                    <button className="me-2 mx-1" onClick={handleOpenModal}>
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className=" ">
                  <div className="table-responsive">
                    <table className="table table-striped tableICon">
                      <tbody style={{ border: "none" }}>
                        {currentData &&
                          currentData.length > 0 &&
                          currentData.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <tr className="border-bottom">
                                  <td className="list_bd">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center">
                                        <p className="client_nm">
                                          {item.client_name}
                                        </p>
                                        <p className="fright_no mx-2 fs-6">
                                          {item?.clearance_number}
                                        </p>
                                      </div>
                                      <div className="">
                                        <p className="port_date">
                                          {new Date(
                                            item.created_at
                                          ).toLocaleDateString("en-GB")}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="container-fluid">
                                      <div className="row">
                                        <div className="col-md-3 ps-0">
                                          <div className="">
                                            <p className="origin">
                                              {item?.goods_desc}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-5">
                                          <div className="d-flex align-items-center justify-content-center">
                                            <p className="origin">
                                              {item?.port_of_entry_name}
                                            </p>
                                            <div className="arrow">
                                              <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                            </div>
                                            <p className="origin">
                                              {item?.port_of_exit_name}
                                            </p>
                                            <p className="origin mx-2">
                                              {item?.freight}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-md-2">
                                          <div className="text-center"></div>
                                        </div>
                                        <div className="col-md-2 pe-0">
                                          <div className="text-end myDrop">
                                            <div
                                              className="dropdown-container"
                                              ref={(el) =>
                                                (dropdownRefs.current[index] =
                                                  el)
                                              }
                                            >
                                              <button
                                                className="dropdown-button"
                                                onClick={() =>
                                                  toggleDropdown(index)
                                                }
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent:
                                                    "space-between",
                                                  gap: "6px",
                                                }}
                                              >
                                                Action
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="currentColor"
                                                  style={{
                                                    transform:
                                                      openDropdown === index
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                    transition:
                                                      "transform 0.3s ease",
                                                  }}
                                                >
                                                  <path d="M7 10l5 5 5-5H7z" />
                                                </svg>
                                              </button>

                                              {openDropdown === index && (
                                                <div
                                                  className="dropdown-menu"
                                                  ref={(el) =>
                                                    (submenuRefs.current[
                                                      index
                                                    ] = el)
                                                  }
                                                >
                                                  <ul>
                                                    <li
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleclick(item)
                                                      }
                                                    >
                                                      Cleared
                                                    </li>
                                                    <li
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleclick1212(item)
                                                      }
                                                    >
                                                      In process
                                                    </li>
                                                    <li
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleclick121212(item)
                                                      }
                                                    >
                                                      Still to clear
                                                    </li>

                                                    <li>
                                                      <div
                                                        onClick={() =>
                                                          toggleSubmenu(index)
                                                        }
                                                        style={{
                                                          display: "flex",
                                                          justifyContent:
                                                            "space-between",
                                                          alignItems: "center",
                                                          padding: "10px 15px",
                                                          cursor: "pointer",
                                                        }}
                                                      >
                                                        <span>Status</span>
                                                        <svg
                                                          width="16"
                                                          height="16"
                                                          viewBox="0 0 24 24"
                                                          fill="currentColor"
                                                          style={{
                                                            transform:
                                                              openSubmenu ===
                                                              index
                                                                ? "rotate(180deg)"
                                                                : "rotate(0deg)",
                                                            transition:
                                                              "transform 0.3s ease",
                                                          }}
                                                        >
                                                          <path d="M7 10l5 5 5-5H7z" />
                                                        </svg>
                                                      </div>

                                                      {openSubmenu ===
                                                        index && (
                                                        <div className="submenu">
                                                          <ul>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handleclickdelete(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              Delete
                                                            </li>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handlecciew(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              View Details
                                                            </li>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handleclickdelete12(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              View
                                                            </li>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handleclickdelete123423(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              Edit Order
                                                            </li>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handleclickdelete1234(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              Edit Estimate
                                                            </li>
                                                            <li
                                                              className="dropdown-item"
                                                              onClick={() =>
                                                                handleOpenModal1(
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              Attach Document
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      )}
                                                    </li>
                                                  </ul>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="">
                                      <p type="radio" className="input_user" />
                                      <label className="status">
                                        {item?.order_status == "Accepted" ? (
                                          <div className="d-flex align-items-center">
                                            <span className="dot bg-secondary me-2"></span>
                                            <p className="text-secondary mb-0">
                                              Accepted
                                            </p>
                                          </div>
                                        ) : item.order_status == "Cleared" ? (
                                          <div className="d-flex align-items-center">
                                            <span className="dot bg-success me-2"></span>
                                            <p className="text-success mb-0">
                                              Cleared
                                            </p>
                                          </div>
                                        ) : item.order_status ==
                                          "In process" ? (
                                          <div className="d-flex align-items-center">
                                            <span className="dot bg-primary me-2"></span>
                                            <p className="text-primary mb-0">
                                              In process
                                            </p>
                                          </div>
                                        ) : item.order_status ==
                                          "Still to clear" ? (
                                          <div className="d-flex align-items-center">
                                            <span className="dot bg-danger me-2"></span>
                                            <p className="text-danger mb-0">
                                              Still to clear
                                            </p>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                    <div className="text-center d-flex justify-content-end align-items-center">
                      <button
                        disabled={currentPage === 1}
                        className="bg_page"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <i class="fi fi-rr-angle-small-left page_icon"></i>
                      </button>
                      <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                      <button
                        disabled={currentPage === totalPages}
                        className="bg_page"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i class="fi fi-rr-angle-small-right page_icon"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                }}
              >
                <div className="modal-header">
                  <h2 id="modal-modal-title">Filter</h2>
                  <button className="btn btn-close" onClick={handleCloseModal}>
                    <CloseIcon />
                  </button>
                </div>

                {/* <div className="row my-3  ">
                <div className="col-6">
                  <label>Delivery Type</label>
                  <select
                    name="type"
                    onChange={handlechange}
                    className="form-control"
                  >
                    <option value="">Select</option>
                    <option value="express">Express</option>
                    <option value="normal">Consolidation</option>
                  </select>
                </div>
                <div className="col-6">
                  <label>Priority </label>
                  <div className="shipRefer1 d-flex">
                    <div>
                      <input
                        type="radio"
                        id="shipper"
                        name="priority"
                        style={{ cursor: "pointer" }}
                        value="High"
                        onChange={handlechange}
                      />
                      <label htmlFor="shipper">High</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="shipper2"
                        style={{ cursor: "pointer" }}
                        name="priority"
                        value="Medium"
                        onChange={handlechange}
                      />
                      <label htmlFor="consignee">Medium</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="shipper3"
                        name="priority"
                        style={{ cursor: "pointer" }}
                        value="Low"
                        onChange={handlechange}
                      />
                      <label htmlFor="mediumPr">Low</label>
                    </div>
                  </div>
                </div>
              </div> */}
                <div className="newModalGap noFormaControl">
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Country of Origin</label>
                      <select name="origin" onChange={handlechange}>
                        <option value="">Select</option>
                        {country &&
                          country.length > 0 &&
                          country.map((item, index) => {
                            return (
                              <>
                                <option value={item.id}>{item.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-6">
                      <label>Delivery to Country </label>
                      <select name="destination" onChange={handlechange}>
                        <option value="">Select</option>
                        {country &&
                          country.length > 0 &&
                          country.map((item, index) => {
                            return (
                              <>
                                <option value={item.id}>{item.name}</option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Start Date</label>
                      <input
                        type="date"
                        id="shipper3"
                        name="startDate"
                        style={{ cursor: "pointer" }}
                        onChange={handlechange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <label>End Date </label>
                      <input
                        type="date"
                        id="shipper3"
                        name="endDate"
                        style={{ cursor: "pointer" }}
                        className="form-control"
                        onChange={handlechange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label>Freight</label>
                      <select name="freight" onChange={handlechange}>
                        <option value="">Select...</option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                        <option value="Road">Road</option>
                      </select>
                    </div>
                    {/* <div className="col-6">
                      <label>freight Type </label>
                      <select
                        name="type"
                        onChange={handlechange}
                        className="form-control"
                      >
                        <option value="">Select...</option>
                        <option value="express">Express</option>
                        <option value="normal">Normal</option>
                      </select>
                    </div> */}
                  </div>
                  <Button variant="contained" onClick={postData}>
                    Apply
                  </Button>
                </div>
              </Box>
            </Modal>
            <Modal
              open={isModalOpen1}
              onClose={handleCloseModal1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  minWidth:"200px"
                }}
              >
                <div className="modal-header">
                  <h2 id="modal-modal-title">Upload Document</h2>
                  <button className="btn btn-close" onClick={handleCloseModal1}>
                    <CloseIcon />
                  </button>
                </div>

                <div className="newModalGap noFormaControl">
                  <div>
                    <input
                      type="file"
                      className="w-100 py-1 rounded  px-2 py-1"
                      onChange={handlechangefile}
                      name="documentfile"
                    ></input>
                  </div>
                  <Button
                    className="mt-3"
                    variant="contained"
                    onClick={docupload}
                  >
                    Apply
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}
