// // import React, { useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // const ChatTest = () => {
// //     const socket = io("http://127.0.0.1:5000");
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState([]);
// //   const [status, setStatus] = useState("connect");
// //   useEffect(() => {
// //     socket.on("connect", () => {
// //       setStatus("Connected ✅");
// //       console.log("Socket connected");
// //     });
// //     socket.on("disconnect", () => {
// //       setStatus("Disconnected ❌");
// //     });
// //     socket.on("receiveMessage", (msg) => {
// //       setMessages((prev) => [...prev, msg]);
// //     });
// //     return () => {
// //       socket.off("connect");
// //       socket.off("disconnect");
// //       socket.off("receiveMessage");
// //     };
// //   }, []);
// //   const sendMessage = () => {
// //     if (!message.trim()) return;
// //     socket.emit("sendMessage", message);
// //     setMessages((prev) => [...prev, `You: ${message}`]);
// //     setMessage("");
// //   };
// //   return (
// //     <div style={styles.container}>
// //       <h2>Socket Chat Test</h2>
// //       <p>Status: <b>{status}</b></p>
// //       <div style={styles.chatBox}>
// //         {messages.map((msg, index) => (
// //           <p key={index} style={styles.msg}>{msg}</p>
// //         ))}
// //       </div>
// //       <input
// //         style={styles.input}
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //         placeholder="Type message..."
// //       />
// //       <button style={styles.button} onClick={sendMessage}>
// //         Send
// //       </button>
// //     </div>
// //   );
// // };
// // const styles = {
// //   container: {
// //     width: "350px",
// //     margin: "80px auto",
// //     textAlign: "center",
// //     fontFamily: "Arial",
// //   },
// //   chatBox: {
// //     border: "1px solid #ccc",
// //     height: "200px",
// //     overflowY: "auto",
// //     padding: "10px",
// //     marginBottom: "10px",
// //   },
// //   msg: {
// //     textAlign: "left",
// //     margin: "4px 0",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "8px",
// //     marginBottom: "8px",
// //   },
// //   button: {
// //     width: "100%",
// //     padding: "8px",
// //     cursor: "pointer",
// //   },
// // };
// // export default ChatTest;
// import React from "react";
// const ChatTest = () => {
//   return <div>Chat Page Coming Soon...</div>;
// };





















// export default ChatTest;
