
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const LOGGED_IN_USER_ID = JSON.parse(localStorage.getItem("data123"))?.id;

export default function SupplierChat() {
  const location = useLocation();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [socketConnected, setSocketConnected] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
console.log(location.state.data)
  const activeChat =
    location.state?.data || JSON.parse(localStorage.getItem("activeChat"));

  const RECEIVER_ID = activeChat?.supplier_id || activeChat?.supplier_id;

  /* ================= SOCKET CONNECT ================= */
  useEffect(() => {
    if (!LOGGED_IN_USER_ID) return;
    // socketRef.current = io("https://sisccltd.com/api/", {
    //   transports: ["websocket"],
    //   reconnection: true,
    // });
    socketRef.current = io("https://sisccltd.com", {
  path: "/socket.io",
  transports: ["websocket"],
  reconnection: true,
});

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected");
      setSocketConnected(true);

      // Join user room
      socketRef.current.emit("joinUser", LOGGED_IN_USER_ID);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setSocketConnected(false);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("⚠️ Socket error:", err.message);
      setSocketConnected(false);    
    });

    socketRef.current.on("receiveMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          key: `socket-${data.id}`,
          text: data.message,
          sender: data.sender_id === LOGGED_IN_USER_ID ? "me" : "other",
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  /* ================= CREATE CONVERSATION ================= */
//   const createConversation = async () => {
//     try {
//       if (!LOGGED_IN_USER_ID || !RECEIVER_ID) return;

//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
//         {
//           sender_id: LOGGED_IN_USER_ID,
//           receiver_id: RECEIVER_ID,
//         }
//       );
//       console.log(res.data.conversation_id)
//        setConversationId(res.data.conversation_id.trim());
//       if (res?.data?.conversation_id) {
//         console.log("work")
//        setConversationId(res.data.conversation_id.trim());
//       }
//     } catch (error) {
//       toast.error("Failed to create conversation");
//     }
//   };
const createConversation = async () => {
  try {
    if (!LOGGED_IN_USER_ID || !RECEIVER_ID) return;

    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}chat/createConversation`,
      {
        sender_type:"user", receiver_type:"supplier",
        sender_id: LOGGED_IN_USER_ID,
        receiver_id: RECEIVER_ID,
      }
    );

    const conversationId = res?.data?.conversation_id;
if(res.status===200){
    console.log(res.data)
      setConversationId(conversationId);
}
    if (!conversationId) {
      toast.error("Conversation ID not received");
      return;
    }
if(res.data.success===true){
    setConversationId(conversationId);

}
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to create conversation"
    );
  }
};

  useEffect(() => {
    if (!conversationId && RECEIVER_ID) {
      createConversation();
    }
  }, [RECEIVER_ID]);

  /* ================= JOIN CONVERSATION ROOM ================= */
  useEffect(() => {
    if (!conversationId || !socketConnected) return;

    console.log("📥 Joining conversation:", conversationId);
    socketRef.current.emit("joinConversation", conversationId);

    return () => {
      socketRef.current.emit("leaveConversation", conversationId);
    };
  }, [conversationId, socketConnected]);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!conversationId) return;
    const payload ={
      conversation_id: conversationId,
      receiver_id: LOGGED_IN_USER_ID
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}chat/getMessages`,payload
      )
      .then((res) => {
        console.log("Loaded messages:", res.data.messages);
        setMessages(
          res.data.messages.map((m) => ({
            key: `db-${m.id}`,
            text: m.message,
            sender: m.sender_id === LOGGED_IN_USER_ID ? "me" : "other",
          }))
        );
      });
  }, [conversationId]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    console.log("A")
 
    const payload = {
      sender_id: LOGGED_IN_USER_ID,
      receiver_id: RECEIVER_ID,
      conversation_id: conversationId,
      message,
    };

    // Optimistic UI
    setMessages((prev) => [
      ...prev,
      {
        key: `local-${Date.now()}`,
        text: message,
        sender: "me",
      },
    ]);
console.log(payload)
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
      payload
    );

    socketRef.current.emit("sendMessage", {
      ...payload,
      id: res.data.id,
    });

    setMessage("");
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!activeChat) return <div>Select chat</div>;

  return (
    <div style={{ height: "100vh" }}>
      {!socketConnected && (
        <div className="text-center bg-warning p-1">
          ⚠️ Chat disconnected. Reconnecting...
        </div>
      )}

      <div className="d-flex flex-column h-100">
        <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
          {messages.map((msg) => (
            <div
              key={msg.key}
              style={{
                textAlign: msg.sender === "me" ? "right" : "left",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: msg.sender === "me" ? "#0d6efd" : "#eee",
                  color: msg.sender === "me" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: 12,
                  display: "inline-block",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 d-flex gap-2">
          <input
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={!socketConnected}
          >
            {socketConnected ? "Send" : "Connecting..."}
          </button>
        </div>
      </div>
    </div>
  );
}
