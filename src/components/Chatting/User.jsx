import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const userData = JSON.parse(localStorage.getItem("data123"));
  const userId = userData?.id;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const initiateChat = async () => {
    if (!userId) {
      console.log("User ID not found");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getAdminInbox`,
        { admin_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        setData(response.data.inbox);
      }
    } catch (error) {
      console.error("Chat fetch failed", error.response?.data);
    }
  };

  useEffect(() => {
    initiateChat();
  }, []);
  const handlecilnavi=(chat)=>{
     navigate("/Admin/QuotationInFreight", { state: { data: chat } });
  }

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="row manageFreight">
          <div className="col-12 mb-3">
            <h4>User Chatting Page</h4>
          </div>

          {data.length > 0 ? (
            data.map((chat) => (
              <div key={chat.conversation_id} className="chat-item border p-2 mb-2" onClick={()=>{handlecilnavi(chat)}}>
                <p><strong>Name:</strong> {chat.sender_name}</p>
                <p><strong>Last Message:</strong> {chat.last_message}</p>
                <p><strong>Type:</strong> {chat.message_type}</p>
                <p><strong>Time:</strong> {new Date(chat.last_time).toLocaleString('en-GB')}</p>
              </div>
            ))
          ) : (
            <p>No chat data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
