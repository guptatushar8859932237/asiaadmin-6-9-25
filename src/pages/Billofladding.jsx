// import React from "react";
// import image from "../Assests/favicon.png";
// import { usePDF } from "react-to-pdf";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MdDownloadForOffline } from "react-icons/md";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// export default function Billofladding() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const datat = location?.state?.data;
//   console.log(datat);
//   const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
//   const handleclicknav = () => {
//     navigate("/Admin/order");
//   };
//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div>
//             <div>
//               <div className="row manageFreight">
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="d-flex">
//                       <div>
//                         <ArrowBackIcon
//                           onClick={handleclicknav}
//                           className="text-dark"
//                           style={{ cursor: "pointer" }}
//                         />
//                       </div>
//                       <div>
//                         <h4 className="freight_hd ms-3 mt-0">Deliver Note</h4>
//                       </div>
//                     </div>
//                     <MdDownloadForOffline
//                       className="fs-2"
//                       onClick={() => toPDF()}
//                       style={{ color: "#1b2245" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <section
//                 style={{ marginTop: "10px",}}
//                 ref={targetRef}
//               >
//                 <div
//                   style={{
//                     height: "auto",
//                     width: "100%",
//                     border: "1px solid black",
//                     padding: 20,
//                     outline: "auto",
//                   }}
//                 >
//                   <table style={{ width: "100%" }}>
//                     <tbody>
//                       <tr>
//                         <th>
//                           <h1 style={{ fontSize: 22, textAlign: "center" }}>
//                             Asia Direct-Africa(Pty)Ltd
//                           </h1>
//                         </th>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "start",
//                             }}
//                           >
//                             <p
//                               style={{
//                                 fontSize: 11,
//                                 padding: "0 10px 0 0",
//                                 margin: 0,
//                               }}
//                             >
//                               Address:
//                             </p>
//                             <p
//                               style={{
//                                 fontSize: 11,
//                                 textAlign: "center",
//                                 margin: 0,
//                               }}
//                             >
//                               Unit-4,Villa Valenica Office Park,2 Anemoon Ave
//                               <br />
//                               Kempton Park,South Africa,1619
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "start",
//                               width: "100%",
//                             }}
//                           >
//                             <p style={{ fontSize: 11, padding: "0 10px 0 0" }}>
//                               Reg:
//                             </p>
//                             <p style={{ fontSize: 11, textAlign: "center" }}>
//                               2017/667803/07
//                             </p>
//                             <table>
//                               <tbody>
//                                 <tr>
//                                   <td>
//                                     <p
//                                       style={{
//                                         fontSize: 11,
//                                         padding: "0 10px 0 0",
//                                       }}
//                                     >
//                                       Vat:
//                                     </p>
//                                   </td>
//                                   <td>
//                                     <p
//                                       style={{
//                                         fontSize: 11,
//                                         textAlign: "center",
//                                       }}
//                                     >
//                                       4740280377
//                                     </p>
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table style={{ width: "100%" }}>
//                     <tbody>
//                       <tr>
//                         <td style={{ width: "50%" }}>
//                           <table style={{ width: "100%" }}>
//                             <tbody>
//                               <tr style={{ verticalAlign: "sub" }}>
//                                 <td>
//                                   <div style={{ width: "100%" }}>
//                                     <p
//                                       style={{
//                                         fontSize: 17,
//                                         fontWeight: 700,
//                                         marginBottom: 85,
//                                       }}
//                                     >
//                                       AIR/ SEA LCL DELIVERY NOTE
//                                     </p>
//                                   </div>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <div
//                                     style={{ height: 150, textAlign: "center" }}
//                                   >
//                                     <img
//                                       src={image}
//                                       alt="h"
//                                       style={{
//                                         width: "150px",
//                                         objectFit: "contain",
//                                       }}
//                                     />
//                                   </div>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                         <td style={{ width: "50%" }}>
//                           <table style={{ width: "100%", marginTop: 10 }}>
//                             <tbody>
//                               <tr>
//                                 <td style={{ padding: 0 }}>
//                                   <div
//                                     style={{
//                                       border: "1px solid black",
//                                       width: "40%",
//                                       borderBottom: 0,
//                                     }}
//                                   >
//                                     <p
//                                       style={{
//                                         margin: 0,
//                                         fontSize: 10,
//                                         fontWeight: 500,
//                                         paddingLeft: 5,
//                                       }}
//                                     >
//                                       Consignee
//                                     </p>
//                                   </div>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td style={{ padding: 0, width: "100%" }}>
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "end",
//                                       border: "1px solid black",
//                                     }}
//                                   >
//                                     <div style={{ width: "63%" }}>
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         {datat.client_name}
//                                       </p>
//                                       <p
//                                         style={{
//                                           marginBottom: 10,
//                                           fontSize: 10,
//                                           fontWeight: 500,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         {datat.address_1}
//                                       </p>
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 500,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         {datat.city}, {datat.user_country_name}
//                                       </p>
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 500,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         {datat.code}
//                                       </p>
//                                     </div>
//                                     <div
//                                       style={{
//                                         borderLeft: "1px solid black",
//                                         width: "37%",
//                                         marginTop: 15,
//                                         borderTop: "1px solid #000",
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         Email
//                                       </p>
//                                       <div
//                                         style={{
//                                           width: "100%",
//                                           borderTop: "1px solid #000",
//                                         }}
//                                       >
//                                         <p
//                                           style={{
//                                             marginBottom: 0,
//                                             fontSize: 10,
//                                             color: "black",
//                                             fontWeight: 400,
//                                             fontFamily: "monospace",
//                                             paddingLeft: 5,
//                                           }}
//                                         >
//                                           {datat?.shipper_email}
//                                         </p>
//                                       </div>
//                                       <div
//                                         style={{
//                                           width: "100%",
//                                           borderTop: "1px solid #000",
//                                         }}
//                                       >
//                                         <p
//                                           style={{
//                                             margin: 0,
//                                             fontSize: 10,
//                                             fontWeight: 700,
//                                             paddingLeft: 5,
//                                           }}
//                                         >
//                                           Telephone
//                                         </p>
//                                       </div>
//                                       <div
//                                         style={{
//                                           width: "100%",
//                                           borderTop: "1px solid #000",
//                                         }}
//                                       >
//                                         <p
//                                           style={{
//                                             marginBottom: 0,
//                                             fontSize: 10,
//                                             color: "black",
//                                             fontWeight: 400,
//                                             fontFamily: "monospace",
//                                             paddingLeft: 5,
//                                           }}
//                                         >
//                                           {datat?.telephone}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td style={{ padding: 0 }}>
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "end",
//                                     }}
//                                   >
//                                     <div
//                                       style={{
//                                         width: "37%",
//                                         borderLeft: "1px solid #000",
//                                         borderRight: "1px solid #000",
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         Mobile
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       justifyContent: "end",
//                                     }}
//                                   >
//                                     <div
//                                       style={{
//                                         width: "37%",
//                                         border: "1px solid #000",
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                         }}
//                                       >
//                                         {datat?.cellphone}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                           <table style={{ width: "100%", marginTop: 10 }}>
//                             <tbody>
//                               <tr>
//                                 <td style={{ padding: 0 }}>
//                                   <div
//                                     style={{
//                                       border: "1px solid black",
//                                       width: "40%",
//                                       borderBottom: 0,
//                                     }}
//                                   >
//                                     <p
//                                       style={{
//                                         margin: 0,
//                                         fontSize: 10,
//                                         fontWeight: 500,
//                                         paddingLeft: 5,
//                                       }}
//                                     >
//                                       Shipper
//                                     </p>
//                                   </div>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td style={{ padding: 0 }}>
//                                   <div
//                                     style={{
//                                       border: "1px solid black",
//                                       width: "100%",
//                                     }}
//                                   >
//                                     <p
//                                       style={{
//                                         marginBottom: 20,
//                                         fontSize: 10,
//                                         fontWeight: 700,
//                                         paddingLeft: 5,
//                                       }}
//                                     >
//                                       {datat.shipper}
//                                     </p>
//                                     <p
//                                       style={{
//                                         margin: 0,
//                                         fontSize: 10,
//                                         fontWeight: 500,
//                                         paddingLeft: 5,
//                                       }}
//                                     >
//                                       {datat.shipper_address}
//                                     </p>
//                                     <p
//                                       style={{
//                                         margin: 0,
//                                         fontSize: 10,
//                                         fontWeight: 500,
//                                         paddingLeft: 5,
//                                       }}
//                                     ></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table style={{ width: "100%", marginBottom: 20 }}>
//                     <tbody>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               border: "1px solid black",
//                               width: "22%",
//                               borderBottom: "1px solid transparent",
//                               height: 17,
//                             }}
//                           >
//                             <p
//                               style={{
//                                 margin: 0,
//                                 fontSize: 10,
//                                 fontWeight: 700,
//                                 textTransform: "uppercase",
//                                 paddingLeft: 5,
//                               }}
//                             >
//                               Cargo Carrier Information
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Carrier
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 width: "50%",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Order Number/Reference
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 //   backgroundColor: "red",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {datat?.carrier}
//                               {/* <p style="color: red; margin-bottom: 0px;"></p> */}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                                 display: "flex",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <button
//                                 type="button"
//                                 style={{
//                                   backgroundColor: "lightgrey",
//                                   color: "black",
//                                   border: 0,
//                                   borderRadius: 20,
//                                   width: "100%",
//                                   fontSize: 10,
//                                   height: 14,
//                                 }}
//                               >
//                                 OR000{datat?.order_id}
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Carrier Code
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 width: "50%",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Local Clearing Agent
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 backgroundColor: "red",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {/* <p style="color: red; margin-bottom: 0px;">.</p> */}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                   paddingTop: 3,
//                                 }}
//                               >
//                                 Asia Direct
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Vessel/Voyage/Imo(LLoyads)
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "20%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 CONTAINER NO.
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Master Bill of Landing
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 House Bill Of Landing
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {datat?.vessel}{" "}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "20%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {datat?.container_no}{" "}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               {datat?.master_landing_bill}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {datat?.house_bill_landing}
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Release Type
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   marginBottom: 5,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Commodity Type
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               {datat?.release_type}
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "50%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 20,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                   paddingTop: 3,
//                                 }}
//                               >
//                                 {datat.commodity_name}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Origin
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "20%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   textTransform: "uppercase",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Etd
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Destination
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Eta
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat.city},{datat.collection_from_country}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 width: "20%",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(datat?.actual_delivery_date).toLocaleDateString("en-GB") =="01/01/1970"? "" : new Date(datat?.actual_delivery_date).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat.destination}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(
//                                   datat?.delivery_ETA
//                                 ).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Port of loading
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "20%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                   textTransform: "uppercase",
//                                 }}
//                               >
//                                 Etd
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Port of discharge
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid transparent",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   textTransform: "uppercase",
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Eta
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "30%",
//                                 borderBottom: "1px solid black",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat.port_of_loading}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "20%",
//                                 borderBottom: "1px solid black",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(
//                                   datat?.actual_delivery_date
//                                 ).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 width: "25%",
//                                 borderBottom: "1px solid black",
//                                 height: 17,
//                                 borderLeft: "1px solid transparent",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat?.delivery_port_of_discharge}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 border: "1px solid black",
//                                 borderLeft: "1px solid transparent",
//                                 width: "25%",
//                                 borderBottom: "1px solid black",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(
//                                   datat.delivery_ETA
//                                 ).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table style={{ width: "100%", marginBottom: 20 }}>
//                     <tbody>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               border: "1px solid black",
//                               width: "22%",
//                               borderBottom: "1px solid transparent",
//                               height: 17,
//                             }}
//                           >
//                             <p
//                               style={{
//                                 margin: 0,
//                                 fontSize: 10,
//                                 fontWeight: 700,
//                                 textTransform: "uppercase",
//                                 paddingLeft: 5,
//                               }}
//                             >
//                               ROUTING INFORMATION
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               border: "1px solid black",
//                               width: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div style={{ width: "22%", height: 17 }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Mode
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Vessel/Voyage/Imo(LLoyads)
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "12%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Carrier
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Load
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Disch.
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 ETA
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 ETD
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               borderBottom: "1px solid black",
//                               borderLeft: "1px solid black",
//                               width: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div style={{ width: "22%", height: 17 }}>
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat?.mode_of_transport}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               {datat?.vessel}
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               ></p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "12%",
//                                 height: 17,
//                               }}
//                             >
//                               <p>{datat?.carrier}</p>
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               />
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat?.delivery_port_of_loading}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat?.delivery_port_of_discharge}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(
//                                   datat?.delivery_ETA
//                                 ).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                                 borderRight: "1px solid black",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {new Date(
//                                   datat?.actual_delivery_date
//                                 ).toLocaleDateString("en-GB")}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table style={{ width: "100%", marginBottom: 20 }}>
//                     <tbody>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               border: "1px solid black",
//                               width: "22%",
//                               borderBottom: "1px solid transparent",
//                               height: 17,
//                             }}
//                           >
//                             <p
//                               style={{
//                                 margin: 0,
//                                 fontSize: 10,
//                                 fontWeight: 700,
//                                 textTransform: "uppercase",
//                                 paddingLeft: 5,
//                               }}
//                             >
//                               CONSIGNMENT INFORMATION
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               border: "1px solid black",
//                               width: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div style={{ width: "22%", height: 17 }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 MARKS AND NUMBERS
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "30%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 GOODS DESCRIPTION
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 WEIGHT
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 VOLUME
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "20%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 PACKS(OUT/IN)
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               borderBottom: "1px solid black",
//                               borderLeft: "1px solid black",
//                               width: "100%",
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div style={{ width: "22%", height: 17 }}>
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               ></p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "30%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat.product_desc}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "18%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {datat.weight}
//                               </p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               ></p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               ></p>
//                             </div>
//                             <div
//                               style={{
//                                 borderLeft: "1px solid black",
//                                 width: "10%",
//                                 height: 17,
//                                 borderRight: "1px solid black",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   marginBottom: 0,
//                                   fontSize: 10,
//                                   color: "black",
//                                   fontWeight: 400,
//                                   fontFamily: "monospace",
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 {/* 6 */}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               borderLeft: "1px solid black",
//                               width: "40%",
//                               height: 17,
//                               borderBottom: "1px solid transparent",
//                               borderRight: "1px solid black",
//                               borderTop: "1px solid transparent",
//                             }}
//                           >
//                             <p
//                               style={{
//                                 margin: 0,
//                                 fontSize: 10,
//                                 fontWeight: 700,
//                                 paddingLeft: 5,
//                               }}
//                             >
//                               COMMENTS
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ padding: 0 }}>
//                           <div
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               border: "1px solid black",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "40%",
//                                 borderRight: "1px solid black",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   height: 230,
//                                   display: "flex",
//                                   alignItems: "end",
//                                 }}
//                               >
//                                 <p
//                                   style={{
//                                     marginBottom: 0,
//                                     fontSize: 10,
//                                     color: "black",
//                                     fontWeight: 400,
//                                     fontFamily: "monospace",
//                                     paddingLeft: 5,
//                                   }}
//                                 >
//                                   {datat.comment}
//                                 </p>
//                               </div>
//                             </div>
//                             <div style={{ width: "60%" }}>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       margin: 0,
//                                       fontSize: 10,
//                                       fontWeight: 700,
//                                       paddingLeft: 5,
//                                     }}
//                                   >
//                                     DESCRIPTION OF GOODS
//                                   </p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       margin: 0,
//                                       fontSize: 10,
//                                       fontWeight: 700,
//                                       paddingLeft: 5,
//                                       textAlign: "center",
//                                     }}
//                                   >
//                                     CARTONS
//                                   </p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       margin: 0,
//                                       fontSize: 10,
//                                       fontWeight: 700,
//                                       paddingLeft: 5,
//                                       textAlign: "center",
//                                     }}
//                                   >
//                                     CBM's
//                                   </p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       margin: 0,
//                                       fontSize: 10,
//                                       fontWeight: 700,
//                                       paddingLeft: 5,
//                                       textAlign: "center",
//                                     }}
//                                   >
//                                     WEIGHT
//                                   </p>
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   >
//                                     {datat.product_desc} {" " } {"  "} {datat.commodity_name}
//                                     {/* {" "}  */}
                                    
//                                   </p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   >
//                                     {datat?.cartons}
//                                   </p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   >{datat?.CBM}</p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   >
//                                     {datat.weight}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div
//                                 style={{
//                                   width: "100%",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   borderBottom: "1px solid black",
//                                 }}
//                               >
//                                 <div style={{ width: "50%", height: 17 }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   ></p>
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}
//                                 >
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                                 <div
//                                   style={{
//                                     borderLeft: "1px solid black",
//                                     width: "17%",
//                                     height: 17,
//                                   }}>
//                                   <p
//                                     style={{
//                                       marginBottom: 0,
//                                       fontSize: 10,
//                                       color: "black",
//                                       fontWeight: 400,
//                                       fontFamily: "monospace",
//                                       paddingLeft: 5,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div style={{ width: "100%", display: "flex" }}>
//                                 <div
//                                   style={{
//                                     width: "50%",
//                                     borderRight: "1px solid black",
//                                   }}
//                                 >
//                                   <div
//                                     style={{
//                                       width: "100%",
//                                       height: 35,
//                                       display: "flex",
//                                       alignItems: "end",
//                                       justifyContent: "flex-end",
//                                     }}
//                                   >
//                                     <p
//                                       style={{
//                                         marginBottom: 0,
//                                         fontSize: 10,
//                                         color: "black",
//                                         fontWeight: 400,
//                                         fontFamily: "monospace",
//                                         paddingLeft: 5,
//                                       }}
//                                     >
//                                       Total
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div style={{ width: "50%" }}>
//                                   <div
//                                     style={{
//                                       width: "100%",
//                                       display: "flex",
//                                       borderBottom: "1px solid black",
//                                     }}
//                                   >
//                                     <div style={{ width: "33%", height: 17 }}>
//                                       <p
//                                         style={{
//                                           marginBottom: 0,
//                                           fontSize: 10,
//                                           color: "black",
//                                           fontWeight: 400,
//                                           fontFamily: "monospace",
//                                           paddingLeft: 5,
//                                         }}
//                                       />
//                                     </div>
//                                     <div
//                                       style={{
//                                         borderLeft: "1px solid black",
//                                         width: "33%",
//                                         height: 17,
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           marginBottom: 0,
//                                           fontSize: 10,
//                                           color: "black",
//                                           fontWeight: 400,
//                                           fontFamily: "monospace",
//                                           paddingLeft: 5,
//                                         }}
//                                       />
//                                     </div>
//                                     <div
//                                       style={{
//                                         borderLeft: "1px solid black",
//                                         width: "33%",
//                                         height: 17,
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           marginBottom: 0,
//                                           fontSize: 10,
//                                           color: "black",
//                                           fontWeight: 400,
//                                           fontFamily: "monospace",
//                                           paddingLeft: 5,
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                   <div
//                                     style={{ width: "100%", display: "flex" }}
//                                   >
//                                     <div style={{ width: "33%", height: 17 }}>
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                           textAlign: "center",
//                                         }}
//                                       >
//                                         {datat.cartons}
//                                       </p>
//                                     </div>
//                                     <div
//                                       style={{
//                                         borderLeft: "1px solid black",
//                                         width: "33%",
//                                         height: 17,
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                           textAlign: "center",
//                                         }}
//                                       >{datat?.CBM}</p>
//                                     </div>
//                                     <div
//                                       style={{
//                                         borderLeft: "1px solid black",
//                                         width: "33%",
//                                         height: 17,
//                                       }}
//                                     >
//                                       <p
//                                         style={{
//                                           margin: 0,
//                                           fontSize: 10,
//                                           fontWeight: 700,
//                                           paddingLeft: 5,
//                                           textAlign: "center",
//                                         }}>
//                                         {datat.weight}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table style={{ width: "100%", marginBottom: 20 }}>
//                     <tbody>
//                       <tr>
//                         <td>
//                           <div
//                             style={{ width: "22%", }}
//                           >
//                             <p
//                               style={{
//                                 margin: 0,
//                                 fontSize: 11,
//                                 fontWeight: 800,
                               
//                               }}
//                             >
//                               Delivery
//                             </p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div style={{ width: "33%" }}>
//                               <p
//                                 style={{
//                                   marginTop: 5,
//                                   fontSize: 10,
//                                   fontWeight: 700,
                                  
//                                 }}
//                               >
//                                 Driver Name
//                               </p>
//                             </div>
//                             <div style={{ width: "33%" }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Vehical Reg
//                               </p>
//                             </div>
//                             <div style={{ width: "33%" }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Driver Sign:
//                                 <span style={{ marginLeft: 15 }}>
//                                   _________________________
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               justifyContent: "flex-end",
//                             }}
//                           >
//                             <div style={{ width: "30%" }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                   paddingLeft: 5,
//                                 }}
//                               >
//                                 Date:
//                                 <span style={{ marginLeft: 15 }}>
//                                   _________________________
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div style={{ width: "33%" }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
//                                  }}
//                               >
//                                 Recevived By
//                               </p>
//                             </div>
//                             <div style={{ width: "33%" }}>
//                               <p
//                                 style={{
//                                   margin: 0,
//                                   fontSize: 10,
//                                   fontWeight: 700,
                                 
//                                 }}
//                               >
//                                 Recevier Sign
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <div style={{ width: "100%", display: "flex" }}>
//                             <div style={{ width: "33%" }}>
//                               <span  >
//                                 _________________________
//                               </span>
//                             </div>
//                             <div style={{ width: "33%" }}>
//                               <span>
//                                 _________________________
//                               </span>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import image from "../Assests/favicon.png";
import { usePDF } from "react-to-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
export default function Billofladding() {
  const location = useLocation();
  const [data,setData]=useState({})
  const navigate = useNavigate();
  const datat = location?.state?.data;
  console.log(datat);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const handleclicknav = () => {
    navigate("/Admin/order");
  };

useEffect(() => { 
  getalldata()
},[])
const getalldata = async () => {
  try {
    console.log("dataget", datat.order_id);

    const postData = {
      orderId: datat.order_id,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}OrderDetailsById`,
      postData
    );

    console.log(response.data.data[0]);
    setData(response.data.data[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
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
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          className="text-dark"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd ms-3 mt-0">Deliver Note</h4>
                      </div>
                    </div>
                    <MdDownloadForOffline
                      className="fs-2"
                      onClick={() => toPDF()}
                      style={{ color: "#1b2245" }}
                    />
                  </div>
                </div>
              </div>
              <section
                style={{ marginTop: "10px",}}
                ref={targetRef}
              >
                <div
                  style={{
                    height: "auto",
                    width: "100%",
                    border: "1px solid black",
                    padding: 20,
                    outline: "auto",
                  }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <th>
                          <h1 style={{ fontSize: 22, textAlign: "center" }}>
                            Asia Direct-Africa(Pty)Ltd
                          </h1>
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "start",
                            }}
                          >
                            <p
                              style={{
                                fontSize: 11,
                                padding: "0 10px 0 0",
                                margin: 0,
                              }}
                            >
                              Address:
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                textAlign: "center",
                                margin: 0,
                              }}
                            >
                              Unit-4,Villa Valenica Office Park,2 Anemoon Ave
                              <br />
                              Kempton Park,South Africa,1619
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "start",
                              width: "100%",
                            }}
                          >
                            <p style={{ fontSize: 11, padding: "0 10px 0 0" }}>
                              Reg:
                            </p>
                            <p style={{ fontSize: 11, textAlign: "center" }}>
                              2017/667803/07
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <p
                                      style={{
                                        fontSize: 11,
                                        padding: "0 10px 0 0",
                                      }}
                                    >
                                      Vat:
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      style={{
                                        fontSize: 11,
                                        textAlign: "center",
                                      }}
                                    >
                                      4740280377
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr style={{ verticalAlign: "sub" }}>
                                <td>
                                  <div style={{ width: "100%" }}>
                                    <p
                                      style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        marginBottom: 85,
                                      }}
                                    >
                                      AIR/ SEA LCL DELIVERY NOTE
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div
                                    style={{ height: 150, textAlign: "center" }}
                                  >
                                    <img
                                      src={image}
                                      alt="h"
                                      style={{
                                        width: "150px",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td style={{ width: "50%" }}>
                          <table style={{ width: "100%", marginTop: 10 }}>
                            <tbody>
                              <tr>
                                <td style={{ padding: 0 }}>
                                  <div
                                    style={{
                                      border: "1px solid black",
                                      width: "40%",
                                      borderBottom: 0,
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 10,
                                        fontWeight: 500,
                                        paddingLeft: 5,
                                      }}
                                    >
                                      Consignee
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: 0, width: "100%" }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      border: "1px solid black",
                                    }}
                                  >
                                    <div style={{ width: "63%" }}>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        {datat.client_name}
                                      </p>
                                      <p
                                        style={{
                                          marginBottom: 10,
                                          fontSize: 10,
                                          fontWeight: 500,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        {datat.address_1}
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 500,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        {datat.city}, {datat.user_country_name}
                                      </p>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 500,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        {datat.code}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        borderLeft: "1px solid black",
                                        width: "37%",
                                        marginTop: 15,
                                        borderTop: "1px solid #000",
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        Email
                                      </p>
                                      <div
                                        style={{
                                          width: "100%",
                                          borderTop: "1px solid #000",
                                        }}
                                      >
                                        <p
                                          style={{
                                            marginBottom: 0,
                                            fontSize: 10,
                                            color: "black",
                                            fontWeight: 400,
                                            fontFamily: "monospace",
                                            paddingLeft: 5,
                                          }}
                                        >
                                          {datat?.shipper_email}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          borderTop: "1px solid #000",
                                        }}
                                      >
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            paddingLeft: 5,
                                          }}
                                        >
                                          Telephone
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          borderTop: "1px solid #000",
                                        }}
                                      >
                                        <p
                                          style={{
                                            marginBottom: 0,
                                            fontSize: 10,
                                            color: "black",
                                            fontWeight: 400,
                                            fontFamily: "monospace",
                                            paddingLeft: 5,
                                          }}
                                        >
                                          {datat?.telephone}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: 0 }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "37%",
                                        borderLeft: "1px solid #000",
                                        borderRight: "1px solid #000",
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        Mobile
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "37%",
                                        border: "1px solid #000",
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                        }}
                                      >
                                        {datat?.cellphone}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style={{ width: "100%", marginTop: 10 }}>
                            <tbody>
                              <tr>
                                <td style={{ padding: 0 }}>
                                  <div
                                    style={{
                                      border: "1px solid black",
                                      width: "40%",
                                      borderBottom: 0,
                                    }}
                                  >
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 10,
                                        fontWeight: 500,
                                        paddingLeft: 5,
                                      }}
                                    >
                                      Shipper
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: 0 }}>
                                  <div
                                    style={{
                                      border: "1px solid black",
                                      width: "100%",
                                    }}
                                  >
                                    <p
                                      style={{
                                        marginBottom: 20,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        paddingLeft: 5,
                                      }}
                                    >
                                      {datat.shipper}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 10,
                                        fontWeight: 500,
                                        paddingLeft: 5,
                                      }}
                                    >
                                      {datat.shipper_address}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: 10,
                                        fontWeight: 500,
                                        paddingLeft: 5,
                                      }}
                                    ></p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "22%",
                              borderBottom: "1px solid transparent",
                              height: 17,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: 5,
                              }}
                            >
                              Cargo Carrier Information
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Carrier
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                width: "50%",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Order Number/Reference
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                //   backgroundColor: "red",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {data?.carrier}
                              {/* <p style="color: red; margin-bottom: 0px;"></p> */}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  backgroundColor: "lightgrey",
                                  color: "black",
                                  border: 0,
                                  borderRadius: 20,
                                  width: "100%",
                                  fontSize: 10,
                                  height: 14,
                                }}
                              >
                                OR000{datat?.order_id}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Carrier Code
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                width: "50%",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Local Clearing Agent
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                backgroundColor: "red",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {/* <p style="color: red; margin-bottom: 0px;">.</p> */}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  paddingTop: 3,
                                }}
                              >
                                Asia Direct
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Vessel/Voyage/Imo(LLoyads)
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "20%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                CONTAINER NO.
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Master Bill of Landing
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                House Bill Of Landing
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {data?.vessel}{" "}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "20%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {data?.container_no}{" "}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              {data?.master_landing_bill}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {data?.house_bill_landing}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Release Type
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  marginBottom: 5,
                                  paddingLeft: 5,
                                }}
                              >
                                Commodity Type
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              {data?.release_type}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "50%",
                                borderBottom: "1px solid transparent",
                                height: 20,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                  paddingTop: 3,
                                }}
                              >
                                {data.commodity_name}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Origin
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "20%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  paddingLeft: 5,
                                }}
                              >
                                Etd
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Destination
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Eta
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {datat.city},{datat.collection_from_country}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                width: "20%",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(datat?.actual_delivery_date).toLocaleDateString("en-GB") =="01/01/1970"? "" : new Date(datat?.actual_delivery_date).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {datat.destination}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(
                                  datat?.delivery_ETA
                                ).toLocaleDateString("en-GB")=="01/01/1970"?"":new Date(
                                  datat?.delivery_ETA
                                ).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Port of loading
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "20%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textTransform: "uppercase",
                                }}
                              >
                                Etd
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Port of discharge
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid transparent",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  textTransform: "uppercase",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Eta
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "30%",
                                borderBottom: "1px solid black",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data.port_of_loading}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "20%",
                                borderBottom: "1px solid black",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(
                                  data?.actual_delivery_date
                                ).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "25%",
                                borderBottom: "1px solid black",
                                height: 17,
                                borderLeft: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data?.delivery_port_of_discharge}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderLeft: "1px solid transparent",
                                width: "25%",
                                borderBottom: "1px solid black",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(
                                  data.delivery_ETA
                                ).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "22%",
                              borderBottom: "1px solid transparent",
                              height: 17,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: 5,
                              }}
                            >
                              ROUTING INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "22%", height: 17 }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Mode
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Vessel/Voyage/Imo(LLoyads)
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "12%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Carrier
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Load
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Disch.
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                ETA
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                ETD
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              borderLeft: "1px solid black",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "22%", height: 17 }}>
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data?.mode_of_transport}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              {data?.vessel}
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "12%",
                                height: 17,
                              }}
                            >
                              <p>{data?.carrier}</p>
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              />
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data?.delivery_port_of_loading}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data?.delivery_port_of_discharge}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(
                                  data?.delivery_ETA
                                ).toLocaleDateString("en-GB")=='01/01/1970'?"":new Date(
                                  data?.delivery_ETA
                                ).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                                borderRight: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {new Date(
                                  data?.actual_delivery_date
                                ).toLocaleDateString("en-GB")=='01/01/0970'?"":new Date(
                                  data?.actual_delivery_date
                                ).toLocaleDateString("en-GB")}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "22%",
                              borderBottom: "1px solid transparent",
                              height: 17,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: 5,
                              }}
                            >
                              CONSIGNMENT INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "22%", height: 17 }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                MARKS AND NUMBERS
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "30%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                GOODS DESCRIPTION
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                WEIGHT
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                VOLUME
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "20%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                PACKS(OUT/IN)
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              borderBottom: "1px solid black",
                              borderLeft: "1px solid black",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ width: "22%", height: 17 }}>
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "30%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data.product_desc}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "18%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {data.weight}
                              </p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                borderLeft: "1px solid black",
                                width: "10%",
                                height: 17,
                                borderRight: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 10,
                                  color: "black",
                                  fontWeight: 400,
                                  fontFamily: "monospace",
                                  paddingLeft: 5,
                                }}
                              >
                                {/* 6 */}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              borderLeft: "1px solid black",
                              width: "40%",
                              height: 17,
                              borderBottom: "1px solid transparent",
                              borderRight: "1px solid black",
                              borderTop: "1px solid transparent",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 10,
                                fontWeight: 700,
                                paddingLeft: 5,
                              }}
                            >
                              COMMENTS
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              border: "1px solid black",
                            }}
                          >
                            <div
                              style={{
                                width: "40%",
                                borderRight: "1px solid black",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  height: 230,
                                  display: "flex",
                                  alignItems: "end",
                                }}
                              >
                                <p
                                  style={{
                                    marginBottom: 0,
                                    fontSize: 10,
                                    color: "black",
                                    fontWeight: 400,
                                    fontFamily: "monospace",
                                    paddingLeft: 5,
                                  }}
                                >
                                  {data.comment}
                                </p>
                              </div>
                            </div>
                            <div style={{ width: "60%" }}>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      paddingLeft: 5,
                                    }}
                                  >
                                    DESCRIPTION OF GOODS
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      paddingLeft: 5,
                                      textAlign: "center",
                                    }}
                                  >
                                    CARTONS
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      paddingLeft: 5,
                                      textAlign: "center",
                                    }}
                                  >
                                    CBM's
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      paddingLeft: 5,
                                      textAlign: "center",
                                    }}
                                  >
                                    WEIGHT
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  >
                                    {data.product_desc} {" " } {"  "} {data.commodity_name}
                                    {/* {" "}  */}
                                    
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  >
                                    {data?.cartons}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  >{data?.CBM}</p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  >
                                    {data.weight}
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <div style={{ width: "50%", height: 17 }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  ></p>
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "17%",
                                    height: 17,
                                  }}>
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      fontSize: 10,
                                      color: "black",
                                      fontWeight: 400,
                                      fontFamily: "monospace",
                                      paddingLeft: 5,
                                    }}
                                  />
                                </div>
                              </div>
                              <div style={{ width: "100%", display: "flex" }}>
                                <div
                                  style={{
                                    width: "50%",
                                    borderRight: "1px solid black",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      height: 35,
                                      display: "flex",
                                      alignItems: "end",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <p
                                      style={{
                                        marginBottom: 0,
                                        fontSize: 10,
                                        color: "black",
                                        fontWeight: 400,
                                        fontFamily: "monospace",
                                        paddingLeft: 5,
                                      }}
                                    >
                                      Total
                                    </p>
                                  </div>
                                </div>
                                <div style={{ width: "50%" }}>
                                  <div
                                    style={{
                                      width: "100%",
                                      display: "flex",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <div style={{ width: "33%", height: 17 }}>
                                      <p
                                        style={{
                                          marginBottom: 0,
                                          fontSize: 10,
                                          color: "black",
                                          fontWeight: 400,
                                          fontFamily: "monospace",
                                          paddingLeft: 5,
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        borderLeft: "1px solid black",
                                        width: "33%",
                                        height: 17,
                                      }}
                                    >
                                      <p
                                        style={{
                                          marginBottom: 0,
                                          fontSize: 10,
                                          color: "black",
                                          fontWeight: 400,
                                          fontFamily: "monospace",
                                          paddingLeft: 5,
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        borderLeft: "1px solid black",
                                        width: "33%",
                                        height: 17,
                                      }}
                                    >
                                      <p
                                        style={{
                                          marginBottom: 0,
                                          fontSize: 10,
                                          color: "black",
                                          fontWeight: 400,
                                          fontFamily: "monospace",
                                          paddingLeft: 5,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    style={{ width: "100%", display: "flex" }}
                                  >
                                    <div style={{ width: "33%", height: 17 }}>
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                          textAlign: "center",
                                        }}
                                      >
                                        {data.cartons}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        borderLeft: "1px solid black",
                                        width: "33%",
                                        height: 17,
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                          textAlign: "center",
                                        }}
                                      >{data?.CBM}</p>
                                    </div>
                                    <div
                                      style={{
                                        borderLeft: "1px solid black",
                                        width: "33%",
                                        height: 17,
                                      }}
                                    >
                                      <p
                                        style={{
                                          margin: 0,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                          textAlign: "center",
                                        }}>
                                        {data.weight}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td>
                          <div
                            style={{ width: "22%", }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 11,
                                fontWeight: 800,
                               
                              }}
                            >
                              Delivery
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "33%" }}>
                              <p
                                style={{
                                  marginTop: 5,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  
                                }}
                              >
                                Driver Name
                              </p>
                            </div>
                            <div style={{ width: "33%" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Vehical Reg
                              </p>
                            </div>
                            <div style={{ width: "33%" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Driver Sign:
                                <span style={{ marginLeft: 15 }}>
                                  _________________________
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div style={{ width: "30%" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Date:
                                <span style={{ marginLeft: 15 }}>
                                  _________________________
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "33%" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                 }}
                              >
                                Recevived By
                              </p>
                            </div>
                            <div style={{ width: "33%" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  fontWeight: 700,
                                 
                                }}
                              >
                                Recevier Sign
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "33%" }}>
                              <span  >
                                _________________________
                              </span>
                            </div>
                            <div style={{ width: "33%" }}>
                              <span>
                                _________________________
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
