



// function handleAuthClick() {
//   gapi.load("client:auth2", () => {
//     gapi.auth2.init({
//       client_id: CLIENT_ID,
//       scope: SCOPES,
//     }).then(() => {
//       const GoogleAuth = gapi.auth2.getAuthInstance();
//       GoogleAuth.signIn().then((user) => {
//         const accessToken = user.getAuthResponse().access_token;
//         console.log("Access Token:", accessToken);
//       });
//     });
//   });
// }

// useEffect(() => {
//   const script = document.createElement("script");
//   script.src = "https://apis.google.com/js/api.js";
//   script.onload = () => gapi.load("client:auth2");
//   document.body.appendChild(script);
// }, []);





import React, { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ClientIdContext from "../../Context/ClientIdContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { gapi } from "gapi-script";
const GoogleAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [tokenClient, setTokenClient] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
const SCOPES = "https://www.googleapis.com/auth/drive.file"; // Access Google Drive
  const clientId = useContext(ClientIdContext);

  const handleAuthClick=()=> {
    if (tokenClient) {
      console.log(tokenClient)
      tokenClient.requestAccessToken();
      // navigate("/Admin/Uploadimgae", { state: { auth,user }});
    } else {
      console.error("Google API not loaded yet");
    }
  }


  console.log("Client ID:", clientId);
  console.log(user,"token :" ,auth)
  const handleNavigate = () => {
    if (user) {
      navigate("/Admin/Uploadimgae", { state: { auth,user,accessToken }});
    } else {
      toast.error("User not authorized");
    }
  };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: SCOPES,
          callback: (response) => {
            if (response.access_token) {
              setAccessToken(response.access_token);
              console.log("Access Token:", response.access_token);
            } else {
              console.error("Error getting access token");
            }
          },
        });
        setTokenClient(client);
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        className="w-25"
        onSuccess={(response) => {
          const token = response.credential;
          console.log(token)
          setUser(token);
          const decoded = jwtDecode(token);
          setAuth(decoded);
          console.log(decoded)
        }}
        onError={() => {
          console.log("Login Failed");
          toast.error("Login Failed");
        }}
      />
      <button onClick={handleAuthClick}>getaccess button</button>
      {user && <button onClick={handleNavigate}>Upload image</button>}
    </div>
  );
};

export default GoogleAuth;
