import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const LOGGED_IN_USER_ID = JSON.parse(
  localStorage.getItem("data123")
)?.id;
console.log(LOGGED_IN_USER_ID)
export default function QuotationInFreight() {
  const location = useLocation();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const activeChat =
    location.state?.data ||
    JSON.parse(localStorage.getItem("activeChat"));
    
  const RECEIVER_ID =
    activeChat?.id || activeChat?.receiver_id || activeChat?.sender_id;

  const [conversationId, setConversationId] = useState(
    activeChat?.conversation_id || null
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /* ================= SOCKET INIT ================= */
  useEffect(() => {
    if (!LOGGED_IN_USER_ID) return;

    socketRef.current = io(process.env.REACT_APP_BASE_URL);

    socketRef.current.emit("join", LOGGED_IN_USER_ID);

    socketRef.current.on("receiveMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          key: `socket-${data.id}`,
          text: data.message,
          sender:
            data.sender_id === LOGGED_IN_USER_ID
              ? "me"
              : "other",
        },
      ]);
    });
    return () => socketRef.current.disconnect();
  }, []);
 const createConversation = async () => {
  try {
    if (!LOGGED_IN_USER_ID || !RECEIVER_ID) {
      toast.warning("Invalid user details");
      return;
    }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}chat/createConversation`,
      {
        sender_id: LOGGED_IN_USER_ID,
        receiver_id: RECEIVER_ID,
      }
    );
    if (res?.data?.conversation_id) {
      setConversationId(res.data.conversation_id);
    } else {
      toast.error("Conversation ID not received");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to create conversation"
    );
  }
};
  useEffect(() => {
    if (!conversationId && RECEIVER_ID) {
      createConversation();
    }
  }, [RECEIVER_ID]);
  useEffect(() => {
  if (!conversationId || !RECEIVER_ID) return;

  const payload = {
    receiver_id: RECEIVER_ID,
    conversation_id: conversationId,
  };

  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}chat/getMessages`,
      payload
    )
    .then((res) => {
      setMessages(
        res.data.messages.map((m) => ({
          key: `db-${m.id}`,
          text: m.message,
          sender:
            m.sender_id === LOGGED_IN_USER_ID
              ? "me"
              : "other",
        }))
      );
    })
    .catch((err) => {
      console.log("Get Messages Error:", err);
    });
}, [conversationId, RECEIVER_ID]);
  const sendMessage = async () => {
    if (!message.trim() || !conversationId) return;
    const payload = {
      sender_id: LOGGED_IN_USER_ID,
      // receiver_id: RECEIVER_ID,
      conversation_id: conversationId,
      message,
    };
    setMessages((prev) => [
      ...prev,
      {
        key: `local-${Date.now()}`,
        text: message,
        sender: "me",
      },
    ]);
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}chat/sendMessage`,
      payload
    );
    socketRef.current.emit("sendMessage", {
      ...payload,
      id: res.data.id, // backend se id bhejo
    });
    setMessage("");
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!activeChat) return <div>Select chat</div>;
  return (
    <div style={{ height: "100vh" }}>
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
                  background:
                    msg.sender === "me" ? "#0d6efd" : "#eee",
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
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
