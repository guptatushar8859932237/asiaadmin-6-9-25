import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { BiLeftArrowCircle } from "react-icons/bi";
import whiteLogoNew from "../../images/logoWhiteNew.png";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Rule } from "@mui/icons-material";
const routes = [
  {
    path: "/Admin/dashboard",
    name: "Dashboard",
    icon: <SpeedOutlinedIcon />,
  },
  {
    path: "",
    name: "Enquiries",
    icon: <AssignmentIndIcon />,
    subRoutes: [
      {
        path: "/Admin/managefreight",
        name: "Freight by Admin",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/freight",
        name: "Freight by User",
        icon: <FaUser />,
      },
      {
        path: "/Admin/custom-clearance-order",
        name: "Custom by Admin",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/Custom-clearence-byuser",
        name: "Custom by User",
        icon: <FaUser />,
      },
      {
        path: "/Admin/query",
        name: "Dispute",
        icon: <QueryStatsIcon />,
      },
      {
        path: "/Admin/notifications",
        name: "Notifications",
        icon: <NotificationsActiveOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Manage Invoices",
    icon: <InsertDriveFileIcon />,
    subRoutes: [
      {
        path: "/Admin/billing",
        name: "Invoices",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/sageinvoice",
        name: "Sage Invoices",
        icon: <FaUser />,
      },
      {
        path: "/Admin/cashbook",
        name: "Cashbook",
        icon: <ShoppingCartOutlinedIcon />,
      },
      {
        path: "/Admin/releasedDashboard",
        name: "Released Dashboard",
        icon: <DashboardIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Manage Freight",
    icon: <FlightOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/order",
        name: "Freight Orders",
        icon: <ShoppingCartOutlinedIcon />,
      },
      {
        path: "/Admin/manage-shipment",
        name: "Shipments",
        icon: <PeopleAltOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Custom Clearance",
    icon: <PlaylistAddCheckOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/calculation-order",
        name: "Clearance Order",
        icon: <ShoppingCartOutlinedIcon />,
      },
      // {
      //   path: "/Admin/google_drive",
      //   name: "Google drive",
      //   icon: <ShoppingCartOutlinedIcon />,
      // },
    ],
  },
  {
    path: "",
    name: "Batches",
    icon: <WorkspacePremiumOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/Batches",
        name: "Batches",
        icon: <MilitaryTechOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Warehouse",
    icon: <WarehouseOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/WarehouseOrder",
        name: "Warehouse Order",
        icon: <ShoppingCartOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Imports ",
    icon: <FileUploadOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/oploadfile",
        name: "Excel",
        icon: <DriveFileMoveOutlinedIcon />,
      },
    ],
  },
  {
    path: "/Admin/countryoforigin",
    name: "Country Of Origin",
    icon: <LanguageOutlinedIcon />,
  },
  {
    path: "/Admin/manage-customer",
    name: "Manage Customers",
    icon: <PeopleAltOutlinedIcon />,
  },
];
const userControlRoutes = {
  path: "",
  name: "User Control",
  icon: <SecurityOutlinedIcon />,
  subRoutes: [
    {
      path: "/Admin/manage-staff",
      name: "Manage Staff",
      icon: <Groups2OutlinedIcon />,
    },
    // {
    //   path: "/Admin/manage-roles",
    //   name: "Manage Roles",
    //   icon: <Rule />,
    // },
    // {
    //   path: "/Admin/manage-roles-permission",
    //   name: "Manage Permissions",
    //   icon: <Rule />,
    // },
    {
      path: "/Admin/Warehouse",
      name: "Warehouse",
      icon: <OtherHousesOutlinedIcon />,
    },
    // {
    //   path: "/Admin/manage-supplier",
    //   name: "Manage Suppliers",
    //   icon: <LocalShippingOutlinedIcon />,
    // },
   
    // {
    //   path: "/Admin/Notificaionstorage",
    //   name: "Files & Storage",
    //   icon: <NotificationsActiveOutlinedIcon />,
    // },
    {
      path: "/Admin/link",
      name: "Add Links",
      icon: <AddLinkIcon />,
    },
    {
      path: "/Admin/term-conditions",
      name: "Terms and Conditions",
      icon: <DescriptionOutlinedIcon />,
    },
    {
      path: "/Admin/privacy-policy",
      name: "Privacy Policy",
      icon: <PrivacyTipOutlinedIcon />,
    },
  ],
};
const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // Track the currently open dropdown
  const usertype = JSON.parse(localStorage.getItem("data123")).user_type;
  const filteredRoutes = [...routes];
  if (usertype === "1") {
    filteredRoutes.push(userControlRoutes);
  }

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const handleDropdownToggle = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "300px" : "42px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar`}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                <img
                  src={whiteLogoNew}
                  alt="this is image"
                  style={{ width: "150px" }}
                />
              </motion.h1>
            )}
          </AnimatePresence>
          {
            isOpen? (<div className="bars" style={{ borderRadius: "20px" }}>
            <BiLeftArrowCircle
              onClick={toggle}
              style={{ fontSize: "2rem", cursor: "pointer" }}
            />
          </div>):(   <BiRightArrowCircle size={30}  onClick={toggle}  color="blue" />)
          }
         
        </div>
        <div className="text-center">
          <div>
            <button
              className="search"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/Admin/Addfreight");
              }}
            >
              <AnimatePresence>
                <span>
                  <ControlPointRoundedIcon />
                </span>
                {isOpen && (
                  <p className="addF" style={{ cursor: "pointer" }}>
                    Add Freight
                  </p>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <section className="routes">
          {filteredRoutes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <div key={index}>
                  <div
                    className="link dropdown-header"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDropdownToggle(index)}>
                    <div className="icon ">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text d-flex justify-content-between align-items-center">
                          <span>{route.name}</span>
                          {openDropdown === index ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {openDropdown === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="sub_routes">
                      {route.subRoutes.map((subRoute, subIndex) => (
                        <NavLink
                          to={subRoute.path}
                          key={subIndex}
                          className={({ isActive }) =>
                            isActive ? "link active" : "link"
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="icon ms-4">{subRoute.icon}</div>
                          {isOpen && (
                            <div className="link_text1 ">{subRoute.name}</div>
                          )}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                to={route.path}
                key={index}
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>
      <motion.div
        animate={{
          width: isOpen ? "85%" : "100%",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`main_div`}
      >
        <main>{children}</main>
      </motion.div>
    </div>
  );
};
export default SideBar;
