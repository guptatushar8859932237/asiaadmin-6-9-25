import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";

const pageSize = 10;

export default function ManageSupplier() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [countruies, setCountruies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [input, setInput] = useState({
    supplier_email: "",
    supplier_name: "",
    supplier_phone: "",
    supplier_country: "",
    password: "",
  });

  const [inputdata, setInputdata] = useState({
    supplier_id: "",
    supplier_email: "",
    supplier_name: "",
    supplier_phone: "",
    supplier_country: "",
    password: "",
    profile: null, // only for update
  });

  // ---------------- FETCH DATA ----------------
  const getdata = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Error fetching suppliers");
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  // ---------------- SEARCH + PAGINATION ----------------
  const filterdata = data?.filter((item) => {
    return (
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filterdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filterdata.slice(startIndex, startIndex + pageSize);

  // ---------------- HANDLE INPUT (ADD) ----------------
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- ADD SUPPLIER ----------------
  const handleAddSupplier = () => {
    const data = {
      supplier_email: input.supplier_email,
      supplier_name: input.supplier_name,
      phone_no: input.supplier_phone,
      country: input.supplier_country,
      password: input.password,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}add-supplier`, data)
      .then((res) => {
        toast.success(res.data.message || "Supplier added successfully!");
        setIsModalOpen(false);
        getdata();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data?.message || "Invalid input!");
        } else if (error.request) {
          toast.error("Network error! Server not responding.");
        } else {
          toast.error("Unexpected error: " + error.message);
        }
      });
  };

  // ---------------- DELETE SUPPLIER ----------------
  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, {
            staff_id: id,
          })
          .then((res) => {
            toast.success(res.data.message);
            getdata();
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Delete failed!");
          });
      }
    });
  };

  // ---------------- OPEN EDIT MODAL ----------------
  const openModal2 = (id) => {
    const usr = data.find((p) => p.id === id);

    if (usr) {
      setInputdata({
        supplier_id: usr.id,
        supplier_email: usr.email,
        supplier_name: usr.name,
        supplier_phone: usr.phone_no,
        supplier_country: usr.country,
        password: "",
        profile: null,
      });
    }
    setIsModalOpen2(true);
  };

  // ---------------- HANDLE UPDATE INPUT ----------------
  const handleupdateapi = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile") {
      setInputdata((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setInputdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------------- UPDATE SUPPLIER ----------------
  const postData1234 = () => {
    const formdata = new FormData();
    formdata.append("supplier_id", inputdata.supplier_id);
    formdata.append("supplier_email", inputdata.supplier_email);
    formdata.append("supplier_name", inputdata.supplier_name);
    formdata.append("phone_no", inputdata.supplier_phone);
    formdata.append("country", inputdata.supplier_country);

    if (inputdata.password) {
      formdata.append("password", inputdata.password);
    }

    if (inputdata.profile) {
      formdata.append("profile", inputdata.profile);
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}update-supplier`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsModalOpen2(false);
        getdata();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Update failed!");
      });
  };

  // ---------------- GET COUNTRIES ----------------
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setCountruies(response.data.data);
      })
      .catch(() => {
        toast.error("Country fetch failed");
      });
  };

  useEffect(() => {
    getcountry();
  }, []);

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="wpWrapper">
            <div className="container-fluid">
              <div className="d-flex justify-content-between my-3">
                <h4>Manage Supplier</h4>

                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-2 py-1"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <button className="btn btn-primary ms-2" onClick={() => setIsModalOpen(true)}>
                    Add Supplier
                  </button>
                </div>
              </div>
              {/* ---------------- TABLE ---------------- */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Country</th>
                      {/* <th>Profile</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_no}</td>
                        <td>{item.country_name}</td>
                        <td>
                          <FaEdit
                            onClick={() => openModal2(item.id)}
                            style={{
                              color: "#1b2245",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          />
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handledelete(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* PAGINATION */}
                <div className="d-flex justify-content-end align-items-center my-3">
                  <button
                    disabled={currentPage === 1}
                    className="bg_page"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ◀
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    disabled={currentPage === totalPages}
                    className="bg_page"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------- ADD SUPPLIER MODAL ---------------- */}
          {isModalOpen && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h5>Add Supplier</h5>
                  <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="custom-modal-body">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    name="supplier_email"
                    placeholder="test@example.com"
                    onChange={handlechange}
                  />
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_name"
                      placeholder="Supplier Name"
                    onChange={handlechange}
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_phone"
                    placeholder="123456789"
                    onChange={handlechange}
                  />
                  <label>Country</label>
                  {/* <input
                    type="text"
                    className="form-control mb-2"
                    name="supplier_country"
                    onChange={handlechange}
                  /> */}
                   <label>Country of Origin</label>
                          <select
                            name="supplier_country"
                            onChange={handlechange}
                            className="form-control mb-2"
                          >
                            <option>Select</option>
                            {countruies &&
                              countruies.length > 0 &&
                              countruies.map((item, index) => {
                                return (
                                  <>
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                  {/* <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control mb-2"
                    name="supplier_profile"
                    onChange={handlechange}
                  /> */}
                     <label>Password</label>
                  <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    onChange={handlechange}
                  />
                </div>
               
                <div className="custom-modal-footer">
                  <button className="btn btn-primary" onClick={handleAddSupplier}>
                    Add Supplier
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* ---------------- EDIT SUPPLIER MODAL ---------------- */}
          <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                p: 3,
                borderRadius: 2,
                width:"30%",
              }}
            >
              <div className="modal-header">
                <h4>Edit Supplier</h4>
                <button className="btn-close" onClick={() => setIsModalOpen2(false)}>
                  <CloseIcon />
                </button>
              </div>
              <label>Email</label>
              <input
                type="email"
                className="form-control mb-2"
                name="supplier_email"
                value={inputdata.supplier_email}
                onChange={handleupdateapi}
              />
              <label>Name</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_name"
                value={inputdata.supplier_name}
                onChange={handleupdateapi}
              />
              <label>Phone</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_phone"
                value={inputdata.supplier_phone}
                onChange={handleupdateapi}
              />
              {/* <label>Country</label>
              <input
                type="text"
                className="form-control mb-2"
                name="supplier_country"
                value={inputdata.supplier_country}
                onChange={handleupdateapi}
              /> */}
                 <label>Country of Origin</label>
                          <select
                            name="supplier_country"
                            onChange={handleupdateapi}
                            className="form-control mb-2"
                             value={inputdata.supplier_country}
                          >
                            <option>Select</option>
                            {countruies &&
                              countruies.length > 0 &&
                              countruies.map((item, index) => {
                                return (
                                  <>
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control mb-3"
                name="profile"
                onChange={handleupdateapi}
              />

                <label>Password</label>
              <input
                type="password"
                className="form-control mb-2"
                name="password"
             
                onChange={handleupdateapi}
              />
              <Button variant="contained" fullWidth onClick={postData1234}>
                Update Supplier
              </Button>
            </Box>
          </Modal>
          <ToastContainer />
        </>
      )}
    </>
  );
}
