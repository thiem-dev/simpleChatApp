import { useEffect, useRef } from 'react';
import './MessageWindow.css';

// The message component takes the message text and the username of the message
// sender. It also takes `self` - a boolean value depicting whether the message
// is sent by the current logged in user
const Message = ({ text, username, self }) => (
  <div className={'message' + (self ? ' message-self' : '')}>
    <div className="message-username">{username}</div>
    <div className="message-text">{text}</div>
  </div>
);

const MessageWindow = ({ messages = [], username }) => {
  const messageWindow = useRef();

  useEffect(() => {
    // Autoscrolling logic when component updates
    messageWindow.current.scrollTop =
      messageWindow.current.scrollHeight - messageWindow.current.clientHeight;
  }, [messages]);

  return (
    <div className="message-window" ref={messageWindow}>
      {messages.map((msg, i) => (
        <Message
          key={i}
          text={msg.text}
          username={msg.username}
          self={username === msg.username}
        />
      ))}
    </div>
  );
};

export default MessageWindow;
