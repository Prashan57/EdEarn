import React, { useContext } from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import context from "../context/mainContext";

const Competition = ({ room }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pts, setPts] = useState();
  const [points, setPoints] = useState(0);

  const { user } = useContext(context);
  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);

    return () => {
      //CleanUp Function
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      socket.on("points", (points) => {
        console.log(points);
        setPts(points);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && room) {
      socket.emit("joinRoom", room);

      return () => {
        //or newSocket.disconnect();
        socket.emit("leaveRoom", room);
      };
    }
  }, [socket, room]);

  const sendMessage = () => {
    if (message?.trim() !== "") {
      setPoints((prev) => prev + 1);
      socket.emit("message", { room: room, message: message, points: points });
      setMessage("");
    }
    console.log("baka");
  };

  return (
    <div>
      <div>
        {pts && <h1>{pts}</h1>}
        <center>
          {user && <div>welcome{user.email}</div>}
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

export default Competition;
