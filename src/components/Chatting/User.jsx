import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
export default function User() {
  const userData = JSON.parse(localStorage.getItem("data123"));
  const userId = userData?.id;
  const token = localStorage.getItem("token");
  const socketRef = useRef(null);
  const selectedChatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [messageText, setMessageText] = useState("");
  // ================= REF FIX =================
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);
  // ================= SCROLL =================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // ================= SOCKET =================
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_BASE_URLSoket, {
      transports: ["websocket"],
    });
    const socket = socketRef.current;
   socket.on("connect", () => {
  console.log("Connected:", socket.id);
 
  // 🔥 JOIN ALL ROOMS ON CONNECT
  users.forEach((chat) => {
    socket.emit("joinConversation", chat.conversation_id);
  });
});
    socket.on("newMessage", (data) => {
      console.log("Incoming:", data);
      // 👉 CHAT WINDOW UPDATE
      // setMessages((prev) => {
      //   if (
      //     data.conversation_id ===
      //     selectedChatRef.current?.conversation_id
      //   ) {
      //     return [...prev, data];
      //   }
      //   return prev;
      // });
setMessages((prev) => {
  if (
    data.conversation_id ===
    selectedChatRef.current?.conversation_id
  ) {
    const exists = prev.some(
      (msg) => msg.id === data.message_id
    );
    if (exists) return prev;
    return [...prev, data];
  }
  return prev;
});
      // 👉 USERS SIDEBAR UPDATE
      setUsers((prev) => {
        let updated = prev.map((chat) =>
          chat.conversation_id === data.conversation_id
            ? { ...chat, last_message: data.message }
            : chat
        );

        const current = updated.find(
          (c) => c.conversation_id === data.conversation_id
        );

        const rest = updated.filter(
          (c) => c.conversation_id !== data.conversation_id
        );

        return current ? [current, ...rest] : updated;
      });

      // 👉 STAFF SIDEBAR UPDATE
      setStaff((prev) => {
        return prev.map((s) =>
          s.id === data.sender_id
            ? { ...s, last_message: data.message }
            : s
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ================= JOIN ROOM =================
  useEffect(() => {
    if (selectedChat && socketRef.current) {
      socketRef.current.emit("joinConversation", selectedChat.conversation_id);
    }
  }, [selectedChat]);

  // ================= API =================
  const initiateChat = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getAdminInbox`,
        { admin_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUsers(res.data.inbox);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const staffList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}staff-list`
      );

      if (res.data.success) {
        setStaff(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initiateChat();
    staffList();
  }, []);
useEffect(() => {
  if (socketRef.current && users.length > 0) {
    console.log("📡 Joining all user conversations");
 
    users.forEach((chat) => {
      socketRef.current.emit("joinConversation", chat.conversation_id);
    });
  }
}, [users]);
  // ================= GET MESSAGES =================
  const getMessages1 = async (chat) => {
    setSelectedChat(chat);
    setMessages([]);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
        {
          conversation_id: chat.conversation_id,
          receiver_id: chat.sender_id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= START STAFF CHAT =================
  const startStaffChat = async (staffData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
        {
          sender_id: userId,
          sender_type: "user",
          receiver_type: "user",
          receiver_id: staffData.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );  

      if (res.data.success) {
        const chat = {
          conversation_id: res.data.conversation_id,
          sender_id: staffData.id,
          sender_name: staffData.full_name,
        };

        setSelectedChat(chat);
        getMessages1(chat);
      }
    } catch (err) {
      console.log(err);
    }
  };
const truncateMessage = (text, limit = 20) => {
  if (!text) return "";
  return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;
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
          message_type: "text",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const newMsg = {
          ...res.data.data,
          sender_id: userId,
          sender_name: userData?.name || "Admin",
          message: messageText,
          conversation_id: selectedChat.conversation_id,
        };

        setMessages((prev) => [...prev, newMsg]);

        // socketRef.current.emit("sendMessage", newMsg);

        setMessageText("");
        initiateChat()
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UI =================
  return (
    <div className="container-fluid chat-app">
      <div className="row g-0">

        {/* SIDEBAR */}
        <div className="col-md-3 chat-sidebar">
          <div className="chat-header">
            <h5>Chats</h5>
          </div>

          {/* TABS */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "users" ? "active" : ""
                }`}
                onClick={() => setActiveTab("users")}
              >
                Users
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "staff" ? "active" : ""
                }`}
                onClick={() => setActiveTab("staff")}
              >
                Staff
              </button>
            </li>
          </ul>

          <div className="chat-list">

            {/* USERS */}
            {activeTab === "users" &&
              users.map((chat) => (
                <div
                  key={chat.conversation_id}
                  className={`chat-user ${
                    selectedChat?.conversation_id ===
                    chat.conversation_id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => getMessages1(chat)}
                >
                  <div className="avatar">
                    {chat.sender_name?.charAt(0)}
                  </div>

                  <div className="chat-info">
                    <strong>{chat.sender_name}</strong>
                  <p>{truncateMessage(chat.last_message, 20)}</p>
                  </div>
                </div>
              ))}

            {/* STAFF */}
            {activeTab === "staff" &&
              staff.map((item) => (
                <div
                  key={item.id}
                  className={`chat-user ${
                    selectedChat?.sender_id === item.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => startStaffChat(item)}
                >
                  <div className="avatar">
                    {item.full_name?.charAt(0)}
                  </div>

                  <div className="chat-info">
                    <strong>{item.full_name}</strong>
                    <p>{item.last_message || item.country_name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="col-md-9 chat-main">
          <div className="chat-top">
            {selectedChat
              ? selectedChat.sender_name
              : "Select Chat"}
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => {
              const isMe = msg.sender_id === userId;

              return (
                <div
                  key={i}
                  className={`message-row ${
                    isMe ? "sent" : "received"
                  }`}
                >
                  <div className="message-bubble">
                    <div className="message-name">
                      {msg.sender_name}
                    </div>
                    <div>{msg.message}</div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input d-flex gap-2 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Type message..."
              value={messageText}
              onChange={(e) =>
                setMessageText(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage1()
              }
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