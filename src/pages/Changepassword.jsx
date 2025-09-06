// import axios from "axios";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for toastify
// export default function Changepassword() {
//     const currentuser = JSON?.parse(localStorage?.getItem("data123"));
//     const [data, setData] = useState({
//         oldpassword: "",
//         newpassword: "",
//         confirmpassword: "",
//         id: currentuser?.id
//     });
//     const [errors, setErrors] = useState({});
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({ ...data, [name]: value });
//         setErrors({ ...errors, [name]: "" });
//     };
//     const handleValidate = () => {
//         let newErrors = {};
//         let isValid = true;
//         if (!data.oldpassword) {
//             newErrors.oldpassword = "Old password is required";
//             isValid = false;
//         }
//         if (!data.newpassword) {
//             newErrors.newpassword = "New password is required";
//             isValid = false;
//         }
//         if (!data.confirmpassword) {
//             newErrors.confirmpassword = "Confirm password is required";
//             isValid = false;
//         }
//         if (data.newpassword !== data.confirmpassword) {
//             newErrors.passwordMatch = "Passwords do not match";
//             isValid = false;
//         }
//         setErrors(newErrors);
//         if (!isValid) {
//             if (newErrors.oldpassword) {
//                 toast.error(newErrors.oldpassword);
//             } else if (newErrors.newpassword) {
//                 toast.error(newErrors.newpassword);
//             } else if (newErrors.confirmpassword) {
//                 toast.error(newErrors.confirmpassword);
//             } else if (newErrors.passwordMatch) {
//                 toast.error(newErrors.passwordMatch);
//             }
//         }
//         return isValid;
//     };
//     const handleClick = () => {
//         if (handleValidate()) {
//             apiHit();
//         }
//     };
//     const apiHit = () => {
//         axios.post(`${process.env.REACT_APP_BASE_URL}change-password`, data).then((response) => {
//             if (response.status === 200) {
//                 toast.success(response.data.message);
//                 setData({
//                     id: currentuser?.id,
//                     oldpassword: "",
//                     newpassword: "",
//                     confirmpassword: "",
//                 });
//             } else {
//                 toast.error(response.data.message);
//             }
//         }).catch((error) => {
//             toast.error(error.response?.data?.message || "An error occurred");
//         });
//     };
//     return (
//         <>
//             <div className="wpWrapper">
//                 <div className="container-fluid">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <h4 className="freight_hd">Change Password</h4>
                                    
//                                 </div>
//                             </div>
//                             <div className="row mt-2 py-2">
//                                 <div className="col-lg-6">
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="password"
//                                             onChange={handleChange}
//                                             name="oldpassword"
//                                             className={`form-control px-3 ${errors.oldpassword ? "is-invalid" : ""}`}
//                                             id="floatingInput"
//                                             placeholder="Old Password"
//                                             value={data.oldpassword}
//                                         />
//                                         <label htmlFor="floatingInput" className="px-3">Old Password</label>
//                                         {errors.oldpassword && (
//                                             <div className="invalid-feedback">{errors.oldpassword}</div>
//                                         )}
//                                     </div>
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="password"
//                                             onChange={handleChange}
//                                             name="newpassword"
//                                             className={`form-control px-3 ${errors.newpassword ? "is-invalid" : ""}`}
//                                             id="floatingPassword"
//                                             placeholder="New Password"
//                                             value={data.newpassword}
//                                         />
//                                         <label htmlFor="floatingPassword" className="px-3">New Password</label>
//                                         {errors.newpassword && (
//                                             <div className="invalid-feedback">{errors.newpassword}</div>
//                                         )}
//                                     </div>
//                                     <div className="form-floating mb-3">
//                                         <input
//                                             type="password"
//                                             onChange={handleChange}
//                                             name="confirmpassword"
//                                             className={`form-control px-3 ${errors.confirmpassword ? "is-invalid" : ""}`}
//                                             id="floatingPassword1"
//                                             placeholder="Confirm Password"
//                                             value={data.confirmpassword}
//                                         />
//                                         <label htmlFor="floatingPassword1" className="px-3">Confirm Password</label>
//                                         {errors.confirmpassword && (
//                                             <div className="invalid-feedback">{errors.confirmpassword}</div>
//                                         )}
//                                         {errors.passwordMatch && (
//                                             <div className="invalid-feedback">{errors.passwordMatch}</div>
//                                         )}
//                                     </div>
//                                     <button
//                                         className="btn text-white mt-2"
//                                         style={{ backgroundColor: "#1b2245" }}
//                                         onClick={handleClick}
//                                     >
//                                         Change Password
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </div>
//         </>
//     );
// }
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for toastify
export default function Changepassword() {
  const currentuser = JSON?.parse(localStorage?.getItem("data123"));
  const [data, setData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    id: currentuser?.id,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleValidate = () => {
    let newErrors = {};
    let isValid = true;
    if (!data.oldpassword) {
      newErrors.oldpassword = "Old password is required";
      isValid = false;
    }
    if (!data.newpassword) {
      newErrors.newpassword = "New password is required";
      isValid = false;
    }
    if (!data.confirmpassword) {
      newErrors.confirmpassword = "Confirm password is required";
      isValid = false;
    }
    if (data.newpassword !== data.confirmpassword) {
      newErrors.passwordMatch = "Passwords do not match";
      isValid = false;
    }
    setErrors(newErrors);
    if (!isValid) {
      if (newErrors.oldpassword) {
        toast.error(newErrors.oldpassword);
      } else if (newErrors.newpassword) {
        toast.error(newErrors.newpassword);
      } else if (newErrors.confirmpassword) {
        toast.error(newErrors.confirmpassword);
      } else if (newErrors.passwordMatch) {
        toast.error(newErrors.passwordMatch);
      }
    }
    return isValid;
  };
  const handleClick = () => {
    if (handleValidate()) {
      apiHit();
    }
  };
  const apiHit = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}change-password`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          setData({
            id: currentuser?.id,
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
             <div className="row mb-4">
                <div className="col-12">
                  <h4 className="freight_hd">Change Password</h4>
                </div>
              </div>
          <div className="card">
            <div className="card-body">
             
              <div className="row py-2 changePassForm">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="floatingInput" className="px-3">
                      Old Password
                    </label>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="oldpassword"
                      className={`form-control px-3 ${
                        errors.oldpassword ? "is-invalid" : ""
                      }`}
                      id="floatingInput"
                      placeholder="Old Password"
                      value={data.oldpassword}
                    />

                    {errors.oldpassword && (
                      <div className="invalid-feedback">
                        {errors.oldpassword}
                      </div>
                    )}
                  </div>
                  <div className="  mb-3">
                    <label htmlFor="floatingPassword" className="px-3">
                      New Password
                    </label>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="newpassword"
                      className={`form-control px-3 ${
                        errors.newpassword ? "is-invalid" : ""
                      }`}
                      id="floatingPassword"
                      placeholder="New Password"
                      value={data.newpassword}
                    />

                    {errors.newpassword && (
                      <div className="invalid-feedback">
                        {errors.newpassword}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="floatingPassword1" className="px-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="confirmpassword"
                      className={`form-control px-3 ${
                        errors.confirmpassword ? "is-invalid" : ""
                      }`}
                      id="floatingPassword1"
                      placeholder="Confirm Password"
                      value={data.confirmpassword}
                    />

                    {errors.confirmpassword && (
                      <div className="invalid-feedback">
                        {errors.confirmpassword}
                      </div>
                    )}
                    {errors.passwordMatch && (
                      <div className="invalid-feedback">
                        {errors.passwordMatch}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn text-white mt-2"
                    style={{ backgroundColor: "#1b2245" }}
                    onClick={handleClick}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
