import axios from 'axios';
import React, { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SupplierSageInvoice() {
const [data, setData] = React.useState([]);
    useEffect(() => {
        getClients()
    },[])

      const getClients = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}getAllSupplierInvoices`
          );
          setData(response.data.data || []);
        } catch (error) {
          console.error("Error fetching clients:", error.message);
        }
      };

//        const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
const navigate = useNavigate();
const naviagetpage = () => {
    navigate("/Admin/addsupplierinvoice")}
  const deletewarehouse = async (id) => {
    console.log(id)
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
        getClients();

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
          error?.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  }
};
  return (
  <div className="wpWrapper">
          <div className="container-fluid">
            <button className="btn btn-secondary" onClick={naviagetpage}>
                  Add New Invoice
                </button>
      <div className="table-responsive mt-4">
                     <table className="table table-striped tableICon">
                       <thead>
                         <tr>
                           <th>Document Number</th>
                           <th>Supplier Name</th>
                           <th>Customer Ref.</th>
                           <th>Date</th>
                           <th>Total</th>
                           {/* {activeTab === "general" && <th>Country</th>} */}
                           <th>Upload</th>
                           <th>Action</th>
                         </tr>
                       </thead>
                       <tbody>
                         {data &&
                           data.length > 0 &&
                           data.map((item) => {
                             return (
                               <tr key={item.id}>
                                 <td>{item.document_number}</td>
                                 <td>{item.supplier_name}</td>
                                 <td>{item.customer_ref}</td>
                                 <td>
                                   {new Date(item.date).toLocaleDateString("EN-gb")}
                                 </td>
                                 <td>{item.invoice_total}</td>
                                
                                 {/* <td>
                                   <button
                                     className="btn btn-secondary"
                                     onClick={() => {
                                       handleclick(item);
                                     }}
                                   >
                                     Upload
                                   </button>
                                 </td> */}
                                 <td>
                                   <AiFillDelete
                                     onClick={() => {
                                       deletewarehouse(item);
                                     }}
                                     style={{
                                       color: "rgb(212, 69, 25)",
                                       marginRight: "10px",
                                       width: "20px",
                                       height: "15px",
                                       cursor: "pointer",
                                     }}
                                   />
                                 </td>
                                </tr>
                             );
                           })}
                       </tbody> 
                     </table>
                     {/* <div className="text-center d-flex justify-content-end align-items-center">
                       <button
                         disabled={currentPage === 1}
                         className="bg_page"
                         onClick={() => handlePageChange(currentPage - 1)}
                       >
                         <i className="fi fi-rr-angle-small-left page_icon"></i>
                       </button>
                       <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                       <button
                         disabled={currentPage === totalPage}
                         className="bg_page"
                         onClick={() => handlePageChange(currentPage + 1)}
                       >
                         <i className="fi fi-rr-angle-small-right page_icon"></i>
                       </button>
                     </div> */}
                   </div>
    </div>
    </div>
  )
}
