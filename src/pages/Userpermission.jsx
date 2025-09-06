// // // // // // // // // // import axios from "axios";
// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // // // //   const areAllChildrenChecked =
// // // // // // // // // //     node.children.length > 0 &&
// // // // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // // //     if (isChecked) {
// // // // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // // // //     }
// // // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // // // };
// // // // // // // // // //   const handleChildChange = (childId) => {
// // // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // // //     if (updatedCheckedItems.has(childId)) {
// // // // // // // // // //       updatedCheckedItems.delete(childId);
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.add(childId);
// // // // // // // // // //     }
// // // // // // // // // //     if (
// // // // // // // // // //       node.children.length > 0 &&
// // // // // // // // // //       node.children.every((child) => updatedCheckedItems.has(child.id))
// // // // // // // // // //     ) {
// // // // // // // // // //       updatedCheckedItems.add(node.id);
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.delete(node.id);
// // // // // // // // // //     }
// // // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // // //   };
// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // // // //         {node.children.length > 0 && (
// // // // // // // // // //           <span
// // // // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // // // //           >
// // // // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // // // //           </span>
// // // // // // // // // //         )}
// // // // // // // // // //         <input
// // // // // // // // // //           type="checkbox"
// // // // // // // // // //           checked={isChecked}
// // // // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // // // //         />
// // // // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // // // //       </div>
// // // // // // // // // //       {expanded &&
// // // // // // // // // //         node.children.map((child) => (
// // // // // // // // // //           <TreeNode
// // // // // // // // // //             key={child.id}
// // // // // // // // // //             node={child}
// // // // // // // // // //             checkedItems={checkedItems}
// // // // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // // // //           />
// // // // // // // // // //         ))}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };
// // // // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     getInitialData();
// // // // // // // // // //     afterlogin();
// // // // // // // // // //   }, []);
// // // // // // // // // //   const afterlogin =async ()=>{
// // // // // // // // // //     try {
// // // // // // // // // //    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,{staff_id:staffId?.id})
// // // // // // // // // //    setInitialData(response.data.data)
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //       console.log(error)
// // // // // // // // // //     }
// // // // // // // // // //   }
// // // // // // // // // //   const getInitialData = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.get(
// // // // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // // // //       );
// // // // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // // // //         id: menu.id,
// // // // // // // // // //         menu_name: menu.menu_name,
// // // // // // // // // //         children: menu.menu_Routes
// // // // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // // // //               id: route.id,
// // // // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // // // //               children: route.subRoutes
// // // // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // // // //                     id: subRoute.id,
// // // // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // // // //                     children: [],
// // // // // // // // // //                   }))
// // // // // // // // // //                 : [],
// // // // // // // // // //             }))
// // // // // // // // // //           : [],
// // // // // // // // // //       }));
// // // // // // // // // //       setInitialData(transformedData);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error(error);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   const handleClick = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const postData = {
// // // // // // // // // //         staff_id: staffId,
// // // // // // // // // //         staff_permissions:checkedItems,
// // // // // // // // // //       };
// // // // // // // // // //       const response = await axios.post(
// // // // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // // // //         postData
// // // // // // // // // //       );
// // // // // // // // // //       console.log(response);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log(error);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <div className="wpWrapper">
// // // // // // // // // //         <div className="container-fluid">
// // // // // // // // // //           <div className="card">
// // // // // // // // // //             <div className="card-body">
// // // // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // // // //               {initialData.map((node) => (
// // // // // // // // // //                 <TreeNode
// // // // // // // // // //                   key={node.id}
// // // // // // // // // //                   node={node}
// // // // // // // // // //                   checkedItems={checkedItems}
// // // // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // // // //                 />
// // // // // // // // // //               ))}
// // // // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // // // //                 Update Role
// // // // // // // // // //               </button>
// // // // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };
// // // // // // // // // // export default UserPermission;
// // // // // // // // // // import axios from "axios";
// // // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // // // //   const areAllChildrenChecked =
// // // // // // // // // //     node.children.length > 0 &&
// // // // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // // //     if (isChecked) {
// // // // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // // // //     }
// // // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // // //   };
// // // // // // // // // //   const handleChildChange = (childId) => {
// // // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // // //     if (updatedCheckedItems.has(childId)) {
// // // // // // // // // //       updatedCheckedItems.delete(childId);
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.add(childId);
// // // // // // // // // //     }
// // // // // // // // // //     if (
// // // // // // // // // //       node.children.length > 0 &&
// // // // // // // // // //       node.children.every((child) => updatedCheckedItems.has(child.id))
// // // // // // // // // //     ) {
// // // // // // // // // //       updatedCheckedItems.add(node.id);
// // // // // // // // // //     } else {
// // // // // // // // // //       updatedCheckedItems.delete(node.id);
// // // // // // // // // //     }
// // // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // // //   };
// // // // // // // // // //   return (
// // // // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // // // //         {node.children.length > 0 && (
// // // // // // // // // //           <span
// // // // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // // // //           >
// // // // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // // // //           </span>
// // // // // // // // // //         )}
// // // // // // // // // //         <input
// // // // // // // // // //           type="checkbox"
// // // // // // // // // //           checked={isChecked}
// // // // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // // // //         />
// // // // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // // // //       </div>
// // // // // // // // // //       {expanded &&
// // // // // // // // // //         node.children.map((child) => {
// // // // // // // // // //           console.log(child)
// // // // // // // // // //           return (
// // // // // // // // // //             <>
// // // // // // // // // //                  <TreeNode
// // // // // // // // // //             key={child.id}
// // // // // // // // // //             node={child}
// // // // // // // // // //             checkedItems={checkedItems}
// // // // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // // // //           />
// // // // // // // // // //             </>
// // // // // // // // // //           )
// // // // // // // // // //         })}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };
// // // // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     getInitialData();
// // // // // // // // // //     fetchUserPermissions();
// // // // // // // // // //   }, []);
// // // // // // // // // //   const fetchUserPermissions = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.post(
// // // // // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // // // // //         { staff_id: staffId?.id }
// // // // // // // // // //       );
// // // // // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // // // // //       setCheckedItems(userPermissions);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   const getInitialData = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.get(
// // // // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // // // //       );
// // // // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // // // //         id: menu.id,
// // // // // // // // // //         menu_name: menu.menu_name,
// // // // // // // // // //         children: menu.menu_Routes
// // // // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // // // //               id: route.id,
// // // // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // // // //               children: route.subRoutes
// // // // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // // // //                     id: subRoute.id,
// // // // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // // // //                     children: [],
// // // // // // // // // //                   }))
// // // // // // // // // //                 : [],
// // // // // // // // // //             }))
// // // // // // // // // //           : [],
// // // // // // // // // //       }));
// // // // // // // // // //       setInitialData(transformedData);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   const handleClick = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const postData = {
// // // // // // // // // //         staff_id: staffId.id,
// // // // // // // // // //         staff_permissions: checkedItems,
// // // // // // // // // //       };
// // // // // // // // // //       const response = await axios.post(
// // // // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // // // //         postData
// // // // // // // // // //       );
// // // // // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.log("Error updating permissions:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <div className="wpWrapper">
// // // // // // // // // //         <div className="container-fluid">
// // // // // // // // // //           <div className="card">
// // // // // // // // // //             <div className="card-body">
// // // // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // // // //               {initialData.map((node) => (
// // // // // // // // // //                 <TreeNode
// // // // // // // // // //                   key={node.id}
// // // // // // // // // //                   node={node}
// // // // // // // // // //                   checkedItems={checkedItems}
// // // // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // // // //                 />
// // // // // // // // // //               ))}
// // // // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // // // //                 Update Role
// // // // // // // // // //               </button>
// // // // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };
// // // // // // // // // // export default UserPermission;
// // // // // // // // // import axios from "axios";
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // // //   const areAllChildrenChecked =
// // // // // // // // //     node.children.length > 0 &&
// // // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // //     if (updatedCheckedItems.has(id)) {
// // // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // // //     }
// // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // // //         {node.children.length > 0 && (
// // // // // // // // //           <span
// // // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // // //           >
// // // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // // //           </span>
// // // // // // // // //         )}
// // // // // // // // //         <input
// // // // // // // // //           type="checkbox"
// // // // // // // // //           checked={isChecked}
// // // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // // //         />
// // // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // // //       </div>
// // // // // // // // //       {expanded &&
// // // // // // // // //         node.children.map((child) => (
// // // // // // // // //           <TreeNode
// // // // // // // // //             key={child.id}
// // // // // // // // //             node={child}
// // // // // // // // //             checkedItems={checkedItems}
// // // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // // //           />
// // // // // // // // //         ))}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };
// // // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     getInitialData();
// // // // // // // // //   }, []);
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (staffId?.id) {
// // // // // // // // //       fetchUserPermissions();
// // // // // // // // //     }
// // // // // // // // //   }, [staffId]);
// // // // // // // // //   const fetchUserPermissions = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // // // //         { staff_id: staffId?.id }
// // // // // // // // //       );
// // // // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // // // //       setCheckedItems(userPermissions);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const getInitialData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.get(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // // //       );
// // // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // // //         id: menu.id,
// // // // // // // // //         menu_name: menu.menu_name,
// // // // // // // // //         children: menu.menu_Routes
// // // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // // //               id: route.id,
// // // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // // //               children: route.subRoutes
// // // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // // //                     id: subRoute.id,
// // // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // // //                     children: [],
// // // // // // // // //                   }))
// // // // // // // // //                 : [],
// // // // // // // // //             }))
// // // // // // // // //           : [],
// // // // // // // // //       }));
// // // // // // // // //       setInitialData(transformedData);
// // // // // // // // //       fetchUserPermissions(); // Ensure permissions are checked after menu loads
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const handleClick = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const postData = {
// // // // // // // // //         staff_id: staffId.id,
// // // // // // // // //         staff_permissions: checkedItems,
// // // // // // // // //       };
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // // //         postData
// // // // // // // // //       );
// // // // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log("Error updating permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <div className="wpWrapper">
// // // // // // // // //         <div className="container-fluid">
// // // // // // // // //           <div className="card">
// // // // // // // // //             <div className="card-body">
// // // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // // //               {initialData.map((node) => (
// // // // // // // // //                 <TreeNode
// // // // // // // // //                   key={node.id}
// // // // // // // // //                   node={node}
// // // // // // // // //                   checkedItems={checkedItems}
// // // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // // //                 />
// // // // // // // // //               ))}
// // // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // // //                 Update Role
// // // // // // // // //               </button>
// // // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default UserPermission;
// // // // // // // // import axios from "axios";
// // // // // // // // import React, { useEffect, useState } from "react";

// // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // //   const isChecked = checkedItems.includes(node.id);

// // // // // // // //   // Check if all children are checked
// // // // // // // //   const areAllChildrenChecked =
// // // // // // // //     node.children.length > 0 &&
// // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // // // // //     if (isChecked) {
// // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // //     } else {
// // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // //     }

// // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // //         {node.children.length > 0 && (
// // // // // // // //           <span
// // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // //           >
// // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // //           </span>
// // // // // // // //         )}
// // // // // // // //         <input
// // // // // // // //           type="checkbox"
// // // // // // // //           checked={isChecked || areAllChildrenChecked} // Ensure checkboxes remain checked
// // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // //         />
// // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // //       </div>
// // // // // // // //       {expanded &&
// // // // // // // //         node.children.map((child) => (
// // // // // // // //           <TreeNode
// // // // // // // //             key={child.id}
// // // // // // // //             node={child}
// // // // // // // //             checkedItems={checkedItems}
// // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // //           />
// // // // // // // //         ))}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     getInitialData();
// // // // // // // //     fetchUserPermissions();
// // // // // // // //   }, []);

// // // // // // // //   const fetchUserPermissions = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // // //         { staff_id: staffId?.id }
// // // // // // // //       );

// // // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // // //       setCheckedItems(userPermissions);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const getInitialData = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.get(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // //       );

// // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // //         id: menu.id,
// // // // // // // //         menu_name: menu.menu_name,
// // // // // // // //         children: menu.menu_Routes
// // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // //               id: route.id,
// // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // //               children: route.subRoutes
// // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // //                     id: subRoute.id,
// // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // //                     children: [],
// // // // // // // //                   }))
// // // // // // // //                 : [],
// // // // // // // //             }))
// // // // // // // //           : [],
// // // // // // // //       }));

// // // // // // // //       setInitialData(transformedData);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleClick = async () => {
// // // // // // // //     try {
// // // // // // // //       const postData = {
// // // // // // // //         staff_id: staffId.id,
// // // // // // // //         staff_permissions: checkedItems,
// // // // // // // //       };
// // // // // // // //       const response = await axios.post(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // //         postData
// // // // // // // //       );
// // // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log("Error updating permissions:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <div className="wpWrapper">
// // // // // // // //         <div className="container-fluid">
// // // // // // // //           <div className="card">
// // // // // // // //             <div className="card-body">
// // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // //               {initialData.map((node) => (
// // // // // // // //                 <TreeNode
// // // // // // // //                   key={node.id}
// // // // // // // //                   node={node}
// // // // // // // //                   checkedItems={checkedItems}
// // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // //                 />
// // // // // // // //               ))}
// // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // //                 Update Role
// // // // // // // //               </button>
// // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default UserPermission;
// // // // // // // import axios from "axios";
// // // // // // // import React, { useEffect, useState } from "react";

// // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // //   const isChecked = checkedItems.includes(node.id);

// // // // // // //   // Check if all children are checked
// // // // // // //   const areAllChildrenChecked =
// // // // // // //     node.children.length > 0 &&
// // // // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // // // //     if (isChecked) {
// // // // // // //       updatedCheckedItems.delete(id);
// // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // //     } else {
// // // // // // //       updatedCheckedItems.add(id);
// // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // //     }

// // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // //         {node.children.length > 0 && (
// // // // // // //           <span
// // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // //           >
// // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // //           </span>
// // // // // // //         )}
// // // // // // //         <input
// // // // // // //           type="checkbox"
// // // // // // //           checked={isChecked || areAllChildrenChecked} // Ensure checkboxes remain checked
// // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // //         />
// // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // //       </div>
// // // // // // //       {expanded &&
// // // // // // //         node.children.map((child) => (
// // // // // // //           <TreeNode
// // // // // // //             key={child.id}
// // // // // // //             node={child}
// // // // // // //             checkedItems={checkedItems}
// // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // //           />
// // // // // // //         ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     getInitialData();
// // // // // // //     fetchUserPermissions();
// // // // // // //   }, []);

// // // // // // //   const fetchUserPermissions = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.post(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // //         { staff_id: staffId?.id }
// // // // // // //       );

// // // // // // //       const userPermissions = response.data.data.map((p) => p.id);

// // // // // // //       // Ensure that if a parent is checked, its children are also checked
// // // // // // //       let updatedCheckedItems = new Set(userPermissions);
// // // // // // //       initialData.forEach((menu) => {
// // // // // // //         if (updatedCheckedItems.has(menu.id)) {
// // // // // // //           menu.children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // //         }
// // // // // // //       });

// // // // // // //       setCheckedItems([...updatedCheckedItems]);
// // // // // // //     } catch (error) {
// // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getInitialData = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.get(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // //       );

// // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // //         id: menu.id,
// // // // // // //         menu_name: menu.menu_name,
// // // // // // //         children: menu.menu_Routes
// // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // //               id: route.id,
// // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // //               children: route.subRoutes
// // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // //                     id: subRoute.id,
// // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // //                     children: [],
// // // // // // //                   }))
// // // // // // //                 : [],
// // // // // // //             }))
// // // // // // //           : [],
// // // // // // //       }));

// // // // // // //       setInitialData(transformedData);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleClick = async () => {
// // // // // // //     try {
// // // // // // //       const postData = {
// // // // // // //         staff_id: staffId.id,
// // // // // // //         staff_permissions: checkedItems,
// // // // // // //       };
// // // // // // //       const response = await axios.post(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // //         postData
// // // // // // //       );
// // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // //     } catch (error) {
// // // // // // //       console.log("Error updating permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <div className="wpWrapper">
// // // // // // //         <div className="container-fluid">
// // // // // // //           <div className="card">
// // // // // // //             <div className="card-body">
// // // // // // //               <h2>Custom Tree View</h2>
// // // // // // //               {initialData.map((node) => (
// // // // // // //                 <TreeNode
// // // // // // //                   key={node.id}
// // // // // // //                   node={node}
// // // // // // //                   checkedItems={checkedItems}
// // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // //                 />
// // // // // // //               ))}
// // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // //                 Update Role
// // // // // // //               </button>
// // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default UserPermission;
// // // // // // import axios from "axios";
// // // // // // import React, { useEffect, useState } from "react";

// // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // //   const [expanded, setExpanded] = useState(false);

// // // // // //   // Check if the node is selected
// // // // // //   const isChecked = checkedItems.includes(node.id);

// // // // // //   // Check if all children are checked
// // // // // //   const areAllChildrenChecked =
// // // // // //     node.children.length > 0 &&
// // // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // // //     if (isChecked) {
// // // // // //       updatedCheckedItems.delete(id);
// // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // //     } else {
// // // // // //       updatedCheckedItems.add(id);
// // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // //     }

// // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // //         {node.children.length > 0 && (
// // // // // //           <span
// // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // //           >
// // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // //           </span>
// // // // // //         )}
// // // // // //         <input
// // // // // //           type="checkbox"
// // // // // //           checked={isChecked || areAllChildrenChecked} // Ensure parent stays checked
// // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // //         />
// // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // //       </div>
// // // // // //       {expanded &&
// // // // // //         node.children.map((child) => (
// // // // // //           <TreeNode
// // // // // //             key={child.id}
// // // // // //             node={child}
// // // // // //             checkedItems={checkedItems}
// // // // // //             setCheckedItems={setCheckedItems}
// // // // // //           />
// // // // // //         ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const UserPermission = ({ staffId }) => {
// // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     getInitialData();
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (initialData.length > 0) {
// // // // // //       fetchUserPermissions();
// // // // // //     }
// // // // // //   }, [initialData]); // Ensure permissions are applied only after initial data is loaded

// // // // // //   const fetchUserPermissions = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // //         { staff_id: staffId?.id }
// // // // // //       );

// // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // //       let updatedCheckedItems = new Set(userPermissions);

// // // // // //       // Ensure that if a parent is checked, its children are also checked
// // // // // //       function checkParentAndChildren(data) {
// // // // // //         data.forEach((menu) => {
// // // // // //           if (updatedCheckedItems.has(menu.id)) {
// // // // // //             menu.children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // //           }
// // // // // //           menu.children.forEach((child) => checkParentAndChildren([child]));
// // // // // //         });
// // // // // //       }

// // // // // //       checkParentAndChildren(initialData);
// // // // // //       setCheckedItems([...updatedCheckedItems]);
// // // // // //     } catch (error) {
// // // // // //       console.log("Error fetching user permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const getInitialData = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get(
// // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // //       );

// // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // //         id: menu.id,
// // // // // //         menu_name: menu.menu_name,
// // // // // //         children: menu.menu_Routes
// // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // //               id: route.id,
// // // // // //               menu_name: route.name || route.menu_name,
// // // // // //               children: route.subRoutes
// // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // //                     id: subRoute.id,
// // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // //                     children: [],
// // // // // //                   }))
// // // // // //                 : [],
// // // // // //             }))
// // // // // //           : [],
// // // // // //       }));

// // // // // //       setInitialData(transformedData);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleClick = async () => {
// // // // // //     try {
// // // // // //       const postData = {
// // // // // //         staff_id: staffId.id,
// // // // // //         staff_permissions: checkedItems,
// // // // // //       };
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // //         postData
// // // // // //       );
// // // // // //       console.log("Permissions updated successfully:", response);
// // // // // //     } catch (error) {
// // // // // //       console.log("Error updating permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <div className="wpWrapper">
// // // // // //         <div className="container-fluid">
// // // // // //           <div className="card">
// // // // // //             <div className="card-body">
// // // // // //               <h2>Custom Tree View</h2>
// // // // // //               {initialData.map((node) => (
// // // // // //                 <TreeNode
// // // // // //                   key={node.id}
// // // // // //                   node={node}
// // // // // //                   checkedItems={checkedItems}
// // // // // //                   setCheckedItems={setCheckedItems}
// // // // // //                 />
// // // // // //               ))}
// // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // //                 Update Role
// // // // // //               </button>
// // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default UserPermission;
// // // // // import axios from "axios";
// // // // // import React, { useEffect, useState } from "react";
// // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // //   const [expanded, setExpanded] = useState(false);
// // // // //   const isChecked = checkedItems.includes(node.id);
// // // // //   const handleCheckboxChange = (id) => {
// // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // //     if (isChecked) {
// // // // //       updatedCheckedItems.delete(id);
// // // // //     } else {
// // // // //       updatedCheckedItems.add(id);
// // // // //     }
// // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // //   };
// // // // //   return (
// // // // //     <div style={{ marginLeft: "20px" }}>
// // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // //         {node.children.length > 0 && (
// // // // //           <span
// // // // //             onClick={() => setExpanded(!expanded)}
// // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // //           >
// // // // //             {expanded ? "🔽" : "▶️"}
// // // // //           </span>
// // // // //         )}
// // // // //         <input
// // // // //           type="checkbox"
// // // // //           checked={isChecked}
// // // // //           onChange={() => handleCheckboxChange(node.id)}
// // // // //         />
// // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // //       </div>
// // // // //       {expanded &&
// // // // //         node.children.map((child) => (
// // // // //           <TreeNode
// // // // //             key={child.id}
// // // // //             node={child}
// // // // //             checkedItems={checkedItems}
// // // // //             setCheckedItems={setCheckedItems}
// // // // //           />
// // // // //         ))}
// // // // //     </div>
// // // // //   );
// // // // // };
// // // // // const UserPermission = ({ staffId }) => {
// // // // //   const [initialData, setInitialData] = useState([]);
// // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // //   useEffect(() => {
// // // // //     getInitialData();
// // // // //   }, []);
// // // // //   useEffect(() => {
// // // // //     if (initialData.length > 0) {
// // // // //       fetchUserPermissions();
// // // // //     }
// // // // //   }, [initialData]);
// // // // //   const fetchUserPermissions = async () => {
// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // //         { staff_id: staffId?.id }
// // // // //       );
// // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // //       setCheckedItems(userPermissions); // Only set checked values from API response
// // // // //     } catch (error) {
// // // // //       console.log("Error fetching user permissions:", error);
// // // // //     }
// // // // //   };
// // // // //   const getInitialData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get(
// // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // //       );
// // // // //       console.log(response)
// // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // //         id: menu.id,
// // // // //         menu_name: menu.menu_name,
// // // // //         children: menu.menu_Routes
// // // // //           ? menu.menu_Routes.map((route) => ({
// // // // //               id: route.id,
// // // // //               menu_name: route.name || route.menu_name,
// // // // //               children: route.subRoutes
// // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // //                     id: subRoute.id,
// // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // //                     children: [],
// // // // //                   }))
// // // // //                 : [],
// // // // //             }))
// // // // //           : [],
// // // // //       }));
// // // // //       setInitialData(transformedData);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching permissions:", error);
// // // // //     }
// // // // //   };
// // // // //   const handleClick = async () => {
// // // // //     try {
// // // // //       const postData = {
// // // // //         staff_id: staffId.id,
// // // // //         staff_permissions: checkedItems,
// // // // //       };
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // //         postData
// // // // //       );
// // // // //       console.log("Permissions updated successfully:", response);
// // // // //     } catch (error) {
// // // // //       console.log("Error updating permissions:", error);
// // // // //     }
// // // // //   };
// // // // //   return (
// // // // //     <div>
// // // // //       <div className="wpWrapper">
// // // // //         <div className="container-fluid">
// // // // //           <div className="card">
// // // // //             <div className="card-body">
// // // // //               <h2>Custom Tree View</h2>
// // // // //               {initialData.map((node) => (
// // // // //                 <TreeNode
// // // // //                   key={node.id}
// // // // //                   node={node}
// // // // //                   checkedItems={checkedItems}
// // // // //                   setCheckedItems={setCheckedItems}
// // // // //                 />
// // // // //               ))}
// // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // //                 Update Role
// // // // //               </button>
// // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };
// // // // // export default UserPermission;
// // // // import axios from "axios";
// // // // import React, { useEffect, useState } from "react";

// // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // //   const [expanded, setExpanded] = useState(false);
// // // //   const isChecked = checkedItems.includes(node.id);
// // // //   const areAllChildrenChecked = node.children.length > 0 && node.children.every(child => checkedItems.includes(child.id));

// // // //   const handleCheckboxChange = (id, children = []) => {
// // // //     let updatedCheckedItems = new Set(checkedItems);

// // // //     if (isChecked) {
// // // //       updatedCheckedItems.delete(id);
// // // //       children.forEach(child => updatedCheckedItems.delete(child.id));
// // // //     } else {
// // // //       updatedCheckedItems.add(id);
// // // //       children.forEach(child => updatedCheckedItems.add(child.id));
// // // //     }

// // // //     setCheckedItems([...updatedCheckedItems]);
// // // //   };

// // // //   return (
// // // //     <div style={{ marginLeft: "20px" }}>
// // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // //         {node.children.length > 0 && (
// // // //           <span onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer", marginRight: "8px" }}>
// // // //             {expanded ? "🔽" : "▶️"}
// // // //           </span>
// // // //         )}
// // // //         <input
// // // //           type="checkbox"
// // // //           checked={isChecked || areAllChildrenChecked}
// // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // //         />
// // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // //       </div>
// // // //       {expanded &&
// // // //         node.children.map((child) => (
// // // //           <TreeNode
// // // //             key={child.id}
// // // //             node={child}
// // // //             checkedItems={checkedItems}
// // // //             setCheckedItems={setCheckedItems}
// // // //           />
// // // //         ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // const UserPermission = ({ staffId }) => {
// // // //   const [initialData, setInitialData] = useState([]);
// // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // //   useEffect(() => {
// // // //     getInitialData();
// // // //     fetchUserPermissions();
// // // //   }, []);

// // // //   const fetchUserPermissions = async () => {
// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // //         { staff_id: staffId?.id }
// // // //       );
// // // //       const userPermissions = response.data.data.map(p => p.id);
// // // //       setCheckedItems(userPermissions);
// // // //     } catch (error) {
// // // //       console.log("Error fetching user permissions:", error);
// // // //     }
// // // //   };

// // // //   const getInitialData = async () => {
// // // //     try {
// // // //       const response = await axios.get(
// // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // //       );
// // // //       const transformedData = response.data.data.map((menu) => ({
// // // //         id: menu.id,
// // // //         menu_name: menu.menu_name,
// // // //         children: menu.menu_Routes?.map((route) => ({
// // // //           id: route.id,
// // // //           menu_name: route.name || route.menu_name,
// // // //           children: route.subRoutes?.map((subRoute) => ({
// // // //             id: subRoute.id,
// // // //             menu_name: subRoute.name || subRoute.menu_name,
// // // //             children: [],
// // // //           })) || [],
// // // //         })) || [],
// // // //       }));
// // // //       setInitialData(transformedData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching permissions:", error);
// // // //     }
// // // //   };

// // // //   const handleClick = async () => {
// // // //     try {
// // // //       const postData = {
// // // //         staff_id: staffId.id,
// // // //         staff_permissions: checkedItems,
// // // //       };
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // //         postData
// // // //       );
// // // //       console.log("Permissions updated successfully:", response);
// // // //     } catch (error) {
// // // //       console.log("Error updating permissions:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <div className="wpWrapper">
// // // //         <div className="container-fluid">
// // // //           <div className="card">
// // // //             <div className="card-body">
// // // //               <h2>Custom Tree View</h2>
// // // //               {initialData.map((node) => (
// // // //                 <TreeNode
// // // //                   key={node.id}
// // // //                   node={node}
// // // //                   checkedItems={checkedItems}
// // // //                   setCheckedItems={setCheckedItems}
// // // //                 />
// // // //               ))}
// // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // //                 Update Role
// // // //               </button>
// // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UserPermission;
// // // import axios from "axios";
// // // import React, { useEffect, useState } from "react";

// // // const TreeNode = ({ node, checkedItems, setCheckedItems, selectedItems }) => {
// // //   const [expanded, setExpanded] = useState(false);
// // //   const isChecked = checkedItems.includes(node.id);
// // //   const isSelected = selectedItems.includes(node.id);

// // //   const handleCheckboxChange = (id, children = []) => {
// // //     let updatedCheckedItems = new Set(checkedItems);
// // //     if (updatedCheckedItems.has(id)) {
// // //       updatedCheckedItems.delete(id);
// // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // //     } else {
// // //       updatedCheckedItems.add(id);
// // //       children.forEach((child) => {
// // //         if (selectedItems.includes(child.id)) {
// // //           updatedCheckedItems.add(child.id);
// // //         }
// // //       });
// // //     }
// // //     setCheckedItems([...updatedCheckedItems]);
// // //   };

// // //   return (
// // //     <div style={{ marginLeft: "20px" }}>
// // //       <div style={{ display: "flex", alignItems: "center" }}>
// // //         {node.children.length > 0 && (
// // //           <span
// // //             onClick={() => setExpanded(!expanded)}
// // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // //           >
// // //             {expanded ? "🔽" : "▶️"}
// // //           </span>
// // //         )}
// // //         <input
// // //           type="checkbox"
// // //           checked={isChecked}
// // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // //         />
// // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // //       </div>
// // //       {expanded &&
// // //         node.children.map((child) => (
// // //           <TreeNode
// // //             key={child.id}
// // //             node={child}
// // //             checkedItems={checkedItems}
// // //             setCheckedItems={setCheckedItems}
// // //             selectedItems={selectedItems}
// // //           />
// // //         ))}
// // //     </div>
// // //   );
// // // };

// // // const UserPermission = ({ staffId }) => {
// // //   const [allPermissions, setAllPermissions] = useState([]);
// // //   const [checkedItems, setCheckedItems] = useState([]);
// // //   const [selectedItems, setSelectedItems] = useState([]);

// // //   useEffect(() => {
// // //     getInitialData();
// // //     fetchUserPermissions();
// // //   }, []);

// // //   const fetchUserPermissions = async () => {
// // //     try {
// // //       const response = await axios.post(
// // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // //         { staff_id: staffId?.id }
// // //       );
// // //       const userPermissions = response.data.data.map((p) => p.id);
// // //       setCheckedItems(userPermissions);
// // //       setSelectedItems(userPermissions);
// // //     } catch (error) {
// // //       console.log("Error fetching user permissions:", error);
// // //     }
// // //   };

// // //   const getInitialData = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // //       );
// // //       const transformedData = response.data.data.map((menu) => ({
// // //         id: menu.id,
// // //         menu_name: menu.menu_name,
// // //         children: menu.menu_Routes
// // //           ? menu.menu_Routes.map((route) => ({
// // //               id: route.id,
// // //               menu_name: route.name || route.menu_name,
// // //               children: route.subRoutes
// // //                 ? route.subRoutes.map((subRoute) => ({
// // //                     id: subRoute.id,
// // //                     menu_name: subRoute.name || subRoute.menu_name,
// // //                     children: [],
// // //                   }))
// // //                 : [],
// // //             }))
// // //           : [],
// // //       }));
// // //       setAllPermissions(transformedData);
// // //     } catch (error) {
// // //       console.error("Error fetching permissions:", error);
// // //     }
// // //   };

// // //   const handleClick = async () => {
// // //     try {
// // //       const postData = {
// // //         staff_id: staffId.id,
// // //         staff_permissions: checkedItems,
// // //       };
// // //       await axios.post(
// // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // //         postData
// // //       );
// // //       console.log("Permissions updated successfully");
// // //     } catch (error) {
// // //       console.log("Error updating permissions:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="wpWrapper">
// // //         <div className="container-fluid">
// // //           <div className="card">
// // //             <div className="card-body">
// // //               <h2>Custom Tree View</h2>
// // //               {allPermissions.map((node) => (
// // //                 <TreeNode
// // //                   key={node.id}
// // //                   node={node}
// // //                   checkedItems={checkedItems}
// // //                   setCheckedItems={setCheckedItems}
// // //                   selectedItems={selectedItems}
// // //                 />
// // //               ))}
// // //               <button onClick={handleClick} className="btn btn-secondary">
// // //                 Update Role
// // //               </button>
// // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // export default UserPermission;
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// //   const [expanded, setExpanded] = useState(false);
// //   const isChecked = checkedItems.includes(node.id);

// //   const handleCheckboxChange = (id, children = []) => {
// //     let updatedCheckedItems = new Set(checkedItems);

// //     if (isChecked) {
// //       // Unchecking parent -> remove itself and all children
// //       updatedCheckedItems.delete(id);
// //       children.forEach((child) => {
// //         updatedCheckedItems.delete(child.id);
// //         child.children?.forEach((subChild) => updatedCheckedItems.delete(subChild.id));
// //       });
// //     } else {
// //       // Checking parent -> add itself and all children
// //       updatedCheckedItems.add(id);
// //       children.forEach((child) => {
// //         updatedCheckedItems.add(child.id);
// //         child.children?.forEach((subChild) => updatedCheckedItems.add(subChild.id));
// //       });
// //     }

// //     setCheckedItems([...updatedCheckedItems]);
// //   };

// //   return (
// //     <div style={{ marginLeft: "20px" }}>
// //       <div style={{ display: "flex", alignItems: "center" }}>
// //         {node.children.length > 0 && (
// //           <span
// //             onClick={() => setExpanded(!expanded)}
// //             style={{ cursor: "pointer", marginRight: "8px" }}
// //           >
// //             {expanded ? "🔽" : "▶️"}
// //           </span>
// //         )}
// //         <input
// //           type="checkbox"
// //           checked={isChecked}
// //           onChange={() => handleCheckboxChange(node.id, node.children)}
// //         />
// //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// //       </div>
// //       {expanded &&
// //         node.children.map((child) => (
// //           <TreeNode
// //             key={child.id}
// //             node={child}
// //             checkedItems={checkedItems}
// //             setCheckedItems={setCheckedItems}
// //           />
// //         ))}
// //     </div>
// //   );
// // };

// // const UserPermission = ({ staffId }) => {
// //   const [initialData, setInitialData] = useState([]);
// //   const [checkedItems, setCheckedItems] = useState([]);

// //   useEffect(() => {
// //     getInitialData();
// //     fetchUserPermissions();
// //   }, []);

// //   const fetchUserPermissions = async () => {
// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// //         { staff_id: staffId?.id }
// //       );
// //       const userPermissions = response.data.data.map((p) => p.id);
// //       setCheckedItems(userPermissions);
// //     } catch (error) {
// //       console.log("Error fetching user permissions:", error);
// //     }
// //   };

// //   const getInitialData = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}GetAllPermissions`);
// //       const transformedData = response.data.data.map((menu) => ({
// //         id: menu.id,
// //         menu_name: menu.menu_name,
// //         children: menu.menu_Routes
// //           ? menu.menu_Routes.map((route) => ({
// //               id: route.id,
// //               menu_name: route.name || route.menu_name,
// //               children: route.subRoutes
// //                 ? route.subRoutes.map((subRoute) => ({
// //                     id: subRoute.id,
// //                     menu_name: subRoute.name || subRoute.menu_name,
// //                     children: [],
// //                   }))
// //                 : [],
// //             }))
// //           : [],
// //       }));
// //       setInitialData(transformedData);
// //     } catch (error) {
// //       console.error("Error fetching permissions:", error);
// //     }
// //   };

// //   const handleClick = async () => {
// //     try {
// //       const postData = {
// //         staff_id: staffId.id,
// //         staff_permissions: checkedItems,
// //       };
// //       await axios.post(`${process.env.REACT_APP_BASE_URL}updateStaffPermission`, postData);
// //       console.log("Permissions updated successfully");
// //     } catch (error) {
// //       console.log("Error updating permissions:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="wpWrapper">
// //         <div className="container-fluid">
// //           <div className="card">
// //             <div className="card-body">
// //               <h2>Custom Tree View</h2>
// //               {initialData.map((node) => (
// //                 <TreeNode
// //                   key={node.id}
// //                   node={node}
// //                   checkedItems={checkedItems}
// //                   setCheckedItems={setCheckedItems}
// //                 />
// //               ))}
// //               <button onClick={handleClick} className="btn btn-secondary">
// //                 Update Role
// //               </button>
// //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserPermission;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const TreeNode = ({ node, handleCheck }) => {
// //   const [isExpanded, setIsExpanded] = useState(false);

// //   // Toggle node expansion
// //   const toggleExpand = () => setIsExpanded(!isExpanded);

// //   return (
// //     <div className="ml-4">
// //       <div className="flex items-center gap-2 p-2">
// //         {node.children.length > 0 && (
// //           <span className="cursor-pointer" onClick={toggleExpand}>
// //             {isExpanded ? "▼" : "▶"}
// //           </span>
// //         )}
// //         <input
// //           type="checkbox"
// //           checked={node.isChecked}
// //           onChange={() => handleCheck(node.id, !node.isChecked)}
// //         />
// //         <span>{node.menu_name || node.name}</span>
// //       </div>

// //       {/* Render children when expanded */}
// //       {isExpanded && (
// //         <div className="ml-4 border-l-2 border-gray-300 pl-2">
// //           {node.children.map((child) => (
// //             <TreeNode key={child.id} node={child} handleCheck={handleCheck} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const UserPermission = ({ staffId }) => {
// //   const [treeData, setTreeData] = useState([]);

// //   useEffect(() => {
// //     const getTreeData = async () => {
// //       try {
// //         const response = await axios.post(
// //           `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// //           { staff_id: staffId?.id }
// //         );

// //         // Transform API response to match tree structure with check state
// //         const transformedData = response.data.data.map((menu) => ({
// //           id: menu.id,
// //           menu_name: menu.menu_name,
// //           isChecked: menu.is_checked === 1, // Set checked based on API
// //           children: menu.menu_Routes
// //             ? menu.menu_Routes.map((route) => ({
// //                 id: route.id,
// //                 name: route.name || route.route_url,
// //                 isChecked: route.is_checked === 1, // Set checked based on API
// //                 children: [],
// //               }))
// //             : [],
// //         }));

// //         setTreeData(transformedData);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     if (staffId) {
// //       getTreeData();
// //     }
// //   }, [staffId]);

// //   // Handle checkbox selection & update API
// //   const handleCheck = async (id, newCheckedState) => {
// //     const updateCheckedState = (nodes) =>
// //       nodes.map((node) => {
// //         if (node.id === id) {
// //           return {
// //             ...node,
// //             isChecked: newCheckedState,
// //             children: node.children.map((child) => ({
// //               ...child,
// //               isChecked: newCheckedState, // Check/uncheck children
// //             })),
// //           };
// //         } else {
// //           return {
// //             ...node,
// //             children: updateCheckedState(node.children),
// //           };
// //         }
// //       });

// //     setTreeData(updateCheckedState(treeData));

// //     // Call API to update permission status
// //     try {
// //       await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// //         {
// //           staff_id: staffId?.id,
// //           staff_permissions: id,
// //           // is_checked: newCheckedState ? 1 : 0, 
// //         }
// //       );
// //     } catch (error) {
// //       console.error("Error updating permission:", error);
// //     }
// //   };

// //   return (
// //     <div className="wpWrapper">
// //       <div className="container-fluid">
// //         <div className="card">
// //           <div className="card-body">
// //             <div className="p-4">
// //               <h2 className="text-xl font-bold mb-2">Staff Permissions</h2>
// //               <div className="bg-white shadow-md rounded p-4">
// //                 <>
// //                 {treeData.map((node) => (
// //                   <TreeNode
// //                   key={node.id}
// //                   node={node}
// //                   handleCheck={handleCheck}
// //                   />
// //                 ))}
// //                  {/* <button onClick={handleClick} className="btn btn-secondary">
// //                  Update Role
// //                </button> */}
// //                 </>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserPermission;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TreeNode = ({ node, handleCheck }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="ml-4">
//       <div className="flex items-center gap-2 p-2">
//         {node.children.length > 0 && (
//           <span className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? "▼" : "▶"}
//           </span>
//         )}
//         <input
//           type="checkbox"
//           checked={node.isChecked}
//           onChange={() => handleCheck(node)}
//         />
//         <span>{node.menu_name || node.name}</span>
//       </div>

//       {isExpanded && (
//         <div className="ml-4 border-l-2 border-gray-300 pl-2">
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} handleCheck={handleCheck} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const UserPermission = ({ staffId }) => {
//   const [treeData, setTreeData] = useState([]);
//   const [staffPermissions, setStaffPermissions] = useState([]); // Store checked permissions

//   useEffect(() => {
//     const getTreeData = async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
//           { staff_id: staffId?.id }
//         );

//         const transformedData = response.data.data.map((menu) => ({
//           id: menu.id,
//           menu_name: menu.menu_name,
//           isChecked: menu.is_checked === 1,
//           children: menu.menu_Routes
//             ? menu.menu_Routes.map((route) => ({
//                 id: route.id,
//                 name: route.name || route.route_url,
//                 isChecked: route.is_checked === 1,
//                 children: [],
//               }))
//             : [],
//         }));

//         setTreeData(transformedData);

//         // Collect all checked permission IDs initially
//         const checkedIds = transformedData.flatMap((menu) => {
//           const menuPermissions = menu.isChecked ? [menu.id] : [];
//           const routePermissions = menu.children
//             .filter((route) => route.isChecked)
//             .map((route) => route.id);
//           return [...menuPermissions, ...routePermissions];
//         });

//         setStaffPermissions(checkedIds);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (staffId) {
//       getTreeData();
//     }
//   }, [staffId]);

//   // Handle checkbox selection & update staffPermissions array
//   const handleCheck = (node) => {
//     const isChecked = !node.isChecked;

//     // Update checked state in tree
//     const updateCheckedState = (nodes) =>
//       nodes.map((n) => ({
//         ...n,
//         isChecked: n.id === node.id ? isChecked : n.isChecked,
//         children: updateCheckedState(n.children),
//       }));

//     setTreeData(updateCheckedState(treeData));

//     // Update permissions array
//     setStaffPermissions((prevPermissions) =>
//       isChecked
//         ? [...prevPermissions, node.id] // Add if checked
//         : prevPermissions.filter((id) => id !== node.id) // Remove if unchecked
//     );
//   };

//   // Send updated permissions to API
//   const handleUpdate = async () => {
//     try {
//       await axios.post(`${process.env.REACT_APP_BASE_URL}updateStaffPermission`, {
//         staff_id: staffId?.id,
//         staff_permissions: staffPermissions, // Send full updated array
//       });
//       alert("Permissions updated successfully!");
//     } catch (error) {
//       console.error("Error updating permissions:", error);
//     }
//   };

//   return (
//     <div className="wpWrapper">
//       <div className="container-fluid">
//         <div className="card">
//           <div className="card-body">
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">Staff Permissions</h2>
//               <div className="bg-white shadow-md rounded p-4">
//                 {treeData.map((node) => (
//                   <TreeNode key={node.id} node={node} handleCheck={handleCheck} />
//                 ))}
//               </div>
//               <button onClick={handleUpdate} className="btn btn-secondary mt-3">
//                 Update Role
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPermission;



// new pratima code


// // // // // // // // // import axios from "axios";
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // // //   const areAllChildrenChecked =
// // // // // // // // //     node.children.length > 0 &&
// // // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // //     if (isChecked) {
// // // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // // //     }
// // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // // };
// // // // // // // // //   const handleChildChange = (childId) => {
// // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // //     if (updatedCheckedItems.has(childId)) {
// // // // // // // // //       updatedCheckedItems.delete(childId);
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.add(childId);
// // // // // // // // //     }
// // // // // // // // //     if (
// // // // // // // // //       node.children.length > 0 &&
// // // // // // // // //       node.children.every((child) => updatedCheckedItems.has(child.id))
// // // // // // // // //     ) {
// // // // // // // // //       updatedCheckedItems.add(node.id);
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.delete(node.id);
// // // // // // // // //     }
// // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // // //         {node.children.length > 0 && (
// // // // // // // // //           <span
// // // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // // //           >
// // // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // // //           </span>
// // // // // // // // //         )}
// // // // // // // // //         <input
// // // // // // // // //           type="checkbox"
// // // // // // // // //           checked={isChecked}
// // // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // // //         />
// // // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // // //       </div>
// // // // // // // // //       {expanded &&
// // // // // // // // //         node.children.map((child) => (
// // // // // // // // //           <TreeNode
// // // // // // // // //             key={child.id}
// // // // // // // // //             node={child}
// // // // // // // // //             checkedItems={checkedItems}
// // // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // // //           />
// // // // // // // // //         ))}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };
// // // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     getInitialData();
// // // // // // // // //     afterlogin();
// // // // // // // // //   }, []);
// // // // // // // // //   const afterlogin =async ()=>{
// // // // // // // // //     try {
// // // // // // // // //    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,{staff_id:staffId?.id})
// // // // // // // // //    setInitialData(response.data.data)
// // // // // // // // //   } catch (error) {
// // // // // // // // //       console.log(error)
// // // // // // // // //     }
// // // // // // // // //   }
// // // // // // // // //   const getInitialData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.get(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // // //       );
// // // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // // //         id: menu.id,
// // // // // // // // //         menu_name: menu.menu_name,
// // // // // // // // //         children: menu.menu_Routes
// // // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // // //               id: route.id,
// // // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // // //               children: route.subRoutes
// // // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // // //                     id: subRoute.id,
// // // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // // //                     children: [],
// // // // // // // // //                   }))
// // // // // // // // //                 : [],
// // // // // // // // //             }))
// // // // // // // // //           : [],
// // // // // // // // //       }));
// // // // // // // // //       setInitialData(transformedData);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error(error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const handleClick = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const postData = {
// // // // // // // // //         staff_id: staffId,
// // // // // // // // //         staff_permissions:checkedItems,
// // // // // // // // //       };
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // // //         postData
// // // // // // // // //       );
// // // // // // // // //       console.log(response);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log(error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <div className="wpWrapper">
// // // // // // // // //         <div className="container-fluid">
// // // // // // // // //           <div className="card">
// // // // // // // // //             <div className="card-body">
// // // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // // //               {initialData.map((node) => (
// // // // // // // // //                 <TreeNode
// // // // // // // // //                   key={node.id}
// // // // // // // // //                   node={node}
// // // // // // // // //                   checkedItems={checkedItems}
// // // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // // //                 />
// // // // // // // // //               ))}
// // // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // // //                 Update Role
// // // // // // // // //               </button>
// // // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };
// // // // // // // // // export default UserPermission;
// // // // // // // // // import axios from "axios";
// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // // //   const areAllChildrenChecked =
// // // // // // // // //     node.children.length > 0 &&
// // // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // //     if (isChecked) {
// // // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // // //     }
// // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // //   };
// // // // // // // // //   const handleChildChange = (childId) => {
// // // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // // //     if (updatedCheckedItems.has(childId)) {
// // // // // // // // //       updatedCheckedItems.delete(childId);
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.add(childId);
// // // // // // // // //     }
// // // // // // // // //     if (
// // // // // // // // //       node.children.length > 0 &&
// // // // // // // // //       node.children.every((child) => updatedCheckedItems.has(child.id))
// // // // // // // // //     ) {
// // // // // // // // //       updatedCheckedItems.add(node.id);
// // // // // // // // //     } else {
// // // // // // // // //       updatedCheckedItems.delete(node.id);
// // // // // // // // //     }
// // // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // // //         {node.children.length > 0 && (
// // // // // // // // //           <span
// // // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // // //           >
// // // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // // //           </span>
// // // // // // // // //         )}
// // // // // // // // //         <input
// // // // // // // // //           type="checkbox"
// // // // // // // // //           checked={isChecked}
// // // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // // //         />
// // // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // // //       </div>
// // // // // // // // //       {expanded &&
// // // // // // // // //         node.children.map((child) => {
// // // // // // // // //           console.log(child)
// // // // // // // // //           return (
// // // // // // // // //             <>
// // // // // // // // //                  <TreeNode
// // // // // // // // //             key={child.id}
// // // // // // // // //             node={child}
// // // // // // // // //             checkedItems={checkedItems}
// // // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // // //           />
// // // // // // // // //             </>
// // // // // // // // //           )
// // // // // // // // //         })}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };
// // // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     getInitialData();
// // // // // // // // //     fetchUserPermissions();
// // // // // // // // //   }, []);
// // // // // // // // //   const fetchUserPermissions = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // // // //         { staff_id: staffId?.id }
// // // // // // // // //       );
// // // // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // // // //       setCheckedItems(userPermissions);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const getInitialData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.get(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // // //       );
// // // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // // //         id: menu.id,
// // // // // // // // //         menu_name: menu.menu_name,
// // // // // // // // //         children: menu.menu_Routes
// // // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // // //               id: route.id,
// // // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // // //               children: route.subRoutes
// // // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // // //                     id: subRoute.id,
// // // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // // //                     children: [],
// // // // // // // // //                   }))
// // // // // // // // //                 : [],
// // // // // // // // //             }))
// // // // // // // // //           : [],
// // // // // // // // //       }));
// // // // // // // // //       setInitialData(transformedData);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   const handleClick = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const postData = {
// // // // // // // // //         staff_id: staffId.id,
// // // // // // // // //         staff_permissions: checkedItems,
// // // // // // // // //       };
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // // //         postData
// // // // // // // // //       );
// // // // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.log("Error updating permissions:", error);
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <div className="wpWrapper">
// // // // // // // // //         <div className="container-fluid">
// // // // // // // // //           <div className="card">
// // // // // // // // //             <div className="card-body">
// // // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // // //               {initialData.map((node) => (
// // // // // // // // //                 <TreeNode
// // // // // // // // //                   key={node.id}
// // // // // // // // //                   node={node}
// // // // // // // // //                   checkedItems={checkedItems}
// // // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // // //                 />
// // // // // // // // //               ))}
// // // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // // //                 Update Role
// // // // // // // // //               </button>
// // // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };
// // // // // // // // // export default UserPermission;
// // // // // // // // import axios from "axios";
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // // //   const isChecked = checkedItems.includes(node.id);
// // // // // // // //   const areAllChildrenChecked =
// // // // // // // //     node.children.length > 0 &&
// // // // // // // //     node.children.every((child) => checkedItems.includes(child.id));
// // // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // // //     let updatedCheckedItems = new Set(checkedItems);
// // // // // // // //     if (updatedCheckedItems.has(id)) {
// // // // // // // //       updatedCheckedItems.delete(id);
// // // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // // //     } else {
// // // // // // // //       updatedCheckedItems.add(id);
// // // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // // //     }
// // // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // // //   };
// // // // // // // //   return (
// // // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // // //         {node.children.length > 0 && (
// // // // // // // //           <span
// // // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // // //           >
// // // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // // //           </span>
// // // // // // // //         )}
// // // // // // // //         <input
// // // // // // // //           type="checkbox"
// // // // // // // //           checked={isChecked}
// // // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // // //         />
// // // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // // //       </div>
// // // // // // // //       {expanded &&
// // // // // // // //         node.children.map((child) => (
// // // // // // // //           <TreeNode
// // // // // // // //             key={child.id}
// // // // // // // //             node={child}
// // // // // // // //             checkedItems={checkedItems}
// // // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // // //           />
// // // // // // // //         ))}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };
// // // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // // // // // //   useEffect(() => {
// // // // // // // //     getInitialData();
// // // // // // // //   }, []);
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (staffId?.id) {
// // // // // // // //       fetchUserPermissions();
// // // // // // // //     }
// // // // // // // //   }, [staffId]);
// // // // // // // //   const fetchUserPermissions = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // // //         { staff_id: staffId?.id }
// // // // // // // //       );
// // // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // // //       setCheckedItems(userPermissions);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // //   const getInitialData = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await axios.get(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // // //       );
// // // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // // //         id: menu.id,
// // // // // // // //         menu_name: menu.menu_name,
// // // // // // // //         children: menu.menu_Routes
// // // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // // //               id: route.id,
// // // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // // //               children: route.subRoutes
// // // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // // //                     id: subRoute.id,
// // // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // // //                     children: [],
// // // // // // // //                   }))
// // // // // // // //                 : [],
// // // // // // // //             }))
// // // // // // // //           : [],
// // // // // // // //       }));
// // // // // // // //       setInitialData(transformedData);
// // // // // // // //       fetchUserPermissions(); // Ensure permissions are checked after menu loads
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // //   const handleClick = async () => {
// // // // // // // //     try {
// // // // // // // //       const postData = {
// // // // // // // //         staff_id: staffId.id,
// // // // // // // //         staff_permissions: checkedItems,
// // // // // // // //       };
// // // // // // // //       const response = await axios.post(
// // // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // // //         postData
// // // // // // // //       );
// // // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log("Error updating permissions:", error);
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <div className="wpWrapper">
// // // // // // // //         <div className="container-fluid">
// // // // // // // //           <div className="card">
// // // // // // // //             <div className="card-body">
// // // // // // // //               <h2>Custom Tree View</h2>
// // // // // // // //               {initialData.map((node) => (
// // // // // // // //                 <TreeNode
// // // // // // // //                   key={node.id}
// // // // // // // //                   node={node}
// // // // // // // //                   checkedItems={checkedItems}
// // // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // // //                 />
// // // // // // // //               ))}
// // // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // // //                 Update Role
// // // // // // // //               </button>
// // // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default UserPermission;
// // // // // // // import axios from "axios";
// // // // // // // import React, { useEffect, useState } from "react";

// // // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // // //   const isChecked = checkedItems.includes(node.id);

// // // // // // //   // Check if all children are checked
// // // // // // //   const areAllChildrenChecked =
// // // // // // //     node.children.length > 0 &&
// // // // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // // // //     if (isChecked) {
// // // // // // //       updatedCheckedItems.delete(id);
// // // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // // //     } else {
// // // // // // //       updatedCheckedItems.add(id);
// // // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // // //     }

// // // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // // //         {node.children.length > 0 && (
// // // // // // //           <span
// // // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // // //           >
// // // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // // //           </span>
// // // // // // //         )}
// // // // // // //         <input
// // // // // // //           type="checkbox"
// // // // // // //           checked={isChecked || areAllChildrenChecked} // Ensure checkboxes remain checked
// // // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // // //         />
// // // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // // //       </div>
// // // // // // //       {expanded &&
// // // // // // //         node.children.map((child) => (
// // // // // // //           <TreeNode
// // // // // // //             key={child.id}
// // // // // // //             node={child}
// // // // // // //             checkedItems={checkedItems}
// // // // // // //             setCheckedItems={setCheckedItems}
// // // // // // //           />
// // // // // // //         ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const UserPermission = ({ staffId }) => {
// // // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     getInitialData();
// // // // // // //     fetchUserPermissions();
// // // // // // //   }, []);

// // // // // // //   const fetchUserPermissions = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.post(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // // //         { staff_id: staffId?.id }
// // // // // // //       );

// // // // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // // // //       setCheckedItems(userPermissions);
// // // // // // //     } catch (error) {
// // // // // // //       console.log("Error fetching user permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getInitialData = async () => {
// // // // // // //     try {
// // // // // // //       const response = await axios.get(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // // //       );

// // // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // // //         id: menu.id,
// // // // // // //         menu_name: menu.menu_name,
// // // // // // //         children: menu.menu_Routes
// // // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // // //               id: route.id,
// // // // // // //               menu_name: route.name || route.menu_name,
// // // // // // //               children: route.subRoutes
// // // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // // //                     id: subRoute.id,
// // // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // // //                     children: [],
// // // // // // //                   }))
// // // // // // //                 : [],
// // // // // // //             }))
// // // // // // //           : [],
// // // // // // //       }));

// // // // // // //       setInitialData(transformedData);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error fetching permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleClick = async () => {
// // // // // // //     try {
// // // // // // //       const postData = {
// // // // // // //         staff_id: staffId.id,
// // // // // // //         staff_permissions: checkedItems,
// // // // // // //       };
// // // // // // //       const response = await axios.post(
// // // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // // //         postData
// // // // // // //       );
// // // // // // //       console.log("Permissions updated successfully:", response);
// // // // // // //     } catch (error) {
// // // // // // //       console.log("Error updating permissions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div>
// // // // // // //       <div className="wpWrapper">
// // // // // // //         <div className="container-fluid">
// // // // // // //           <div className="card">
// // // // // // //             <div className="card-body">
// // // // // // //               <h2>Custom Tree View</h2>
// // // // // // //               {initialData.map((node) => (
// // // // // // //                 <TreeNode
// // // // // // //                   key={node.id}
// // // // // // //                   node={node}
// // // // // // //                   checkedItems={checkedItems}
// // // // // // //                   setCheckedItems={setCheckedItems}
// // // // // // //                 />
// // // // // // //               ))}
// // // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // // //                 Update Role
// // // // // // //               </button>
// // // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default UserPermission;
// // // // // // import axios from "axios";
// // // // // // import React, { useEffect, useState } from "react";

// // // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // // //   const [expanded, setExpanded] = useState(false);
// // // // // //   const isChecked = checkedItems.includes(node.id);

// // // // // //   // Check if all children are checked
// // // // // //   const areAllChildrenChecked =
// // // // // //     node.children.length > 0 &&
// // // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // // //     if (isChecked) {
// // // // // //       updatedCheckedItems.delete(id);
// // // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // // //     } else {
// // // // // //       updatedCheckedItems.add(id);
// // // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // //     }

// // // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ marginLeft: "20px" }}>
// // // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // // //         {node.children.length > 0 && (
// // // // // //           <span
// // // // // //             onClick={() => setExpanded(!expanded)}
// // // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // // //           >
// // // // // //             {expanded ? "🔽" : "▶️"}
// // // // // //           </span>
// // // // // //         )}
// // // // // //         <input
// // // // // //           type="checkbox"
// // // // // //           checked={isChecked || areAllChildrenChecked} // Ensure checkboxes remain checked
// // // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // // //         />
// // // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // // //       </div>
// // // // // //       {expanded &&
// // // // // //         node.children.map((child) => (
// // // // // //           <TreeNode
// // // // // //             key={child.id}
// // // // // //             node={child}
// // // // // //             checkedItems={checkedItems}
// // // // // //             setCheckedItems={setCheckedItems}
// // // // // //           />
// // // // // //         ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const UserPermission = ({ staffId }) => {
// // // // // //   const [initialData, setInitialData] = useState([]);
// // // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     getInitialData();
// // // // // //     fetchUserPermissions();
// // // // // //   }, []);

// // // // // //   const fetchUserPermissions = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // // //         { staff_id: staffId?.id }
// // // // // //       );

// // // // // //       const userPermissions = response.data.data.map((p) => p.id);

// // // // // //       // Ensure that if a parent is checked, its children are also checked
// // // // // //       let updatedCheckedItems = new Set(userPermissions);
// // // // // //       initialData.forEach((menu) => {
// // // // // //         if (updatedCheckedItems.has(menu.id)) {
// // // // // //           menu.children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // // //         }
// // // // // //       });

// // // // // //       setCheckedItems([...updatedCheckedItems]);
// // // // // //     } catch (error) {
// // // // // //       console.log("Error fetching user permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const getInitialData = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get(
// // // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // // //       );

// // // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // // //         id: menu.id,
// // // // // //         menu_name: menu.menu_name,
// // // // // //         children: menu.menu_Routes
// // // // // //           ? menu.menu_Routes.map((route) => ({
// // // // // //               id: route.id,
// // // // // //               menu_name: route.name || route.menu_name,
// // // // // //               children: route.subRoutes
// // // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // // //                     id: subRoute.id,
// // // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // // //                     children: [],
// // // // // //                   }))
// // // // // //                 : [],
// // // // // //             }))
// // // // // //           : [],
// // // // // //       }));

// // // // // //       setInitialData(transformedData);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleClick = async () => {
// // // // // //     try {
// // // // // //       const postData = {
// // // // // //         staff_id: staffId.id,
// // // // // //         staff_permissions: checkedItems,
// // // // // //       };
// // // // // //       const response = await axios.post(
// // // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // // //         postData
// // // // // //       );
// // // // // //       console.log("Permissions updated successfully:", response);
// // // // // //     } catch (error) {
// // // // // //       console.log("Error updating permissions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <div className="wpWrapper">
// // // // // //         <div className="container-fluid">
// // // // // //           <div className="card">
// // // // // //             <div className="card-body">
// // // // // //               <h2>Custom Tree View</h2>
// // // // // //               {initialData.map((node) => (
// // // // // //                 <TreeNode
// // // // // //                   key={node.id}
// // // // // //                   node={node}
// // // // // //                   checkedItems={checkedItems}
// // // // // //                   setCheckedItems={setCheckedItems}
// // // // // //                 />
// // // // // //               ))}
// // // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // // //                 Update Role
// // // // // //               </button>
// // // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default UserPermission;
// // // // // import axios from "axios";
// // // // // import React, { useEffect, useState } from "react";

// // // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // // //   const [expanded, setExpanded] = useState(false);

// // // // //   // Check if the node is selected
// // // // //   const isChecked = checkedItems.includes(node.id);

// // // // //   // Check if all children are checked
// // // // //   const areAllChildrenChecked =
// // // // //     node.children.length > 0 &&
// // // // //     node.children.every((child) => checkedItems.includes(child.id));

// // // // //   const handleCheckboxChange = (id, children = []) => {
// // // // //     let updatedCheckedItems = new Set(checkedItems);

// // // // //     if (isChecked) {
// // // // //       updatedCheckedItems.delete(id);
// // // // //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// // // // //     } else {
// // // // //       updatedCheckedItems.add(id);
// // // // //       children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // //     }

// // // // //     setCheckedItems([...updatedCheckedItems]);
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ marginLeft: "20px" }}>
// // // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // // //         {node.children.length > 0 && (
// // // // //           <span
// // // // //             onClick={() => setExpanded(!expanded)}
// // // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // // //           >
// // // // //             {expanded ? "🔽" : "▶️"}
// // // // //           </span>
// // // // //         )}
// // // // //         <input
// // // // //           type="checkbox"
// // // // //           checked={isChecked || areAllChildrenChecked} // Ensure parent stays checked
// // // // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // // // //         />
// // // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // // //       </div>
// // // // //       {expanded &&
// // // // //         node.children.map((child) => (
// // // // //           <TreeNode
// // // // //             key={child.id}
// // // // //             node={child}
// // // // //             checkedItems={checkedItems}
// // // // //             setCheckedItems={setCheckedItems}
// // // // //           />
// // // // //         ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const UserPermission = ({ staffId }) => {
// // // // //   const [initialData, setInitialData] = useState([]);
// // // // //   const [checkedItems, setCheckedItems] = useState([]);

// // // // //   useEffect(() => {
// // // // //     getInitialData();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (initialData.length > 0) {
// // // // //       fetchUserPermissions();
// // // // //     }
// // // // //   }, [initialData]); // Ensure permissions are applied only after initial data is loaded

// // // // //   const fetchUserPermissions = async () => {
// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // // //         { staff_id: staffId?.id }
// // // // //       );

// // // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // // //       let updatedCheckedItems = new Set(userPermissions);

// // // // //       // Ensure that if a parent is checked, its children are also checked
// // // // //       function checkParentAndChildren(data) {
// // // // //         data.forEach((menu) => {
// // // // //           if (updatedCheckedItems.has(menu.id)) {
// // // // //             menu.children.forEach((child) => updatedCheckedItems.add(child.id));
// // // // //           }
// // // // //           menu.children.forEach((child) => checkParentAndChildren([child]));
// // // // //         });
// // // // //       }

// // // // //       checkParentAndChildren(initialData);
// // // // //       setCheckedItems([...updatedCheckedItems]);
// // // // //     } catch (error) {
// // // // //       console.log("Error fetching user permissions:", error);
// // // // //     }
// // // // //   };

// // // // //   const getInitialData = async () => {
// // // // //     try {
// // // // //       const response = await axios.get(
// // // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // // //       );

// // // // //       const transformedData = response.data.data.map((menu) => ({
// // // // //         id: menu.id,
// // // // //         menu_name: menu.menu_name,
// // // // //         children: menu.menu_Routes
// // // // //           ? menu.menu_Routes.map((route) => ({
// // // // //               id: route.id,
// // // // //               menu_name: route.name || route.menu_name,
// // // // //               children: route.subRoutes
// // // // //                 ? route.subRoutes.map((subRoute) => ({
// // // // //                     id: subRoute.id,
// // // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // // //                     children: [],
// // // // //                   }))
// // // // //                 : [],
// // // // //             }))
// // // // //           : [],
// // // // //       }));

// // // // //       setInitialData(transformedData);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching permissions:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleClick = async () => {
// // // // //     try {
// // // // //       const postData = {
// // // // //         staff_id: staffId.id,
// // // // //         staff_permissions: checkedItems,
// // // // //       };
// // // // //       const response = await axios.post(
// // // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // // //         postData
// // // // //       );
// // // // //       console.log("Permissions updated successfully:", response);
// // // // //     } catch (error) {
// // // // //       console.log("Error updating permissions:", error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="wpWrapper">
// // // // //         <div className="container-fluid">
// // // // //           <div className="card">
// // // // //             <div className="card-body">
// // // // //               <h2>Custom Tree View</h2>
// // // // //               {initialData.map((node) => (
// // // // //                 <TreeNode
// // // // //                   key={node.id}
// // // // //                   node={node}
// // // // //                   checkedItems={checkedItems}
// // // // //                   setCheckedItems={setCheckedItems}
// // // // //                 />
// // // // //               ))}
// // // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // // //                 Update Role
// // // // //               </button>
// // // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UserPermission;
// // // // import axios from "axios";
// // // // import React, { useEffect, useState } from "react";
// // // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // // //   const [expanded, setExpanded] = useState(false);
// // // //   const isChecked = checkedItems.includes(node.id);
// // // //   const handleCheckboxChange = (id) => {
// // // //     let updatedCheckedItems = new Set(checkedItems);
// // // //     if (isChecked) {
// // // //       updatedCheckedItems.delete(id);
// // // //     } else {
// // // //       updatedCheckedItems.add(id);
// // // //     }
// // // //     setCheckedItems([...updatedCheckedItems]);
// // // //   };
// // // //   return (
// // // //     <div style={{ marginLeft: "20px" }}>
// // // //       <div style={{ display: "flex", alignItems: "center" }}>
// // // //         {node.children.length > 0 && (
// // // //           <span
// // // //             onClick={() => setExpanded(!expanded)}
// // // //             style={{ cursor: "pointer", marginRight: "8px" }}
// // // //           >
// // // //             {expanded ? "🔽" : "▶️"}
// // // //           </span>
// // // //         )}
// // // //         <input
// // // //           type="checkbox"
// // // //           checked={isChecked}
// // // //           onChange={() => handleCheckboxChange(node.id)}
// // // //         />
// // // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // // //       </div>
// // // //       {expanded &&
// // // //         node.children.map((child) => (
// // // //           <TreeNode
// // // //             key={child.id}
// // // //             node={child}
// // // //             checkedItems={checkedItems}
// // // //             setCheckedItems={setCheckedItems}
// // // //           />
// // // //         ))}
// // // //     </div>
// // // //   );
// // // // };
// // // // const UserPermission = ({ staffId }) => {
// // // //   const [initialData, setInitialData] = useState([]);
// // // //   const [checkedItems, setCheckedItems] = useState([]);
// // // //   useEffect(() => {
// // // //     getInitialData();
// // // //   }, []);
// // // //   useEffect(() => {
// // // //     if (initialData.length > 0) {
// // // //       fetchUserPermissions();
// // // //     }
// // // //   }, [initialData]);
// // // //   const fetchUserPermissions = async () => {
// // // //     try {
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // // //         { staff_id: staffId?.id }
// // // //       );
// // // //       const userPermissions = response.data.data.map((p) => p.id);
// // // //       setCheckedItems(userPermissions); // Only set checked values from API response
// // // //     } catch (error) {
// // // //       console.log("Error fetching user permissions:", error);
// // // //     }
// // // //   };
// // // //   const getInitialData = async () => {
// // // //     try {
// // // //       const response = await axios.get(
// // // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // // //       );
// // // //       console.log(response)
// // // //       const transformedData = response.data.data.map((menu) => ({
// // // //         id: menu.id,
// // // //         menu_name: menu.menu_name,
// // // //         children: menu.menu_Routes
// // // //           ? menu.menu_Routes.map((route) => ({
// // // //               id: route.id,
// // // //               menu_name: route.name || route.menu_name,
// // // //               children: route.subRoutes
// // // //                 ? route.subRoutes.map((subRoute) => ({
// // // //                     id: subRoute.id,
// // // //                     menu_name: subRoute.name || subRoute.menu_name,
// // // //                     children: [],
// // // //                   }))
// // // //                 : [],
// // // //             }))
// // // //           : [],
// // // //       }));
// // // //       setInitialData(transformedData);
// // // //     } catch (error) {
// // // //       console.error("Error fetching permissions:", error);
// // // //     }
// // // //   };
// // // //   const handleClick = async () => {
// // // //     try {
// // // //       const postData = {
// // // //         staff_id: staffId.id,
// // // //         staff_permissions: checkedItems,
// // // //       };
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // // //         postData
// // // //       );
// // // //       console.log("Permissions updated successfully:", response);
// // // //     } catch (error) {
// // // //       console.log("Error updating permissions:", error);
// // // //     }
// // // //   };
// // // //   return (
// // // //     <div>
// // // //       <div className="wpWrapper">
// // // //         <div className="container-fluid">
// // // //           <div className="card">
// // // //             <div className="card-body">
// // // //               <h2>Custom Tree View</h2>
// // // //               {initialData.map((node) => (
// // // //                 <TreeNode
// // // //                   key={node.id}
// // // //                   node={node}
// // // //                   checkedItems={checkedItems}
// // // //                   setCheckedItems={setCheckedItems}
// // // //                 />
// // // //               ))}
// // // //               <button onClick={handleClick} className="btn btn-secondary">
// // // //                 Update Role
// // // //               </button>
// // // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };
// // // // export default UserPermission;
// // // import axios from "axios";
// // // import React, { useEffect, useState } from "react";

// // // const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
// // //   const [expanded, setExpanded] = useState(false);
// // //   const isChecked = checkedItems.includes(node.id);
// // //   const areAllChildrenChecked = node.children.length > 0 && node.children.every(child => checkedItems.includes(child.id));

// // //   const handleCheckboxChange = (id, children = []) => {
// // //     let updatedCheckedItems = new Set(checkedItems);

// // //     if (isChecked) {
// // //       updatedCheckedItems.delete(id);
// // //       children.forEach(child => updatedCheckedItems.delete(child.id));
// // //     } else {
// // //       updatedCheckedItems.add(id);
// // //       children.forEach(child => updatedCheckedItems.add(child.id));
// // //     }

// // //     setCheckedItems([...updatedCheckedItems]);
// // //   };

// // //   return (
// // //     <div style={{ marginLeft: "20px" }}>
// // //       <div style={{ display: "flex", alignItems: "center" }}>
// // //         {node.children.length > 0 && (
// // //           <span onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer", marginRight: "8px" }}>
// // //             {expanded ? "🔽" : "▶️"}
// // //           </span>
// // //         )}
// // //         <input
// // //           type="checkbox"
// // //           checked={isChecked || areAllChildrenChecked}
// // //           onChange={() => handleCheckboxChange(node.id, node.children)}
// // //         />
// // //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// // //       </div>
// // //       {expanded &&
// // //         node.children.map((child) => (
// // //           <TreeNode
// // //             key={child.id}
// // //             node={child}
// // //             checkedItems={checkedItems}
// // //             setCheckedItems={setCheckedItems}
// // //           />
// // //         ))}
// // //     </div>
// // //   );
// // // };

// // // const UserPermission = ({ staffId }) => {
// // //   const [initialData, setInitialData] = useState([]);
// // //   const [checkedItems, setCheckedItems] = useState([]);

// // //   useEffect(() => {
// // //     getInitialData();
// // //     fetchUserPermissions();
// // //   }, []);

// // //   const fetchUserPermissions = async () => {
// // //     try {
// // //       const response = await axios.post(
// // //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// // //         { staff_id: staffId?.id }
// // //       );
// // //       const userPermissions = response.data.data.map(p => p.id);
// // //       setCheckedItems(userPermissions);
// // //     } catch (error) {
// // //       console.log("Error fetching user permissions:", error);
// // //     }
// // //   };

// // //   const getInitialData = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// // //       );
// // //       const transformedData = response.data.data.map((menu) => ({
// // //         id: menu.id,
// // //         menu_name: menu.menu_name,
// // //         children: menu.menu_Routes?.map((route) => ({
// // //           id: route.id,
// // //           menu_name: route.name || route.menu_name,
// // //           children: route.subRoutes?.map((subRoute) => ({
// // //             id: subRoute.id,
// // //             menu_name: subRoute.name || subRoute.menu_name,
// // //             children: [],
// // //           })) || [],
// // //         })) || [],
// // //       }));
// // //       setInitialData(transformedData);
// // //     } catch (error) {
// // //       console.error("Error fetching permissions:", error);
// // //     }
// // //   };

// // //   const handleClick = async () => {
// // //     try {
// // //       const postData = {
// // //         staff_id: staffId.id,
// // //         staff_permissions: checkedItems,
// // //       };
// // //       const response = await axios.post(
// // //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// // //         postData
// // //       );
// // //       console.log("Permissions updated successfully:", response);
// // //     } catch (error) {
// // //       console.log("Error updating permissions:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="wpWrapper">
// // //         <div className="container-fluid">
// // //           <div className="card">
// // //             <div className="card-body">
// // //               <h2>Custom Tree View</h2>
// // //               {initialData.map((node) => (
// // //                 <TreeNode
// // //                   key={node.id}
// // //                   node={node}
// // //                   checkedItems={checkedItems}
// // //                   setCheckedItems={setCheckedItems}
// // //                 />
// // //               ))}
// // //               <button onClick={handleClick} className="btn btn-secondary">
// // //                 Update Role
// // //               </button>
// // //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserPermission;
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const TreeNode = ({ node, checkedItems, setCheckedItems, selectedItems }) => {
// //   const [expanded, setExpanded] = useState(false);
// //   const isChecked = checkedItems.includes(node.id);
// //   const isSelected = selectedItems.includes(node.id);

// //   const handleCheckboxChange = (id, children = []) => {
// //     let updatedCheckedItems = new Set(checkedItems);
// //     if (updatedCheckedItems.has(id)) {
// //       updatedCheckedItems.delete(id);
// //       children.forEach((child) => updatedCheckedItems.delete(child.id));
// //     } else {
// //       updatedCheckedItems.add(id);
// //       children.forEach((child) => {
// //         if (selectedItems.includes(child.id)) {
// //           updatedCheckedItems.add(child.id);
// //         }
// //       });
// //     }
// //     setCheckedItems([...updatedCheckedItems]);
// //   };

// //   return (
// //     <div style={{ marginLeft: "20px" }}>
// //       <div style={{ display: "flex", alignItems: "center" }}>
// //         {node.children.length > 0 && (
// //           <span
// //             onClick={() => setExpanded(!expanded)}
// //             style={{ cursor: "pointer", marginRight: "8px" }}
// //           >
// //             {expanded ? "🔽" : "▶️"}
// //           </span>
// //         )}
// //         <input
// //           type="checkbox"
// //           checked={isChecked}
// //           onChange={() => handleCheckboxChange(node.id, node.children)}
// //         />
// //         <strong className="mx-2">{node.menu_name || node.name}</strong>
// //       </div>
// //       {expanded &&
// //         node.children.map((child) => (
// //           <TreeNode
// //             key={child.id}
// //             node={child}
// //             checkedItems={checkedItems}
// //             setCheckedItems={setCheckedItems}
// //             selectedItems={selectedItems}
// //           />
// //         ))}
// //     </div>
// //   );
// // };

// // const UserPermission = ({ staffId }) => {
// //   const [allPermissions, setAllPermissions] = useState([]);
// //   const [checkedItems, setCheckedItems] = useState([]);
// //   const [selectedItems, setSelectedItems] = useState([]);

// //   useEffect(() => {
// //     getInitialData();
// //     fetchUserPermissions();
// //   }, []);

// //   const fetchUserPermissions = async () => {
// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
// //         { staff_id: staffId?.id }
// //       );
// //       const userPermissions = response.data.data.map((p) => p.id);
// //       setCheckedItems(userPermissions);
// //       setSelectedItems(userPermissions);
// //     } catch (error) {
// //       console.log("Error fetching user permissions:", error);
// //     }
// //   };

// //   const getInitialData = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${process.env.REACT_APP_BASE_URL}GetAllPermissions`
// //       );
// //       const transformedData = response.data.data.map((menu) => ({
// //         id: menu.id,
// //         menu_name: menu.menu_name,
// //         children: menu.menu_Routes
// //           ? menu.menu_Routes.map((route) => ({
// //               id: route.id,
// //               menu_name: route.name || route.menu_name,
// //               children: route.subRoutes
// //                 ? route.subRoutes.map((subRoute) => ({
// //                     id: subRoute.id,
// //                     menu_name: subRoute.name || subRoute.menu_name,
// //                     children: [],
// //                   }))
// //                 : [],
// //             }))
// //           : [],
// //       }));
// //       setAllPermissions(transformedData);
// //     } catch (error) {
// //       console.error("Error fetching permissions:", error);
// //     }
// //   };

// //   const handleClick = async () => {
// //     try {
// //       const postData = {
// //         staff_id: staffId.id,
// //         staff_permissions: checkedItems,
// //       };
// //       await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
// //         postData
// //       );
// //       console.log("Permissions updated successfully");
// //     } catch (error) {
// //       console.log("Error updating permissions:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="wpWrapper">
// //         <div className="container-fluid">
// //           <div className="card">
// //             <div className="card-body">
// //               <h2>Custom Tree View</h2>
// //               {allPermissions.map((node) => (
// //                 <TreeNode
// //                   key={node.id}
// //                   node={node}
// //                   checkedItems={checkedItems}
// //                   setCheckedItems={setCheckedItems}
// //                   selectedItems={selectedItems}
// //                 />
// //               ))}
// //               <button onClick={handleClick} className="btn btn-secondary">
// //                 Update Role
// //               </button>
// //               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default UserPermission;
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const TreeNode = ({ node, checkedItems, setCheckedItems }) => {
//   const [expanded, setExpanded] = useState(false);
//   const isChecked = checkedItems.includes(node.id);

//   const handleCheckboxChange = (id, children = []) => {
//     let updatedCheckedItems = new Set(checkedItems);

//     if (isChecked) {
//       // Unchecking parent -> remove itself and all children
//       updatedCheckedItems.delete(id);
//       children.forEach((child) => {
//         updatedCheckedItems.delete(child.id);
//         child.children?.forEach((subChild) => updatedCheckedItems.delete(subChild.id));
//       });
//     } else {
//       // Checking parent -> add itself and all children
//       updatedCheckedItems.add(id);
//       children.forEach((child) => {
//         updatedCheckedItems.add(child.id);
//         child.children?.forEach((subChild) => updatedCheckedItems.add(subChild.id));
//       });
//     }

//     setCheckedItems([...updatedCheckedItems]);
//   };

//   return (
//     <div style={{ marginLeft: "20px" }}>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         {node.children.length > 0 && (
//           <span
//             onClick={() => setExpanded(!expanded)}
//             style={{ cursor: "pointer", marginRight: "8px" }}
//           >
//             {expanded ? "🔽" : "▶️"}
//           </span>
//         )}
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={() => handleCheckboxChange(node.id, node.children)}
//         />
//         <strong className="mx-2">{node.menu_name || node.name}</strong>
//       </div>
//       {expanded &&
//         node.children.map((child) => (
//           <TreeNode
//             key={child.id}
//             node={child}
//             checkedItems={checkedItems}
//             setCheckedItems={setCheckedItems}
//           />
//         ))}
//     </div>
//   );
// };

// const UserPermission = ({ staffId }) => {
//   const [initialData, setInitialData] = useState([]);
//   const [checkedItems, setCheckedItems] = useState([]);

//   useEffect(() => {
//     getInitialData();
//     fetchUserPermissions();
//   }, []);

//   const fetchUserPermissions = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
//         { staff_id: staffId?.id }
//       );
//       const userPermissions = response.data.data.map((p) => p.id);
//       setCheckedItems(userPermissions);
//     } catch (error) {
//       console.log("Error fetching user permissions:", error);
//     }
//   };

//   const getInitialData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}GetAllPermissions`);
//       const transformedData = response.data.data.map((menu) => ({
//         id: menu.id,
//         menu_name: menu.menu_name,
//         children: menu.menu_Routes
//           ? menu.menu_Routes.map((route) => ({
//               id: route.id,
//               menu_name: route.name || route.menu_name,
//               children: route.subRoutes
//                 ? route.subRoutes.map((subRoute) => ({
//                     id: subRoute.id,
//                     menu_name: subRoute.name || subRoute.menu_name,
//                     children: [],
//                   }))
//                 : [],
//             }))
//           : [],
//       }));
//       setInitialData(transformedData);
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//     }
//   };

//   const handleClick = async () => {
//     try {
//       const postData = {
//         staff_id: staffId.id,
//         staff_permissions: checkedItems,
//       };
//       await axios.post(`${process.env.REACT_APP_BASE_URL}updateStaffPermission`, postData);
//       console.log("Permissions updated successfully");
//     } catch (error) {
//       console.log("Error updating permissions:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div className="card">
//             <div className="card-body">
//               <h2>Custom Tree View</h2>
//               {initialData.map((node) => (
//                 <TreeNode
//                   key={node.id}
//                   node={node}
//                   checkedItems={checkedItems}
//                   setCheckedItems={setCheckedItems}
//                 />
//               ))}
//               <button onClick={handleClick} className="btn btn-secondary">
//                 Update Role
//               </button>
//               <h3>Selected Items (IDs): {JSON.stringify(checkedItems)}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPermission;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TreeNode = ({ node, handleCheck }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Toggle node expansion
//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="ml-4">
//       <div className="flex items-center gap-2 p-2">
//         {node.children.length > 0 && (
//           <span className="cursor-pointer" onClick={toggleExpand}>
//             {isExpanded ? "▼" : "▶"}
//           </span>
//         )}
//         <input
//           type="checkbox"
//           checked={node.isChecked}
//           onChange={() => handleCheck(node.id, !node.isChecked)}
//         />
//         <span>{node.menu_name || node.name}</span>
//       </div>

//       {/* Render children when expanded */}
//       {isExpanded && (
//         <div className="ml-4 border-l-2 border-gray-300 pl-2">
//           {node.children.map((child) => (
//             <TreeNode key={child.id} node={child} handleCheck={handleCheck} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const UserPermission = ({ staffId }) => {
//   const [treeData, setTreeData] = useState([]);

//   useEffect(() => {
//     const getTreeData = async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
//           { staff_id: staffId?.id }
//         );

//         // Transform API response to match tree structure with check state
//         const transformedData = response.data.data.map((menu) => ({
//           id: menu.id,
//           menu_name: menu.menu_name,
//           isChecked: menu.is_checked === 1, // Set checked based on API
//           children: menu.menu_Routes
//             ? menu.menu_Routes.map((route) => ({
//                 id: route.id,
//                 name: route.name || route.route_url,
//                 isChecked: route.is_checked === 1, // Set checked based on API
//                 children: [],
//               }))
//             : [],
//         }));

//         setTreeData(transformedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (staffId) {
//       getTreeData();
//     }
//   }, [staffId]);

//   // Handle checkbox selection & update API
//   const handleCheck = async (id, newCheckedState) => {
//     const updateCheckedState = (nodes) =>
//       nodes.map((node) => {
//         if (node.id === id) {
//           return {
//             ...node,
//             isChecked: newCheckedState,
//             children: node.children.map((child) => ({
//               ...child,
//               isChecked: newCheckedState, // Check/uncheck children
//             })),
//           };
//         } else {
//           return {
//             ...node,
//             children: updateCheckedState(node.children),
//           };
//         }
//       });

//     setTreeData(updateCheckedState(treeData));

//     // Call API to update permission status
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BASE_URL}updateStaffPermission`,
//         {
//           staff_id: staffId?.id,
//           staff_permissions: id,
//           // is_checked: newCheckedState ? 1 : 0, 
//         }
//       );
//     } catch (error) {
//       console.error("Error updating permission:", error);
//     }
//   };

//   return (
//     <div className="wpWrapper">
//       <div className="container-fluid">
//         <div className="card">
//           <div className="card-body">
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">Staff Permissions</h2>
//               <div className="bg-white shadow-md rounded p-4">
//                 <>
//                 {treeData.map((node) => (
//                   <TreeNode
//                   key={node.id}
//                   node={node}
//                   handleCheck={handleCheck}
//                   />
//                 ))}
//                  {/* <button onClick={handleClick} className="btn btn-secondary">
//                  Update Role
//                </button> */}
//                 </>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPermission;
import React, { useState, useEffect } from "react";
import axios from "axios";

const TreeNode = ({ node, handleCheck }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="ml-4 staffPer">
      <div className="flex items-center gap-2 p-2">
        {node.children.length > 0 && (
          <span className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        <input
          type="checkbox"
          checked={node.isChecked}
          onChange={() => handleCheck(node)}
        />
        <span className="ps-2"> {node.menu_name || node.name}</span>
      </div>

      {isExpanded && (
        <div className="ml-4 border-l-2 border-gray-300 pl-2 dropPermission">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} handleCheck={handleCheck} />
          ))}
        </div>
      )}
    </div>
  );
};

const UserPermission = ({ staffId }) => {
  const [treeData, setTreeData] = useState([]);
  const [staffPermissions, setStaffPermissions] = useState([]); // Store checked permissions

  useEffect(() => {
    const getTreeData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}getStaffPermissionsById`,
          { staff_id: staffId?.id }
        );

        const transformedData = response.data.data.map((menu) => ({
          id: menu.id,
          menu_name: menu.menu_name,
          isChecked: menu.is_checked === 1,
          children: menu.menu_Routes
            ? menu.menu_Routes.map((route) => ({
                id: route.id,
                name: route.name || route.route_url,
                isChecked: route.is_checked === 1,
                children: [],
              }))
            : [],
        }));

        setTreeData(transformedData);

        // Collect all checked permission IDs initially
        const checkedIds = transformedData.flatMap((menu) => {
          const menuPermissions = menu.isChecked ? [menu.id] : [];
          const routePermissions = menu.children
            .filter((route) => route.isChecked)
            .map((route) => route.id);
          return [...menuPermissions, ...routePermissions];
        });

        setStaffPermissions(checkedIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (staffId) {
      getTreeData();
    }
  }, [staffId]);

  // Handle checkbox selection & update staffPermissions array
  const handleCheck = (node) => {
    const isChecked = !node.isChecked;

    // Update checked state in tree
    const updateCheckedState = (nodes) =>
      nodes.map((n) => ({
        ...n,
        isChecked: n.id === node.id ? isChecked : n.isChecked,
        children: updateCheckedState(n.children),
      }));

    setTreeData(updateCheckedState(treeData));

    // Update permissions array
    setStaffPermissions((prevPermissions) =>
      isChecked
        ? [...prevPermissions, node.id] // Add if checked
        : prevPermissions.filter((id) => id !== node.id) // Remove if unchecked
    );
  };

  // Send updated permissions to API
  const handleUpdate = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}updateStaffPermission`, {
        staff_id: staffId?.id,
        staff_permissions: staffPermissions, // Send full updated array
      });
      alert("Permissions updated successfully!");
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div>
          <div>
            <div>
              <h2 className="text-xl font-bold mb-2">Staff Permissions</h2>
              <div className="bg-white shadow-md rounded mainPer">
                {treeData.map((node) => (
                  <TreeNode key={node.id} node={node} handleCheck={handleCheck} />
                ))}
              </div>
              <button onClick={handleUpdate} className="btn btn-secondary mt-3">
                Update Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermission;
