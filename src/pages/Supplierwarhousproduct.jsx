import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Supplierwarhousproduct() {
  const location = useLocation();
  const info = location.state.data;
  console.log(info);
   const [documents, setDocuments] = useState({});
  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);
  const postassiandata =async () => {
    try {
       await  axios
      .get(`${process.env.REACT_APP_BASE_URL}getSupplierWarehouseProducts?supplier_warehouse_id=${info.id}`)
      .then((response) => {
        console.log(response.data.data);
        setApidata(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    postassiandata();
  }, []);

  const getFileType = (fileName = "") => {
  const ext = fileName.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel";
  if (["doc", "docx"].includes(ext)) return "doc";
  return "other";
};
  const handleclicknav = () => {
    navigate("/Admin/SupplierWarehouse");
  };
   useEffect(() => {
  postassiandata();

  if (info?.files) {
    setDocuments(info.files);
  }
}, []);
useEffect(() => {
  postassiandata();

  if (info?.files) {
    const grouped = info.files.reduce((acc, item) => {
      const key = item.type || "other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    setDocuments(grouped);
  }
}, []);
     const deleteapi = (id) => {
        console.log(id);
        const data11 = {
          doc_id: id,
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}DeleteDocument`, data11)
          .then((response) => {
            // GetFreightImages();
            toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      };
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
                  <h4 className="det_hd text-start ms-3">Warehouse Full Details</h4>
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
                                    "en-GB"
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
                                <p className="client_para1">
                                  {info?.order_id}
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
                                  {info.costs_to_collect}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Warehouse</p>
                              </td>
                              <td>
                                <p className="client_para1"></p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.warehouse_cost}
                                </p>
                              </td>
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
                                  {info.costs_to_collect}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 ">Origin On Carriage Costs</p>
                              </td>
                              <td>
                                <p className="client_para1 "></p>
                              </td>
                              <td>
                                <p className="client_para1 ">
                                  {info.origin_oncarriage_costs}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1 ">Origin Incidental cost</p>
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
                                  {info.total_weight}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Dimensions:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                 {info?.total_cbm}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="client_para1">Packages:</p>
                              </td>
                              <td>
                                <p className="client_para1">
                                  {info.total_packages}
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
  <div key={groupIndex} className="mb-4">
    <label className="fw-bold text-capitalize">
      {groupName.replace("_", " ")} :
    </label>

    <div className="d-flex flex-wrap gap-3 mt-2">
      {documents[groupName]?.map((item) => {
        const fileUrl = `${process.env.REACT_APP_BASE_URLdocument}${item.file}`;
        const fileType = getFileType(item.file);

        return (
          <div
            key={item.id}
            style={{
              width: "140px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "8px",
              textAlign: "center",
              background: "#fafafa",
            }}
          >
            {/* ✅ IMAGE */}
            {fileType === "image" && (
              <img
                src={fileUrl}
                alt="file"
                style={{
                  width: "100%",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => window.open(fileUrl, "_blank")}
              />
            )}

            {/* ✅ PDF */}
            {fileType === "pdf" && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => window.open(fileUrl, "_blank")}
              >
                📄 <br /> PDF File
              </div>
            )}

            {/* ✅ EXCEL */}
            {fileType === "excel" && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => window.open(fileUrl, "_blank")}
              >
                📊 <br /> Excel File
              </div>
            )}

            {/* ✅ DOC */}
            {fileType === "doc" && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => window.open(fileUrl, "_blank")}
              >
                📝 <br /> Document
              </div>
            )}

            {/* ✅ OTHER */}
            {fileType === "other" && (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => window.open(fileUrl, "_blank")}
              >
                📎 <br /> File
              </div>
            )}

            {/* ✅ FILE NAME */}
            <div
              style={{
                fontSize: "11px",
                marginTop: "5px",
                wordBreak: "break-word",
              }}
            >
              {item.file.split("-").slice(1).join("-")}
            </div>

            {/* ✅ DELETE */}
            <DeleteIcon
              onClick={() => deleteapi(item.id)}
              className="text-danger mt-1"
              style={{ cursor: "pointer", fontSize: "18px" }}
            />
          </div>
        );
      })}
    </div>
  </div>
))}
                {/* Quotation (separate because it's not part of groups) */}
                <div className="mb-2">
                  <label>Attach Quotation :</label>
                  {info.attachment_Estimate && (
                    <a
                      href={`${process.env.REACT_APP_BASE_URLdocument}/${info?.attachment_Estimate}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view_docu ms-2"
                    >
                      View Document
                    </a>
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
                  <th scope="col">Warehouse Ref</th>
                  <th scope="col">Date Received</th>
                  <th scope="col">Package Type</th>
                  <th scope="col">Packages</th>
                  <th scope="col">Dimension</th>
                  <th scope="col">Weight</th>
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
                          <td>{item.warehouse_ref}</td>
                          <td>
                            {new Date(item.date_received).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>{item.package_type}</td>
                          <td>{item.packages}</td>
                          <td>{item.dimension}</td>
                          <td>{item.weight}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
