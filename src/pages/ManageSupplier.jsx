// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import Swal from 'sweetalert2';
// import CloseIcon from "@mui/icons-material/Close";

// const pageSize = 6;
// const ManageSupplier = () => {
//   const [inputData, setInputData] = useState({
//     name: "",
//     email: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [id, setId] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState({});
//   const [supplierdata, setSupplierdata] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };
//   const handlevalidtae = (value) => {
//     let error = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!value.supplier_name) {
//       toast.error("Supplier Name is required");
//       error.supplier_name = "Supplier Name is required";
//     }
//     if (!value.supplier_email) {
//       toast.error("Supplier Email is required");
//       error.supplier_email = "Supplier Email is required";
//     } else if (!emailRegex.test(value.supplier_email)) {
//       toast.error("Supplier Email is invalid");
//       error.supplier_email = "Supplier Email is invalid";
//     } else {
//       apihit();
//     }
//     setError(error);
//   };
//   const handleclick = () => {
//     handlevalidtae(data);
//   };
//   const apihit = () => {
//     setLoading(true);
//     axios.post(`${process.env.REACT_APP_BASE_URL}add-supplier`, data)
//       .then((response) => {
//         toast.success(response.data.message);
//         showdata();
//         setData({
//           name: "",
//           email: "",
//         });
//       }).catch((error) => {
//         toast.error(error.response.data.message);
//       }).finally(() => {
//         setLoading(false);
//       });
//   };
//   const showdata = () => {
//     setLoading(true);
//     axios.get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
//       .then((response) => {
//         setSupplierdata(response.data.data);
//       }).catch((error) => {
//         console.log(error.response.data.message);
//       }).finally(() => {
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     showdata();
//   }, []);
//   const handledelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, { "supplier_id": id }).then((response) => {
//           toast.success(response.data.message);
//           showdata();
//         }).catch((error) => {
//           toast.error(error.response.data.message);
//         })
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//       }
//     });
//   }
//   const editDataAll = (id) => {
//     setId(id);
//     const selectedUser = supplierdata.filter((item) => {
//       return item.id === id;
//     });
//     const getData = selectedUser[0];
//     setInputData((prevData) => ({
//       ...prevData,
//       name: getData.name,
//       email: getData.email,
//     }));
//   };
//   const submitInputdata = (e) => {
//     setInputData({ ...inputData, [e.target.name]: e.target.value });
//   };
//   const handleChange = () => {
//     const updatedprodata = {
//       supplier_email: inputData.email,
//       supplier_id: id,
//       supplier_name: inputData.name
//     };
//     axios.post(`${process.env.REACT_APP_BASE_URL}update-supplier`, updatedprodata)
//       .then((response) => {
//         toast.success(response.data.message);
//         showdata();
//       }).catch((error) => {
//         console.log(error);
//       });
//   };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };
//   const filteredData = supplierdata.filter(item => {
//     return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.email.toLowerCase().includes(searchQuery.toLowerCase());
//   });
//   const totalPage = Math.ceil(filteredData.length / pageSize);
//   const startindex = (currentPage - 1) * pageSize;
//   const endIndex = startindex + pageSize;
//   const currentdata = filteredData.slice(startindex, endIndex);
//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div>
//             <div>
//               <div className="row manageFreight">
//                 <div className="col-12">
//                   <div className='d-flex justify-content-between align-item-center'>
//                     <div className="">
//                       <h4 className="freight_hd">Add Supplier</h4>
//                     </div>
//                     <div className='d-flex justify-content-end align-items-center'>
//                       <div className="">
//                         <input className='px-2 py-1 rounded' placeholder='Search' type="text"  value={searchQuery} onChange={handleSearch}></input>
//                       </div>
//                       <div className="ms-2">
//                         <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal fade modalBorder" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title" id="exampleModalLabel">Add Supplier</h5>
//                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" >
//                   <CloseIcon />

//                       </button>
//                     </div>
//                     <div className="modal-body">
//                       <div className="mb-3">
//                         <label>Name</label>
//                         <input type="text" onChange={handlechange} name='supplier_name' className="form-control" id="floatingInput1" placeholder="name" />
//                       </div>
//                       <div className="mb-3">
//                         <label>Email</label>
//                         <input type="email" onChange={handlechange} name='supplier_email' className="form-control" id="floatingInput" placeholder="tushar@gmail.com" />
//                         <p className='text-danger mb-0'>{error.supplier_email}</p>
//                       </div>
//                     </div>
//                     <div className="modal-footer">
//                       <button type="button" onClick={handleclick} className="btn btn-primary">Submit</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="table-responsive mt-2">
//                 <table className="table table-striped tableICon">
//                   <thead>
//                     <tr>
//                       <th scope="col">Sr.No.</th>
//                       <th scope="col">Client Name</th>
//                       <th scope="col">Supplier Email</th>
//                       <th scope="col">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody style={{ border: "none" }}>
//                     {
//                       currentdata && currentdata.length > 0 && currentdata.map((item, index) => {
//                         console.log(item)
//                         return (
//                           <>
//                             <tr className='border-bottom' key={index}>
//                               <th>{startindex + index + 1}</th>
//                               <td>{item.name}</td>
//                               <td>{item.email}</td>
//                               <td>
//                                 <div className='d-flex align-items-center'>
//                                   <div className='ms-2'>
//                                     <button onClick={() => { editDataAll(item.id) }} type="button" className="border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                                       <FaEdit style={{ color: "#1b2245", margin: "10px" }} />
//                                     </button>
//                                     <div className="modal fade modalBorder" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                                       <div className="modal-dialog modal-dialog-centered">
//                                         <div className="modal-content">
//                                           <div className="modal-header">
//                                             <h5 className='modal-title'>Update Supplier</h5>
//                                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
//                                               <CloseIcon />
//                                             </button>
//                                           </div>
//                                           <div className="modal-body">
//                                             <div className="mb-3">
//                                               <label>Name</label>
//                                               <input type="text" name="name" value={inputData.name} onChange={submitInputdata} className="form-control" id="floatingInput1" placeholder="name" />
//                                             </div>
//                                             <div className="mb-3">
//                                               <label>Email</label>
//                                               <input type="email" name="email" value={inputData.email} onChange={submitInputdata} className="form-control" id="floatingInput" placeholder="tushar@gmail.com" />
//                                             </div>
//                                           </div>
//                                           <div className="modal-footer">
//                                             {/* <button type="button" className="btn close_btn" data-bs-dismiss="modal">Close</button> */}
//                                             <button type="button" data-bs-dismiss="modal" onClick={() => { handleChange(item.id) }} className="btn btn-primary">Update</button>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="action_btn1">
//                                     <AiFillDelete className="text-danger" onClick={() => { handledelete(item.id) }} style={{cursor:"pointer"}} />
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           </>
//                         )
//                       })}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="text-center d-flex justify-content-end align-items-center">
//                     <button
//                      disabled={currentPage === 1}
//                       className="bg_page"
//                       onClick={() => handlePageChange(currentPage - 1)}
//                     >
//                       <i class="fi fi-rr-angle-small-left page_icon"></i>
//                     </button>
//                     <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                     <button
//                       disabled={currentPage === totalPage}
//                       className="bg_page"
//                       onClick={() => handlePageChange(currentPage + 1)}
//                     >
//                       <i class="fi fi-rr-angle-small-right page_icon"></i>
//                     </button>
//                   </div>
//               {/* <div className='mt-4'>
//                 <button disabled={currentPage === 1} className='btn rounded pagePre' style={{ backgroundColor: "red", color: "white" }} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//                 <span className='mx-2'>{`Page ${currentPage} of ${totalPage}`}</span>
//                 <button disabled={currentPage === totalPage} className='btn rounded pageNext' style={{ backgroundColor: "green", color: "white" }} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//               </div> */}
//             </div>
//           </div >
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };
// export default ManageSupplier;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;

export default function ManageSupplier() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputdata, setInputdata] = useState([]);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [input, setInput] = useState({
    supplier_email: "",
    supplier_name: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const filterdata = data?.filter((item) => {
    return (
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) 
    );
  });
  const totalPages = Math.ceil(filterdata.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filterdata.slice(startIndex, endIndex);
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
        console.log(error.response);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getdata();
  }, []);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlevalidate = (value) => {
    let error = {};
    if (!value.supplier_email) {
      error.supplier_email = "Email is required";
    }
    if (!value.supplier_name) {
      error.supplier_name = "Name is required";
    }
    setError(error);
    if (Object.keys(error).length === 0) {
      handleapi();
    }
  };
  const handleapi = () => {
    const apivali = {
      supplier_email: input.supplier_email,
      supplier_name: input.supplier_name,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}add-supplier`, apivali)
      .then((response) => {
        toast.success(response.data.message);
        getdata();
        setIsModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleclick = () => {
    handlevalidate(input);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
        axios
          .post(`${process.env.REACT_APP_BASE_URL}delete-supplier`, {
            staff_id: id,
          })
          .then((response) => {
            toast.success(response.data.message);
            getdata();
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
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const openModal2 = (id) => {
    const userlog = data.find((item) => item.id === id);
    console.log(userlog)
    if (userlog) {
      setInputdata({
        supplier_id: id,
        supplier_email: userlog.email,
        supplier_name: userlog.name,
      });
    }
    setIsModalOpen2(true);
  };
  const postData1234 = () => {
    console.log(inputdata);
    const apivali = {
      supplier_id: inputdata.supplier_id,
      supplier_email: inputdata.supplier_email,
      supplier_name: inputdata.supplier_name,
    };
    console.group(apivali)
      axios
        .post(`${process.env.REACT_APP_BASE_URL}update-supplier`, apivali)
        .then((response) => {
          toast.success(response.data.message);
          closeModal2();
          getdata();
          setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <>
          <div className="wpWrapper">
            <div className="container-fluid">
              <div>
                <div>
                  <div className="row manageFreight">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <h4 className="freight_hd">Add Supplier</h4>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="">
                            <input
                              className="px-2 py-1 rounded "
                              type="text"
                              placeholder="Search"
                              value={searchQuery}
                              onChange={handleSearch}
                            ></input>
                          </div>
                          <div className="ms-2">
                            <button type="button" onClick={openModal}>
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <div className="custom-modal">
                      <div className="custom-modal-content">
                        <div className="custom-modal-header">
                          <h5 className="custom-modal-title">Add Staff</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeModal}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <div className="custom-modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label mb-2 md_staff"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="name@example.com"
                              onChange={handlechange}
                              name="supplier_email"
                            />
                            <p className="text-danger">{error.supplier_email}</p>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputText"
                              className="form-label mb-2 md_staff"
                            >
                              Full Name
                            </label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                onChange={handlechange}
                                name="supplier_name"
                                className="form-control"
                                id="inputText"
                                placeholder="Enter your Name"
                              />
                              <p className="text-danger">{error.supplier_name}</p>
                            </div>
                          </div>
                         
                        </div>
                        <div className="custom-modal-footer">
                          <button
                            type="button"
                            className="btn text-white"
                            onClick={handleclick}
                            style={{ backgroundColor: "#1b2245" }}
                          >
                            Add Member
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="table-responsive mt-3">
                    <table className="table table-striped tableICon">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No.</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ border: "none" }}>
                        {currentData &&
                          currentData.length > 0 &&
                          currentData.map((item, index) => {
                            console.log(item)
                            return (
                              <tr className="border-bottom" key={index}>
                                <th>{startIndex + index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                               
                                <td>
                                  <div className="action_btn1 d-flex align-items-center">
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
                                      className="text-danger"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        handledelete(item.id);
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
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
                        {" "}
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
                <Modal
                  open={isModalOpen2}
                  onClose={closeModal2}
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
                      <h2 id="modal-modal-title">Edit Staff</h2>
                      <button className="btn btn-close" onClick={closeModal2}>
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="newModalGap">
                      <div className="row">
                        <div className="col-12">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="ware_label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control mb-3"
                            value={inputdata?.supplier_email}
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            onChange={handleupdateapi}
                            name="supplier_email"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="inputText" className="ware_label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            onChange={handleupdateapi}
                            name="supplier_name"
                            value={inputdata?.supplier_name}
                            className="form-control mb-3"
                            id="inputText"
                            placeholder="Enter your Name"
                          />
                        </div>
                      </div>
                    
                      <div className="text-center mt-2 unsetLt">
                        <Button
                          variant="contained"
                          className="submit_btn"
                          onClick={postData1234}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}
