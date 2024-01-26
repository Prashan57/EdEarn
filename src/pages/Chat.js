import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = ({ room }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && room) {
      socket.emit("joinRoom", room);

      return () => {
        socket.emit("leaveRoom", room);
      };
    }
  }, [socket, room]);

  const sendMessage = () => {
    if (message?.trim() !== "") {
      socket.emit("message", { room: room, message: message });
      setMessage("");
    }
    console.log("baka");
  };

  return (
    <div>
      <div>
        <center>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </center>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
