import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext1 } from "../../Context/MyContext";
export default function Profile() {
  const [data, setData] = useState({});
  const{text,setText}=useContext(MyContext1)
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
const datauserId = JSON.parse(localStorage.getItem("data123"))
  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}get-profile-admin`, {
        user_id: datauserId.id,
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to fetch profile data");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handlePostData = async () => {
    try {
      setLoading(true); 
      const formData = new FormData();
      formData.append('profile', profileImage);
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      formData.append("id",datauserId.id );
      await axios.post(`${process.env.REACT_APP_BASE_URL}update-profile`, formData).then((response)=>{
        setText(response.data.data[0].profile)
      })
          toast.success("Profile updated successfully");
      fetchData(); 
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false); 
    }
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <h4 className="freight_hd">Profile </h4>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        className="btn up_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Update Profile
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="row mb-0">
                        <div className="profileImgAdmin mb-5 text-center">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL_image}${data.profile}`}
                            name="profile"
                            style={{ width: "130px", height: "130px", borderRadius: "50%" }}
                            alt="Profile"
                          />
                        </div>
                        <div className="profileContent">
                          <div className="row">
                            <div className="col-12">
                              <input
                                type="file"
                                name="profile"
                                onChange={handleChangeFile}
                                className="w-100 mb-3 px-2 py-2 rounded border"
                              />
                            </div>
                            <div className="col-12">
                              <input
                                value={data.full_name || ""}
                                name="full_name"
                                onChange={handleChange}
                                className="w-100 mb-3 px-2 py-2 rounded border"
                              />
                            </div>
                            <div className="col-12">
                              <input
                                value={data.email || ""}
                                name="email"
                                onChange={handleChange}
                                className="w-100 mb-3 px-2 py-2 rounded border"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handlePostData}
                          disabled={loading} // Disable button during loading
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <div className="pro_box1">
                    <div className="img_profile">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL_image}${text}`}
                        className="pro_img"
                        alt="Profile"
                      />
                    </div>
                    <p className="img_para">Profile Image</p>
                  </div>
                </div>
                <div className="col-9">
                  <div className="pro_box">
                    <div className="profileContent">
                      <h4>Basic Information</h4>
                      <div className="row">
                        <div className="col-lg-6">
                          <p><strong>Role:</strong> <span>{data.Role}</span></p>
                        </div>
                        <div className="col-lg-6">
                          <p><strong>Full Name:</strong> <span>{data.full_name}</span></p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <p><strong>Email:</strong> <span>{data.email}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div>
      </div>
    </>
  );
}
