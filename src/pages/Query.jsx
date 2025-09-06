import { Close, Edit } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
const pageSize = 5;
const Query = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalid, setModalid] = useState(null);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [supplierdata, setSupplierdata] = useState([]);
  useEffect(() => {
    getclientlistr();
  }, []);
  const getclientlistr = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getQueries`)
      .then((response) => {
        console.log(response.data.data);
        setLoader(false);
        setSupplierdata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
        setLoader(false);
      });
  };
  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data1 = {
          query_id: id,
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}deleteQueries`, data1)
          .then((response) => {
            getclientlistr();
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredData = supplierdata.filter((item) => {
    console.log(item);
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = filteredData.slice(startIndex, endIndex);
  const handledit = (id) => {
    setModalid(id);
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handlechnage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleclickapi = async () => {
    try {
      const requestData = {
        id: modalid,
        outcome: data.outcome,
        resolution: data.resolution,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/updateQuery`,
        requestData
      );
      if (response.status === 200 && response.data.success) {
        closeModal1();
        toast.success("Query successfully updated");
      } else {
        console.log(response.data.message || "Unexpected response");
        toast.error(response.data.message || "Failed to update query");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong, please try again.");
    }
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div>
            <div>
              <div className="row manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <h4 className="freight_hd">Customer Query</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table className="table mt-4 table-striped tableICon">
                  <thead>
                    <tr>
                      <th scope="col">Freight Number</th>
                      <th scope="col">Dispute ID</th>
                      <th scope="col">Name</th>
                      <th className="col-2" scope="col-2">
                        Nature of Heading
                      </th>
                      <th scope="col">Message</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ border: "none" }}>
                    {currentdata &&
                      currentdata.length > 0 &&
                      currentdata.map((item, index) => {
                        return (
                          <>
                            <tr className="border-bottom" key={index}>
                              <td>{item.freight_no}</td>
                              <td>{item.Dispute_ID}</td>
                              <td>{item.name}</td>
                              <td className="col-2">
                                {item.nature_of_Heading}{" "}
                              </td>
                              <td>{item?.message}</td>
                              <td>
                                <p>{item.subject}</p>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="action_btn1">
                                    <AiFillDelete
                                      className="text-danger"
                                      onClick={() => {
                                        handledelete(item.id);
                                      }}
                                    />
                                  </div>
                                  <div className="action_btn1">
                                    <Edit
                                      style={{ cursor: "pointer" }}
                                      className="text-danger"
                                      onClick={() => {
                                        handledit(item.id);
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                <Modal
                  open={isModalOpen1}
                  onClose={closeModal1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="newModal"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      width: "500px",
                      height: "220px",
                    }}
                  >
                    <div className="modal-header">
                      <h2>
                        <h2 id="modal-modal-title">Filter</h2>
                      </h2>
                      <button className="btn btn-close" onClick={closeModal1}>
                        <Close />{" "}
                      </button>
                    </div>
                    <div className="newModalGap   noFormaControl">
                      <div className="row">
                        <div className="col-md-12">
                          <label class="div_label">Outcome </label>
                          <select
                            name="outcome"
                            class="box1"
                            placeholder="Outcome"
                            onChange={handlechnage}
                            required
                          >
                            <option>Select...</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                        <div className="col-md-12 mt-2">
                          <label class="div_label">Resolution*</label>
                          <input
                            type="text"
                            name="resolution"
                            class="box1 form-control mt-0"
                            placeholder="resolution"
                            onChange={handlechnage}
                            required
                          />
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        className="mt-4"
                        onClick={handleclickapi}
                      >
                        Apply
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
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
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Query;
