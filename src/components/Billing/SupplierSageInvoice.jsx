// import { Fab } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { AiFillDelete } from 'react-icons/ai';
// import { FaEdit } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// export default function SupplierSageInvoice() {
// const [data, setData] = React.useState([]);
//     useEffect(() => {
//         getClients()
//     },[])

//       const getClients = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}getAllSupplierInvoices`
//           );
//           setData(response.data.data || []);
//         } catch (error) {
//           console.error("Error fetching clients:", error.message);
//         }
//       };

// //        const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };
// const navigate = useNavigate();
// const naviagetpage = () => {
//     navigate("/Admin/addsupplierinvoice")}
//   const deletewarehouse = async (id) => {
//     console.log(id)
//   const result = await Swal.fire({
//     title: "Are you sure?",
//     text: "Do you want to delete this invoice?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//   });

//   if (result.isConfirmed) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}deleteSupplierInvoice/${id}`
//       );

//       if (response.data.success) {
//         getClients();

//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: "Invoice deleted successfully.",
//           confirmButtonColor: "#3085d6",
//         });
//       }
//     } catch (error) {
//       console.log(error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error?.response?.data?.message || "Something went wrong!",
//         confirmButtonColor: "#d33",
//       });
//     }
//   }
// };

// const AutoEditde =(item)=>{
// navigate("/Admin/editsupplierinvoiceedit", { state: { item } });
// }
//   return (
//   <div className="wpWrapper">
//           <div className="container-fluid">
//             <button className="btn btn-secondary" onClick={naviagetpage}>
//                   Add New Invoice
//                 </button>
//       <div className="table-responsive mt-4">
//                      <table className="table table-striped tableICon">
//                        <thead>
//                          <tr>
//                            <th>Waybill</th>
//                            <th>vessel</th>
//                            <th>Supplier Name</th>
//                            <th>Supplier Email</th>
//                            <th>Supplier Phone</th>
//                            <th>Total</th>
//                            <th>status</th>
//                            {/* {activeTab === "general" && <th>Country</th>} */}
//                            <th>Action</th>
//                          </tr>
//                        </thead>
//                        <tbody>
//                          {data &&
//                            data.length > 0 &&
//                            data.map((item) => {
//                              return (
//                                <tr key={item.id}>
//                                  <td>{item.waybill}</td>
//                                  <td>{item.vessel}</td>
//                                  <td>
//                                    {item.supplier_name}
//                                  </td>
//                                  <td>{item.supplier_email}</td>
//                                  <td>{item.supplier_phone}</td>
//                                  <td>{item.invoice_total}</td>
//                                  <td>{item.status}</td>
//                                  {/* <td>
//                                    <button
//                                      className="btn btn-secondary"
//                                      onClick={() => {
//                                        handleclick(item);
//                                      }}
//                                    >
//                                      Upload
//                                    </button>
//                                  </td> */}
//                                  <td>
//                                    <AiFillDelete
//                                      onClick={() => {
//                                        deletewarehouse(item);
//                                      }}
//                                      style={{
//                                        color: "rgb(212, 69, 25)",
//                                        marginRight: "10px",
//                                        width: "20px",
//                                        height: "15px",
//                                        cursor: "pointer",
//                                      }}
//                                    />
//                                    <FaEdit
//                                                                         onClick={() => {
//                                        AutoEditde(item);
//                                      }}
//                                      style={{
//                                        color: "rgb(73, 202, 80)",
//                                        marginRight: "10px",
//                                        width: "20px",
//                                        height: "15px",
//                                        cursor: "pointer",
//                                      }}
//                                    />
//                                  </td>
//                                 </tr>
//                              );
//                            })}
//                        </tbody> 
//                      </table>
//                      {/* <div className="text-center d-flex justify-content-end align-items-center">
//                        <button
//                          disabled={currentPage === 1}
//                          className="bg_page"
//                          onClick={() => handlePageChange(currentPage - 1)}
//                        >
//                          <i className="fi fi-rr-angle-small-left page_icon"></i>
//                        </button>
//                        <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                        <button
//                          disabled={currentPage === totalPage}
//                          className="bg_page"
//                          onClick={() => handlePageChange(currentPage + 1)}
//                        >
//                          <i className="fi fi-rr-angle-small-right page_icon"></i>
//                        </button>
//                      </div> */}
//                    </div>
//     </div>
//     </div>
//   )
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SupplierSageInvoice() {
  const [data, setData] = useState([]);

  // ================= PAGINATION STATES =================

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);

  const limit = 10;

  const navigate = useNavigate();

  // ================= GET DATA =================

  useEffect(() => {
    getClients(currentPage);
  }, [currentPage]);

  const getClients = async (pageNo = 1) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllSupplierInvoices?page=${pageNo}&limit=${limit}`
      );

      console.log(response.data);

      setData(response.data.data || []);

      // TOTAL PAGE CALCULATION
      setTotalPage(
        Math.ceil((response.data.total || 1) / limit)
      );

    } catch (error) {
      console.error(
        "Error fetching clients:",
        error.message
      );
    }
  };

  // ================= PAGE CHANGE =================

  const handlePageChange = (page) => {
    console.log("Selected Page =>", page);

    setCurrentPage(page);
  };

  // ================= NAVIGATE =================

  const naviagetpage = () => {
    navigate("/Admin/addsupplierinvoice");
  };

  // ================= DELETE =================

  const deletewarehouse = async (id) => {
    console.log(id);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this invoice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}deleteSupplierInvoice/${id}`
        );

        if (response.data.success) {
          // REFRESH CURRENT PAGE
          getClients(currentPage);

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Invoice deleted successfully.",
            confirmButtonColor: "#3085d6",
          });
        }

      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.response?.data?.message ||
            "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // ================= EDIT =================

  const AutoEditde = (item) => {
    navigate("/Admin/editsupplierinvoiceedit", {
      state: { item },
    });
  };

  return (
    <div className="wpWrapper">
      <div className="container-fluid">

        {/* ADD BUTTON */}

        <button
          className="btn btn-secondary"
          onClick={naviagetpage}
        >
          Add New Invoice
        </button>

        {/* TABLE */}

        <div className="table-responsive mt-4">
          <table className="table table-striped tableICon">

            <thead>
              <tr>
                <th>Waybill</th>
                <th>Vessel</th>
                <th>Supplier Name</th>
                <th>Supplier Email</th>
                <th>Supplier Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data &&
              data.length > 0 ? (
                data.map((item) => {
                  return (
                    <tr key={item.supplier_invoice_id}>

                      <td>{item.waybill}</td>

                      <td>{item.vessel}</td>

                      <td>
                        {item.supplier_name}
                      </td>

                      <td>
                        {item.supplier_email}
                      </td>

                      <td>
                        {item.supplier_phone}
                      </td>

                      <td>
                        {item.invoice_total}
                      </td>

                      <td>{item.status}</td>

                      <td>
                        <AiFillDelete
                          onClick={() => {
                            deletewarehouse(
                              item.supplier_invoice_id
                            );
                          }}
                          style={{
                            color:
                              "rgb(212, 69, 25)",
                            marginRight: "10px",
                            width: "20px",
                            height: "15px",
                            cursor: "pointer",
                          }}
                        />

                        <FaEdit
                          onClick={() => {
                            AutoEditde(item);
                          }}
                          style={{
                            color:
                              "rgb(73, 202, 80)",
                            marginRight: "10px",
                            width: "20px",
                            height: "15px",
                            cursor: "pointer",
                          }}
                        />
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}

          <div className="text-center d-flex justify-content-end align-items-center mt-3">

            {/* PREVIOUS */}

            <button
              disabled={currentPage === 1}
              className="bg_page"
              onClick={() =>
                handlePageChange(currentPage - 1)
              }
            >
              <i className="fi fi-rr-angle-small-left page_icon"></i>
            </button>

            {/* PAGE INFO */}

            <span className="mx-3">
              {`Page ${currentPage} of ${totalPage}`}
            </span>

            {/* NEXT */}

            <button
              disabled={currentPage === totalPage}
              className="bg_page"
              onClick={() =>
                handlePageChange(currentPage + 1)
              }
            >
              <i className="fi fi-rr-angle-small-right page_icon"></i>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}