import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const pageSize = 10;
export default function Sageinvoices() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [files, setFiles] = useState(null);
  const [loader, setLoader] = useState(false);
  const [sageid, setSageid] = useState(null);
  const [namess, setNamess] = useState({
    search: "",
  });
  const [pagenation, setPagenation] = useState(1);
  const [openmodal, setOpenmodal] = useState(false);
  const navigate = useNavigate();
  const totalPage = pagenation?.totalPages;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getwarehouse(page);
  };
  const userid = JSON.parse(localStorage.getItem("data123"))?.id;
  const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = async (page) => {
    console.log(page);
    try {
      setLoader(true);
      console.log("Checking permissions...");
      const datapost = {
        staff_id: userid,
        route_url: "/Admin/sageinvoice",
        user_type: usertype,
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}GetSageInvoiceList?page=${currentPage}`
          );
          console.log(response.data);
          setPagenation(response.data.pagination);
          setData(response.data.data);
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Something went wrong while fetching data"
          );
        }
      } else {
        toast.error("You don’t have permission to access this page");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while checking permissions"
      );
    } finally {
      setLoader(false);
    }
  };
  const handleclick = (item) => {
    console.log(item.id);
    setSageid(item.id);
    setOpenmodal(true);
  };
  const handleCloseModal = () => setOpenmodal(false);
  const postData123 = () => {
    const formdtaa = new FormData();
    formdtaa.append("sage_invoice_id", sageid);
    if (!files) {
    } else {
      formdtaa.append("document", files);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}UpdateSageInvoiceDoc`, formdtaa)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            handleCloseModal();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  const handlefilechange = (e) => {
    setFiles(e.target.files[0]);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setNamess({ ...namess, [name]: value });
  };
  const handekgjfkdg = async () => {
    if (!namess.search) {
    }
    try {
      setLoader(true);
      console.log("Checking permissions...");
      const datapost = {
        staff_id: userid,
        route_url: "/Admin/sageinvoice",
        user_type: usertype,
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}GetSageInvoiceList?search=${namess.search}`
          );
          console.log(response.data);
          setNamess({ search: "" });
          setPagenation(response.data.pagination);
          setData(response.data.data);
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Something went wrong while fetching data"
          );
        }
      } else {
        toast.error("You don’t have permission to access this page");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while checking permissions"
      );
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... SageInvoice may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="">
              <div className="card-body">
                <div className="row  manageFreight">
                  <div className="col-12">
                    <div className="d-flex  justify-content-between">
                      <div>
                        <h4 className="freight_hd">Sage Invoice</h4>
                      </div>
                      <div className="d-flex">
                        <div>
                          <input
                            name="search"
                            className="mx-2 rounded px-2 py-1"
                            placeholder="Search... "
                            onChange={handlechange}
                          ></input>
                        </div>
                        <div>
                          <button onClick={handekgjfkdg}>Search</button>
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="d-flex justify-content-end align-items-center"></div>
                  </div>
                </div>
                <div className="table-responsive mt-4">
                  <table className="table table-striped tableICon">
                    <thead>
                      <tr>
                        <th>Document Number</th>
                        <th>Customer Name</th>
                        <th>Customer Ref.</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Upload</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.length > 0 &&
                        data.map((item, index) => {
                          console.log(item);
                          return (
                            <>
                              <tr key={item.id}>
                                <td>{item.document_number}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.customer_ref}</td>
                                <td>
                                  {new Date(item.date).toLocaleDateString(
                                    "EN-gb"
                                  )}
                                </td>
                                <td>{item.total}</td>
                                <td>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                      handleclick(item);
                                    }}
                                  >
                                    Upload
                                  </button>
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
                <Modal
                  open={openmodal}
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
                    }}
                  >
                    <div className="modal-header">
                      <h2>
                        <h2 id="modal-modal-title">Filter</h2>
                      </h2>
                      <button
                        className="btn btn-close"
                        onClick={handleCloseModal}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="newModalGap">
                      <label className="ware_label">Attach Sage Document</label>
                      <div>
                        <input
                          type="file"
                          onChange={handlefilechange}
                          className="border py-2 px-2 rounded w-100"
                        ></input>
                      </div>

                      <Button
                        variant="contained"
                        onClick={postData123}
                        className="mt-3 mb-2"
                      >
                        Apply
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
