import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const pageSize = 10;

const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseInputDate = (value) => {
  if (!value) return null;
  const parts = value.split("T")[0].split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const formatDateForInput = (date) => toDateKey(date);
export default function Profilesection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [countruies, setCountruies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [pagenationData, setPagenationData] = useState(1);
  const [input, setInput] = useState({
    leave_from: "",
    leave_to: "",
    reason: "",
  });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [inputdata, setInputdata] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    contact: "",
    country_id: "",
  });
  const localstorageData = JSON.parse(localStorage.getItem("data123"));
  // ---------------- FETCH DATA ----------------
  const getdata = async (page = 1, search = "") => {
    try {
      setLoader(true);
      const payload = {
         staff_id:localstorageData.id,
        page: page,
        limit: pageSize,
        search: search,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getMystaffLeaves`,
        payload
      );
      setData(response.data.data);
      setPagenationData(response.data);
    } catch (error) {
      toast.error("Error fetching suppliers");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getdata(currentPage, searchQuery);
  }, []);
  const totalPages = Math.ceil(pagenationData.total / pagenationData.limit);
  // ---------------- HANDLE INPUT (ADD) ----------------
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "leave_from" && prev.leave_to && value > prev.leave_to) {
        next.leave_to = value;
      }
      return next;
    });
  };

  const openLeaveModal = () => {
    setInput({ leave_from: "", leave_to: "", reason: "" });
    setCalendarDate(new Date());
    setIsModalOpen(true);
  };

  const closeLeaveModal = () => {
    setIsModalOpen(false);
    setInput({ leave_from: "", leave_to: "", reason: "" });
  };

  const handleCalendarDayClick = (date) => {
    const clicked = formatDateForInput(date);

    setInput((prev) => {
      if (!prev.leave_from || (prev.leave_from && prev.leave_to)) {
        return { ...prev, leave_from: clicked, leave_to: "" };
      }
      if (clicked < prev.leave_from) {
        return { ...prev, leave_from: clicked, leave_to: prev.leave_from };
      }
      return { ...prev, leave_to: clicked };
    });
  };

  const leaveTileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const from = parseInputDate(input.leave_from);
    const to = parseInputDate(input.leave_to);
    if (!from) return null;

    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = to || from;

    if (day >= from && day <= end) {
      const key = toDateKey(day);
      if (key === toDateKey(from)) return "highlight leave-range-start";
      if (to && key === toDateKey(to)) return "highlight leave-range-end";
      return "highlight leave-range-between";
    }
    return null;
  };
  // ---------------- ADD SUPPLIER ----------------
  const handleAddSupplier = () => {
    if (!input.leave_from || !input.leave_to) {
      toast.error("Please select leave from and leave to dates");
      return;
    }
    if (!input.reason?.trim()) {
      toast.error("Please enter reason for leave");
      return;
    }

    const data = {
      staff_id: localstorageData.id,
      leave_from: input.leave_from,
      leave_to: input.leave_to,
      reason: input.reason,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}applyStaffLeave`, data)
      .then((res) => {
        toast.success(res.data.message || "Leave added successfully!");
        closeLeaveModal();
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
          .post(`${process.env.REACT_APP_BASE_URL}deleteCustomsClearingAgent`, {
            id: id,
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
    console.log(id, usr);
    if (usr) {
      setInputdata({
        id: usr.id,
        email: usr.email,
        name: usr.name,
        phone: usr.phone,
        address: usr.address,
        country_id: usr.country_id,
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
const formdata={
    id:inputdata.id,
    email:inputdata.email,
    name:inputdata.name,
    phone:inputdata.phone,
    address:inputdata.address,
    country_id:inputdata.country_id
}
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}updateCustomsClearingAgent`,
        formdata
      )
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
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    getdata(1, value); 
  };
  return (
    <>
      <>
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="d-flex justify-content-between my-3">
              <h4>All Leave</h4>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-2 py-1"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={openLeaveModal}
                >
                  Add Leave
                </button>
              </div>
            </div>
            {/* ---------------- TABLE ---------------- */}
            {loader ? (
              <div className="loader-container">
                <div className="loader"></div>
                <p>Loading...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th> Leave From</th>
                      <th>Leave To</th>
                      <th>Reason</th>
                      <th>Remark</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ item.leave_from.split('T')[0] }</td>
                        <td>{item.leave_to.split('T')[0]}</td>
                        <td>{item.reason}</td>
                        <td>{item?.admin_remark}</td>
                        <td>{item?.status===0 ? "Pending" : item.status===1 ? "Approved" : "Rejected"}</td>
                        <td>
                          {/* <FaEdit
                            onClick={() => openModal2(item.id)}
                            style={{
                              color: "#1b2245",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          /> */}
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
                <div className="d-flex justify-content-end align-items-end my-3">
                  <button
                    disabled={currentPage === 1}
                      className="bg_page"
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      getdata(currentPage - 1, searchQuery);
                    }}
                  >
                      <i class="fi fi-rr-angle-small-left page_icon"></i>
                  </button>

                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                      className="bg_page"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      getdata(currentPage + 1, searchQuery);
                    }}
                  >
                   <i class="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ---------------- ADD SUPPLIER MODAL ---------------- */}
        {isModalOpen && (
          <div className="custom-modal leave-modal-overlay">
            <div className="custom-modal-content leave-modal-content">
              <div className="custom-modal-header">
                <h5>Add Leave</h5>
                <button className="btn-close" onClick={closeLeaveModal}>
                  <CloseIcon />
                </button>
              </div>
              <div className="custom-modal-body">
                {/* <p className="leave-calendar-hint text-muted small mb-2">
                  Click a start date, then an end date on the calendar. You can
                  also edit dates manually below.
                </p> */}
                <Calendar
                  className="leave-picker-calendar w-100"
                  value={calendarDate}
                  onChange={setCalendarDate}
                  onClickDay={handleCalendarDayClick}
                  tileClassName={leaveTileClassName}
                  minDate={new Date()}
                />
                <div className="row mt-3 g-2 leave-modal-dates">
                  <div className="col-12 col-sm-6">
                    <label>Leave From</label>
                    <input
                      type="date"
                      className="form-control"
                      name="leave_from"
                      value={input.leave_from}
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label>Leave To</label>
                    <input
                      type="date"
                      className="form-control"
                      name="leave_to"
                      value={input.leave_to}
                      min={input.leave_from || undefined}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <label className="mt-3">Reason</label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={input.reason}
                  placeholder="Reason for leave"
                  onChange={handlechange}
                />
              </div>
              <div className="custom-modal-footer leave-modal-footer">
                <button
                  type="button"
                  className="btn btn-primary leave-modal-submit"
                  onClick={handleAddSupplier}
                >
                  Add Leave
                </button>
              </div>
            </div>
          </div>
        )}
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
              width: "30%",
            }}
          >
            <div className="modal-header">
              <h4>Edit Custom Agent</h4>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen2(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <label>Email</label>
            <input
              type="email"
              className="form-control mb-2"
              name="email"
              value={inputdata.email}
              onChange={handleupdateapi}
            />
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              value={inputdata.name}
              onChange={handleupdateapi}
            />
            <label>Phone</label>
            <input
              type="text"
              className="form-control mb-2"
              name="phone"
              value={inputdata.phone}
              onChange={handleupdateapi}
            />
            <label>Country of Origin</label>
            <select
              name="country_id"
              onChange={handleupdateapi}
              className="form-control mb-2"
              value={inputdata.country_id}
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
            <label>address</label>
            <input
              type="address"
              className="form-control mb-2"
              value="address"
              name="inputdata.address"
              onChange={handleupdateapi}
            />
            <Button variant="contained" fullWidth onClick={postData1234}>
              Update Customs Agent
            </Button>
          </Box>
        </Modal>
        <ToastContainer />
      </>
    </>
  );
}
