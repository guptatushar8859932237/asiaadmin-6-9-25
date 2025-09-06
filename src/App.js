import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countryoforigin from "./pages/Countryoforigin";
import UserFreight from "./pages/UserFreight";
import MAnageFreightDetails from "./MAnageFreightDetails";
import Listshippingestimate from "./pages/Listshippingestimate";
import Downloadurl from "./pages/Downloadurl";
import OrderDetails from "./pages/OrderDetails";
import AddressUpdate from "./pages/AddressUpdate";
import Updateaddress from "./pages/Updateaddress";
import UpdateDelivery from "./pages/UpdateDelivery";
import Trackorder from "./pages/Trackorder";
import CustomebyUserap from "./pages/CustomebyUser";
import CustomCalculate from "./pages/CustomCalculate";
import ClearenceDtails from "./pages/ClearenceDtails";
import MAnagecustomerDetails from "./pages/MAnagecustomerDetails";
import Chat from "./pages/Chat";
import Clearencedetails from "./pages/Clearencedetails";
import CMS from "./pages/CMS";
import Forgottenpassword from "./components/forgotpassword/Forgottenpassword";
import Conformpass from "./components/forgotpassword/Conformpass";
import CalculationPages from "./pages/CalculationPages";
import Shippingestimmateclearnece from "./pages/Shippingestimmateclearnece";
import Warehosue from "./components/Warehouse/Warehosue";
import ShippingaddfreightEstimate from "./components/shipping estimate/ShippingEstimate";
import ShippingCalcclient from "./components/shipping estimate/ShippingCalcclient";
import Batches from "./pages/Batches";
import BatchesOrder from "./pages/BatchesOrder";
import CustomCalculationpage from "./pages/CustomCalculationpage";
import Claeanepdf from "./pages/Claeanepdf";
import ClearanceOrder from "./pages/ClearanceOrder";
import Waybill from "./bill/Waybill";
import OrderDetailspage from "./pages/OrderDetailspage";
import Letterofauthority from "./pages/Letterofauthority";
import Billofladding from "./pages/Billofladding";
import WarehouseOrder from "./components/Warehouse/WarehouseOrder";
import Batchdetails from "./pages/Batchdetails";
import { MyContext1 } from "./Context/MyContext";
import Freightbyuserdetail from "./pages/Freightbyuserdetail";
import OrderDetailspagemain from "./pages/OrderDetailspagemain";
import WarehouseDetails from "./pages/WarehouseDetails";
import BatchorderDetails from "./pages/BatchorderDetails";
import Excel from "./components/Excel";
import Testingwork from "./components/Testuing/Testingwork";
import Query from "./pages/Query";
import Customeclearingbill from "./bill/Customeclearingbill";
import MAnageshipments from "./components/shipment/MAnageshipments";
import Addshipment from "./components/shipment/Addshipment";
import Billing from "./components/Billing/Billing";
import Billpdf from "./components/Billing/Billpdf";
import Cashbook from "./components/Billing/Cashbook";
import Sageinvoices from "./components/Billing/Sageinvoices";
import Shipmentdeailspage from "./components/shipment/Shipmentdeailspage";
import "./App.css";
import TrackBatch from "./pages/TrackBatch";
import ReleasedDashboadrs from "./components/Billing/ReleasedDashboadrs";
import Downloadprdf from "./pages/Downloadprdf";
import AddBatch from "./pages/AddBatch";
import BookingInstruction from "./pages/BookingInstruction";
import Notificatonandstorage from "./components/notificationAndStorage/Notificatonandstorage";
import Viewdocument from "./pages/Viewdocument";
import ManageRoles from "./components/ManageRoles";
import Userpermission from "./pages/Userpermission";
import { MyContext2 } from "./Context/Permissioncontext";
import StaffDetails from "./pages/StaffDetails";
import Googledrive from "./components/Sidebar/Googledrive";
import Uploadimgae from "./components/Sidebar/Uploadimgae";
import Clearancedetails from "./pages/Clearancedetails";
import Editpdfclearance from "./pages/Editpdfclearance";
import ViewDetails from "./pages/ViewDetails";
import Editclearenceuser from "./pages/Editclearenceuser";
import BookingInsForm from "./pages/BookingInsForm";
import Clearenceorderdetailspage from "./pages/Clearenceorderdetailspage";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Messages = lazy(() => import("./pages/Messages"));
const FileManager = lazy(() => import("./pages/FileManager"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Order = lazy(() => import("./pages/Order"));
const Saved = lazy(() => import("./pages/Saved"));
const Setting = lazy(() => import("./pages/Setting"));
const ManageCustomer = lazy(() => import("./pages/ManageCustomer"));
const ManageStaff = lazy(() => import("./pages/ManageStaff"));
const ManageSupplier = lazy(() => import("./pages/ManageSupplier"));
const Notification = lazy(() => import("./pages/Notification"));
const CustomClearaceOrder = lazy(() => import("./pages/CustomClearaceOrder"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermConditions = lazy(() => import("./pages/TermConditions"));
const Login = lazy(() => import("./components/Login/Login"));
const Admin = lazy(() => import("./Admin"));
const Addfreight = lazy(() => import("./components/Addfreight/Addfright"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Managefreight = lazy(() => import("./Managefreight"));
const Changepassword = lazy(() => import("./pages/Changepassword"));
const Uniovwersalpage = lazy(() => import("./components/Uniovwersalpage"));
export default function App() {
  const [text, setText] = useState("");
  const [permission, setPermission] = useState("");
  console.log("21-1");
  return (
    <MyContext1.Provider value={{ text, setText }}>
      <MyContext2.Provider value={{ permission, setPermission }}>
        <Router basename="Admin">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/forgoten-password"
                element={<Forgottenpassword />}
              />
              <Route path="/conform-passs" element={<Conformpass />} />
              <Route path="Admin" element={<Admin />}>
                <Route index path="/Admin/dashboard" element={<Dashboard />} />
                <Route index path="/Admin/users" element={<Users />} />
                <Route index path="/Admin/messages" element={<Messages />} />
                <Route
                  index
                  path="/Admin/file-manager"
                  element={<FileManager />}
                />
                <Route index path="/Admin/analytics" element={<Analytics />} />
                <Route
                  index
                  path="/Admin/OrderDetails"
                  element={<OrderDetailspage />}
                />
                <Route index path="/Admin/waybill" element={<Waybill />} />
                <Route index path="/Admin/billing" element={<Billing />} />
                <Route
                  index
                  path="/Admin/sageinvoice"
                  element={<Sageinvoices />}
                />
                <Route index path="/Admin/cashbook" element={<Cashbook />} />
                <Route
                  index
                  path="/Admin/billofladding"
                  element={<Billofladding />}
                />
                <Route index path="/Admin/messages" element={<Messages />} />
                <Route index path="/Admin/analytics" element={<Analytics />} />
                <Route
                  index
                  path="/Admin/file-manager"
                  element={<FileManager />}
                />
                <Route index path="/Admin/oploadfile" element={<Excel />} />
                <Route index path="/Admin/order" element={<Order />} />
                <Route
                  index
                  path="/Admin/downlaodpdf"
                  element={<Downloadprdf />}
                />
                <Route index path="/Admin/saved" element={<Saved />} />
                <Route index path="/Admin/Warehouse" element={<Warehosue />} />
                <Route
                  index
                  path="/Admin/customesClearings"
                  element={<Customeclearingbill />}
                />
                <Route
                  index
                  path="/Admin/WarehouseOrder"
                  element={<WarehouseOrder />}
                />
                <Route
                  index
                  path="/Admin/AdminclearenceDetails"
                  element={<Clearenceorderdetailspage />}
                />
                <Route
                  index
                  path="/Admin/google_drive"
                  element={<Googledrive />}
                />
                <Route index path="/Admin/settings" element={<Setting />} />
                <Route
                  index
                  path="/Admin/Notificaionstorage"
                  element={<Notificatonandstorage />}
                />
                <Route
                  index
                  path="/Admin/manage-customer"
                  element={<ManageCustomer />}
                />
                <Route
                  index
                  path="/Admin/manage-staff"
                  element={<ManageStaff />}
                />
                <Route
                  index
                  path="/Admin/staff-details"
                  element={<StaffDetails />}
                />
                <Route
                  index
                  path="/Admin/manage-roles"
                  element={<ManageRoles />}
                />
                <Route
                  index
                  path="/Admin/viewdocument/:id"
                  element={<Viewdocument />}
                />
                <Route index path="/Admin/query" element={<Query />} />
                <Route
                  index
                  path="/Admin/manage-supplier"
                  element={<ManageSupplier />}
                />
                <Route
                  index
                  path="/Admin/releasedDashboard"
                  element={<ReleasedDashboadrs />}
                />
                <Route
                  index
                  path="/Admin/notifications"
                  element={<Notification />}
                />
                <Route
                  index
                  path="/Admin/custom-clearance-order"
                  element={<CustomClearaceOrder />}
                />
                <Route
                  index
                  path="/Admin/term-conditions"
                  element={<TermConditions />}
                />
                <Route
                  index
                  path="/Admin/privacy-policy"
                  element={<PrivacyPolicy />}
                />
                <Route
                  index
                  path="/Admin/Addfreight"
                  element={<Addfreight />}
                />
                <Route
                  index
                  path="/Admin/warehousedetails"
                  element={<WarehouseDetails />}
                />
                <Route index path="/Admin/freight" element={<UserFreight />} />
                <Route
                  index
                  path="/Admin/Uploadimgae"
                  element={<Uploadimgae />}
                />
                <Route
                  index
                  path="/Admin/manage-roles-permission"
                  element={<Userpermission />}
                />
                <Route
                  index
                  path="/Admin/BatchesOrder"
                  element={<BatchesOrder />}
                />
                <Route index path="/Admin/profile" element={<Profile />} />
                <Route
                  index
                  path="/Admin/Clearancedetails"
                  element={<Clearancedetails />}
                />
                <Route
                  index
                  path="/Admin/managefreight"
                  element={<Managefreight />}
                />
                <Route
                  index
                  path="/Admin/manage-shipment"
                  element={<MAnageshipments />}
                />
                <Route index path="/Admin/billpdf" element={<Billpdf />} />
                <Route
                  index
                  path="/Admin/shipmentdetail"
                  element={<Shipmentdeailspage />}
                />
                <Route
                  index
                  path="/Admin/changepassword"
                  element={<Changepassword />}
                />
                <Route
                  index
                  path="/Admin/countryoforigin"
                  element={<Countryoforigin />}
                />
                <Route
                  index
                  path="/Admin/testingwork"
                  element={<Testingwork />}
                />
                <Route
                  index
                  path="/Admin/Trackbatch"
                  element={<TrackBatch />}
                />
                <Route index path="/Admin/Batches" element={<Batches />} />
                <Route
                  index
                  path="/Admin/shipping-estimate"
                  element={<ShippingaddfreightEstimate />}
                />
                <Route
                  index
                  path="/Admin/bookinginstruction"
                  element={<BookingInstruction />}
                />
                <Route
                  index
                  path="/Admin/booking_instruction_form"
                  element={<BookingInsForm />}
                />
                <Route
                  index
                  path="/Admin/addshipment"
                  element={<Addshipment />}
                />
                <Route
                  index
                  path="/Admin/shipping-estimate-client"
                  element={<ShippingCalcclient />}
                />
                <Route
                  index
                  path="/Admin/shipping-estimate-clearence"
                  element={<Shippingestimmateclearnece />}
                />
                <Route
                  index
                  path="/Admin/shipping-estimate-list"
                  element={<Listshippingestimate />}
                />
                <Route
                  index
                  path="/Admin/MAnageFreightDetails"
                  element={<MAnageFreightDetails />}
                />
                <Route
                  index
                  path="/Admin/orderDetails123"
                  element={<OrderDetails />}
                />
                <Route
                  index
                  path="/Admin/addressupdate"
                  element={<AddressUpdate />}
                />
                <Route
                  index
                  path="/Admin/Batchdetails123"
                  element={<Batchdetails />}
                />
                <Route
                  index
                  path="/Admin/updateaddress"
                  element={<Updateaddress />}
                />
                <Route
                  index
                  path="/Admin/updatedelivery"
                  element={<UpdateDelivery />}
                />
                <Route
                  index
                  path="/Admin/Updatedetails"
                  element={<Freightbyuserdetail />}
                />
                <Route
                  index
                  path="/Admin/trackorder"
                  element={<Trackorder />}
                />
                <Route
                  index
                  path="/Admin/Custom-clearence-byuser"
                  element={<CustomebyUserap />}
                />
                <Route
                  index
                  path="/Admin/custom-calcualate"
                  element={<CustomCalculate />}
                />
                <Route
                  index
                  path="/Admin/clearence-Dteails"
                  element={<ClearenceDtails />}
                />
                <Route
                  index
                  path="/Admin/customer-details"
                  element={<MAnagecustomerDetails />}
                />
                <Route
                  index
                  path="/Admin/Custom-details"
                  element={<Clearencedetails />}
                />
                <Route
                  index
                  path="/Admin/Editpdfclearence"
                  element={<Editpdfclearance />}
                />
                <Route index path="/Admin/Chat" element={<Chat />} />
                <Route index path="/Admin/AddBatch" element={<AddBatch />} />
                <Route index path="/Admin/link" element={<CMS />} />
                <Route
                  index
                  path="/Admin/download_url"
                  element={<Downloadurl />}
                />
                <Route
                  index
                  path="/Admin/calculation-clearence"
                  element={<CalculationPages />}
                />
                <Route
                  index
                  path="/Admin/clearencePage"
                  element={<CustomCalculationpage />}
                />
                <Route
                  index
                  path="/Admin/clearencePDF"
                  element={<Claeanepdf />}
                />
                <Route
                  index
                  path="/Admin/calculation-order"
                  element={<ClearanceOrder />}
                />
                <Route
                  index
                  path="/Admin/letterofauhtority"
                  element={<Letterofauthority />}
                />
                <Route
                  index
                  path="/Admin/clearenceeditview"
                  element={<ViewDetails />}
                />
                <Route
                  index
                  path="/Admin/Editclearence"
                  element={<Editclearenceuser />}
                />
                <Route
                  index
                  path="/Admin/BatchDetails"
                  element={<BatchorderDetails />}
                />
                <Route
                  index
                  path="/Admin/OrderDetail"
                  element={<OrderDetailspagemain />}
                />
                <Route path="*" element={<Uniovwersalpage />} />
                <Route path="*" element={<Uniovwersalpage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </MyContext2.Provider>
    </MyContext1.Provider>
  );
}
