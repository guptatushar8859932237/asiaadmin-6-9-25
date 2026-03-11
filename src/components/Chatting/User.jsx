
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// export default function User() {
//   const userData = JSON.parse(localStorage.getItem("data123"));
//   const userId = userData?.id;
//   const token = localStorage.getItem("token");
//   const [users, setUsers] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [activeTab, setActiveTab] = useState("users");
//   const [messageText, setMessageText] = useState("");
//   const [staff, setStaff] = useState([]);
//   const socketRef = useRef();
//   useEffect(() => {
//     staffList();
//   }, []);
//   const staffList = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}staff-list`,
//       );  
//       if (response.data.success) {
//         console.log("Staff List:", response.data.data)
//         setStaff(response.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const initiateChat = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/getAdminInbox`,
//         { admin_id: userId },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       if (response.data.success) {
//         setUsers(response.data.inbox);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getMessages1 = async (chat) => {
//     if (!chat) return;
//     setSelectedChat(chat);
//     setMessages([]);
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
//         {
//           conversation_id: chat.conversation_id,
//           receiver_id: chat.sender_id
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       if (res.data.success) {
//         setMessages(res.data.messages);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const sendMessage1 = async () => {
//     if (!messageText.trim() || !selectedChat) return;
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
//         {
//           conversation_id: selectedChat.conversation_id,
//           sender_id: userId,
//           receiver_id: selectedChat.sender_id,
//           message: messageText,
//           message_type: "text"
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       if (res.data.success) {
//         const newMessage = {
//           ...res.data.data,
//           sender_id: userId,
//           sender_name: userData?.name || "Admin",
//           message: messageText
//         };
//         setMessages(prev => [...prev, newMessage]);
//         socketRef.current.emit("sendMessage", newMessage);
//         setMessageText("");
//       }
//     } catch (error) {
//       console.log("Send message error:", error);
//     }
//   };
//   useEffect(() => {
//     initiateChat();
//     socketRef.current = io(process.env.REACT_APP_BASE_URL);
//     socketRef.current.on("receiveMessage", (data) => {
//       if (data.conversation_id === selectedChat?.conversation_id) {
//         setMessages(prev => [...prev, data]);
//       }
//     });
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [selectedChat]);
//   return (
//     <div className="container-fluid border">
//       <div className="row">
// <div className="col-3 border-end" style={{ height: "90vh", overflowY: "auto" }}>
//   <ul className="nav nav-tabs">
//     <li className="nav-item">
//       <button
//         className={`nav-link ${activeTab === "users" ? "active" : ""}`}
//         onClick={() => setActiveTab("users")}
//       >
//         Users
//       </button>
//     </li>

//     <li className="nav-item">
//       <button
//         className={`nav-link ${activeTab === "staff" ? "active" : ""}`}
//         onClick={() => setActiveTab("staff")}
//       >
//         Staff
//       </button>
//     </li>
//   </ul>
//   {activeTab === "users" && (
//     <>
//       <h5 className="p-2">Users</h5>
//       {users.map((chat) => (
//         <div
//           key={chat.conversation_id}
//           className="p-2 border-bottom"
//           style={{ cursor: "pointer" }}
//           onClick={() => getMessages1(chat)}
//         >
//           <strong>{chat?.sender_name}</strong>
//           <p>{chat?.last_message}</p>
//         </div>
//       ))}
//     </>
//   )}
//   {activeTab === "staff" && (
//     <>
//       <h5 className="p-2">Staff</h5>
//       {staff.map((chat) => (
//         <div
//           key={chat.conversation_id}
//           className="p-2 border-bottom"
//           style={{ cursor: "pointer" }}
//           onClick={() => getMessages1(chat)}
//         >
//           <strong>{chat?.full_name}</strong>
//           <p>{chat?.country_name}</p>
//         </div>
//       ))}
//     </>
//   )}
//         </div>
//         <div className="col-9 d-flex flex-column" style={{ height: "90vh" }}>
//           <div className="border-bottom p-2">
//             {selectedChat ? selectedChat?.sender_name : "Select User"}
//           </div>
//           <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>
//             {messages.map((msg) => {
//               const isAdmin = msg.sender_id === userId;
//               return (
//                 <div
//                   key={msg.message_id || Math.random()}
//                   className={`d-flex mb-2 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
//                 >
//                   <div
//                     style={{
//                       maxWidth: "60%",
//                       padding: "8px 12px",
//                       borderRadius: "10px",
//                       background: isAdmin ? "#0d6efd" : "#e9ecef",
//                       color: isAdmin ? "#fff" : "#000"
//                     }}
//                   >
//                     <small><b>{msg.sender_name}</b></small>
//                     <div>{msg.message}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="border-top p-2 d-flex gap-2">
//             <input
//               type="text"
//               className="form-control"
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") sendMessage1();
//               }}
//               placeholder="Type message..."
//             />
//             <button
//               className="btn btn-primary"
//               onClick={sendMessage1}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function User() {

  const userData = JSON.parse(localStorage.getItem("data123"));
  const userId = userData?.id;
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [messageText, setMessageText] = useState("");

  const socketRef = useRef(null);

  // ================= SOCKET INIT =================
  useEffect(() => {

    socketRef.current = io(process.env.REACT_APP_BASE_URL);

    socketRef.current.on("receiveMessage", (data) => {

      if (data.conversation_id === selectedChat?.conversation_id) {
        setMessages(prev => [...prev, data]);
      }

    });

    return () => {
      socketRef.current.disconnect();
    };

  }, [selectedChat]);


  // ================= USER INBOX =================
  const initiateChat = async () => {

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getAdminInbox`,
        { admin_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers(response.data.inbox);
      }

    } catch (error) {
      console.log(error);
    }

  };


  // ================= STAFF LIST =================
  const staffList = async () => {

    try {

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}staff-list`
      );

      if (response.data.success) {
        setStaff(response.data.data);
      }

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    initiateChat();
    staffList();
  }, []);



  // ================= GET MESSAGES =================
  const getMessages1 = async (chat) => {

    if (!chat) return;

    setSelectedChat(chat);
    setMessages([]);

    socketRef.current.emit("joinRoom", chat.conversation_id);

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
        {
          conversation_id: chat.conversation_id,
          receiver_id: chat.sender_id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        setMessages(res.data.messages);
      }

    } catch (error) {
      console.log(error);
    }

  };


  // ================= START STAFF CHAT =================
  const startStaffChat = async (staffData) => {

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
        {
          sender_id: userId,
          receiver_id: staffData.id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {

        const conversation = {
          conversation_id: res.data.conversation_id,
          sender_id: staffData.id,
          sender_name: staffData.full_name
        };

        setSelectedChat(conversation);

        getMessages1(conversation);

      }

    } catch (error) {
      console.log(error);
    }

  };


  // ================= SEND MESSAGE =================
  const sendMessage1 = async () => {

    if (!messageText.trim() || !selectedChat) return;

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
        {
          conversation_id: selectedChat.conversation_id,
          sender_id: userId,
          receiver_id: selectedChat.sender_id,
          message: messageText,
          message_type: "text"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {

        const newMessage = {
          ...res.data.data,
          sender_id: userId,
          sender_name: userData?.name || "Admin",
          message: messageText
        };
        staffList()
        setMessages(prev => [...prev, newMessage]);

        socketRef.current.emit("sendMessage", newMessage);

        setMessageText("");

      }

    } catch (error) {
      console.log(error);
    }

  };


  return (

    <div className="container-fluid border">

      <div className="row">


        {/* ================= LEFT SIDEBAR ================= */}
        <div className="col-3 border-end" style={{ height: "90vh", overflowY: "auto" }}>

          <ul className="nav nav-tabs">

            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "staff" ? "active" : ""}`}
                onClick={() => setActiveTab("staff")}
              >
                Staff
              </button>
            </li>

          </ul>


          {/* USERS TAB */}
          {activeTab === "users" && (

            <>
              <h5 className="p-2">Users</h5>

              {users.map((chat) => (

                <div
                  key={chat.conversation_id}
                  className="p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => getMessages1(chat)}
                >

                  <strong>{chat?.sender_name}</strong>

                  <p>{chat?.last_message}</p>

                </div>

              ))}

            </>

          )}



          {/* STAFF TAB */}
          {activeTab === "staff" && (

            <>
              <h5 className="p-2">Staff</h5>

              {staff.map((item) => (

                <div
                  key={item.id}
                  className="p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => startStaffChat(item)}
                >

                  <strong>{item?.full_name}</strong>

                  <p>{item?.country_name}</p>

                </div>

              ))}

            </>

          )}

        </div>



        {/* ================= CHAT AREA ================= */}
        <div className="col-9 d-flex flex-column" style={{ height: "90vh" }}>

          <div className="border-bottom p-2">

            {selectedChat ? selectedChat?.sender_name : "Select User"}

          </div>


          <div className="flex-grow-1 p-3" style={{ overflowY: "auto" }}>

            {messages.map((msg) => {

              const isAdmin = msg.sender_id === userId;

              return (

                <div
                  key={msg.message_id || Math.random()}
                  className={`d-flex mb-2 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
                >

                  <div
                    style={{
                      maxWidth: "60%",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: isAdmin ? "#0d6efd" : "#e9ecef",
                      color: isAdmin ? "#fff" : "#000"
                    }}
                  >

                    <small><b>{msg.sender_name}</b></small>

                    <div>{msg.message}</div>

                  </div>

                </div>

              );

            })}

          </div>


          {/* MESSAGE INPUT */}
          <div className="border-top p-2 d-flex gap-2">

            <input
              type="text"
              className="form-control"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage1();
              }}
              placeholder="Type message..."
            />

            <button
              className="btn btn-primary"
              onClick={sendMessage1}
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}