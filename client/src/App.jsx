import { useState, useEffect } from 'react';
import './App.css';
import MessageWindow from './MessageWindow';
import TextBar from './TextBar';
import { registerOnMessageCallback, send } from './websocket';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const onMessageReceived = (msg) => {
      msg = JSON.parse(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    registerOnMessageCallback(onMessageReceived);
  }, []);

  const setUserName = (name) => {
    setUsername(name);
  };

  const sendMessage = (text) => {
    const message = {
      username: username,
      text: text,
    };
    send(JSON.stringify(message));
  };

  if (username === null) {
    return (
      <div className="container">
        <div className="container-title">Enter username</div>
        <TextBar onSend={setUserName} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container-title">Messages</div>
      <MessageWindow messages={messages} username={username} />
      <TextBar onSend={sendMessage} />
    </div>
  );
};

export default App;
