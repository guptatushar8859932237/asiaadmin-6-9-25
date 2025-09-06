import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;

export default function Warehouse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [countries, setcountries] = useState([]);
  const [inputdata, setInputdata] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const openModal1 = () => {
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const postData1 = () => {
    const data = {
      warehouse_address: inputdata.warehouse_address,
      warehouse_name: inputdata.warehouse_name,
      town: inputdata.town,
      country: inputdata.country,
      contact_person: inputdata.contact_person,
      email: inputdata.email,
      mobile_number: inputdata.mobile_number,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}addWarehouse`, data)
      .then((response) => {
        console.log(response);
        getwarehouse();
        toast.success(response.data.message);
        closeModal1();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getcountry();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setcountries(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getWarehouse`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response.data.message);
      });
  };
  const postData = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      console.log("asdfhdfh");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}UploadExcelWarehouse`, formdata)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            closeModal1();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };
  const openModal2 = (id) => {
    const getuser = data.filter((item) => {
      return item.id === id;
    });
    console.log(getuser);
    const getsingleuser = getuser[0];
    setInputdata({
      id: getsingleuser.id,
      contact: getsingleuser.contact,
      contact_person: getsingleuser.contact_person,
      country: getsingleuser.country,
      email: getsingleuser.email,
      mobile_number: getsingleuser.mobile_number,
      town: getsingleuser.town,
      warehouse_address: getsingleuser.warehouse_address,
      warehouse_name: getsingleuser.warehouse_name,
      warehouse_number: getsingleuser.warehouse_numbere,
    });
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleFileChange1 = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const apiupdatepost = () => {
    const dataupdate = {
      warehouse_number: inputdata.warehouse_number,
      warehouse_name: inputdata.warehouse_name,
      warehouse_address: inputdata.warehouse_address,
      town: inputdata.town,
      country: inputdata.country,
      email: inputdata.email,
      contact_person: inputdata.contact_person,
      mobile_number: inputdata.mobile_number,
      warehouse_id: inputdata.id,
    };
    console.log("Request Data:", dataupdate);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}editWarehouse`, dataupdate)
      .then((response) => {
        try {
          console.log("Response Data:", response.data);
          closeModal2();
          toast.success("Warehouse Update successfully");
        } catch (err) {
          console.error("Error in then block:", err);
          throw err;
        }
      })
      .catch((error) => {
        console.error("Error Response:", error.response);
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log("Error:", error.message);
        }
      });
  };
  const deletewarehouse = (id) => {
    const datadelete = {
      warehouse_id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteWarehouse`, datadelete)
      .then((response) => {
        toast.success(response.data.message);
        getwarehouse();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div>
              <div>
                <div className="row  manageFreight">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="freight_hd">Warehouse List</h4>
                      </div>
                      <div className="d-flex justify-content-end align-items-center">
                        <div className="mx-2">
                          <button onClick={openModal1}>Add Warehouse</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-striped tableICon">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>User Type</th>
                        <th>Country</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Town</th>
                        <th>Warehouse Address</th>
                        <th>Warehouse Name</th>
                        <th>Warehouse Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentdata &&
                        currentdata.length > 0 &&
                        currentdata.map((item, index) => (
                          <tr key={item.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{item.contact_person}</td>
                            <td>{item.country}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile_number}</td>
                            <td>{item.town}</td>
                            <td>{item.warehouse_address}</td>
                            <td>{item.warehouse_name}</td>
                            <td>{item.warehouse_number}</td>
                            <td>
                              <FaEdit
                                onClick={() => {
                                  openModal2(item.id);
                                }}
                                style={{
                                  color: "rgb(27 34 69)",
                                  marginRight: "10px",
                                  width: "20px",
                                  height: "15px",
                                  cursor: "pointer",
                                }}
                              />
                              <AiFillDelete
                                onClick={() => {
                                  deletewarehouse(item.id);
                                }}
                                style={{
                                  color: "rgb(27 34 69)",
                                  marginRight: "10px",
                                  width: "20px",
                                  height: "15px",
                                  cursor: "pointer",
                                }}
                              />
                            </td>
                          </tr>
                        ))}
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
                    <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                    <button
                      disabled={currentPage === totalPage}
                      className="bg_page"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i class="fi fi-rr-angle-small-right page_icon"></i>
                    </button>
                  </div>
                  <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: 300,
                        width: 450,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <h5 id="modal-modal-title">Add Excel</h5>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        style={{ display: "block", marginTop: "16px" }}
                      />
                      <Button variant="contained" onClick={postData}>
                        Submit
                      </Button>
                    </Box>
                  </Modal>
                  <Modal
                    open={isModalOpen2}
                    onClose={closeModal2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      className="warehouse_modal"
                      sx={{
                        position: "absolute",
                        overflow: "scroll",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                      }}
                    >
                      <div className="modal-header">
                        <h2 id="modal-modal-title">Edit Warehouse</h2>
                        <button className="btn btn-close" onClick={closeModal2}>
                          <CloseIcon />
                        </button>
                      </div>
                      <div className="newModalGap noFormaControl">
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Warehouse Name</label>
                            <input
                              type="text"
                              placeholder="Warehouse Name"
                              value={inputdata.warehouse_name}
                              onChange={handleFileChange1}
                              className="mb-3 border ps-2 py-2 rounded w-100"
                              name="warehouse_name"
                            />
                          </div>
                          <div className="col-6">
                            <label className="ware_label">
                              Warehouse Address
                            </label>
                            <input
                              type="text"
                              name="warehouse_address"
                              value={inputdata.warehouse_address}
                              placeholder="Warehouse Address"
                              onChange={handleFileChange1}
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Country</label>
                            <select
                              name="country"
                              onChange={handleFileChange1}
                              value={inputdata.country}
                              className="py-2 w-100 "
                            >
                              <option>Select Country....</option>
                              {countries &&
                                countries.length > 0 &&
                                countries.map((item, index) => {
                                  console.log(item);
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
                          <div className="col-6">
                            <label className="ware_label">Town</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              value={inputdata.town}
                              name="town"
                              placeholder="Town"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Mobile Number</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              name="mobile_number"
                              placeholder="Mobile Number"
                              value={inputdata.mobile_number}
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                          </div>
                          <div className="col-6">
                            <label className="ware_label">Contact Person</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              placeholder="Contact Person"
                              value={inputdata.contact_person}
                              name="contact_person"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <label className="ware_label">Email Address</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              value={inputdata.email}
                              name="email"
                              placeholder="Email Address"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                          </div>
                        </div>
                        <div className="text-center mt-2 unsetLt">
                          <Button variant="contained" onClick={apiupdatepost}>
                            Update Warehouse
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <Modal
                    open={isModalOpen1}
                    onClose={closeModal1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      className="warehouse_modal"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                      }}
                    >
                      {validationErrors.warehouse_number && (
                        <p className="mb-0" style={{ color: "red" }}>
                          {validationErrors.warehouse_number}
                        </p>
                      )}
                      <div className="modal-header">
                        <h2 id="modal-modal-title">Add Warehouse</h2>

                        <button className="btn btn-close" onClick={closeModal1}>
                          <CloseIcon />
                        </button>
                      </div>

                      <div className="newModalGap noFormaControl">
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Warehouse Name</label>
                            <input
                              type="text"
                              placeholder="Warehouse Name"
                              onChange={handleFileChange1}
                              className="mb-3 border ps-2 py-2 rounded w-100"
                              name="warehouse_name"
                            />
                            {validationErrors.warehouse_name && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.warehouse_name}
                              </p>
                            )}
                          </div>
                          <div className="col-6">
                            <label className="ware_label">
                              Warehouse Address
                            </label>
                            <input
                              type="text"
                              name="warehouse_address"
                              placeholder="Warehouse Address"
                              onChange={handleFileChange1}
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                            {validationErrors.warehouse_address && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.warehouse_address}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Country</label>
                            <select
                              name="country"
                              onChange={handleFileChange1}
                              className="py-2 w-100 "
                            >
                              <option>Select Country....</option>
                              {countries &&
                                countries.length > 0 &&
                                countries.map((item, index) => {
                                  console.log(item);
                                  return (
                                    <>
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                            {validationErrors.country && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.country}
                              </p>
                            )}
                          </div>
                          <div className="col-6">
                            <label className="ware_label">Town</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              name="town"
                              placeholder="Town"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                            {validationErrors.town && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.town}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label className="ware_label">Mobile Number</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              name="mobile_number"
                              placeholder="Mobile Number"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                            {validationErrors.mobile_number && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.mobile_number}
                              </p>
                            )}
                          </div>
                          <div className="col-6">
                            <label className="ware_label">Contact person</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              placeholder="Contact Person"
                              name="contact_person"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                            {validationErrors.contact_person && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.contact_person}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <label className="ware_label">Email address</label>
                            <input
                              type="text"
                              onChange={handleFileChange1}
                              name="email"
                              placeholder="Email Address"
                              className="mb-3 border ps-2 py-2 rounded w-100"
                            />
                            {validationErrors.email && (
                              <p className="mb-0" style={{ color: "red" }}>
                                {validationErrors.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-center mt-2 unsetLt">
                          <Button
                            variant="contained"
                            className="submit_btn"
                            onClick={postData1}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
