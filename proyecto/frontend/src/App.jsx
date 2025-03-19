import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("https://1mb0kp0g-5000.use.devtunnels.ms/", { 
  transports: ["websocket"],
});

export default function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    socket.on("userList", (usersList) => {
      console.log("Lista de usuarios recibida:", usersList);  // Depuración
      setUsers(usersList);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("userList");
      socket.off("receiveMessage");
    };
  }, [username]);

  const handleLogin = () => {
    if (username.trim() !== "") {
      socket.emit("setUsername", username);
      setLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "" && selectedUser) {
      socket.emit("sendMessage", { text: message, to: selectedUser });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      {!loggedIn ? (
        <div className="login-container">
          <h2>Ingresa tu nombre</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre..."
          />
          <button onClick={handleLogin}>Entrar al Chat</button>
        </div>
      ) : (
        <>
          <div className="chat-header">Chat Privado</div>

          {/* Selector de usuario */}
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Selecciona un usuario</option>
            {users.length > 0 ? (
              users            
              .filter((user) => user !== username) // Evita mostrarte a ti mismo
              .map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))
            ) : (
              <option disabled>No hay usuarios conectados</option>
            )}
          </select>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.from === username ? "sent" : "received"
                }`}
              >
                <strong>{msg.from}</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage} disabled={!selectedUser}>
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
