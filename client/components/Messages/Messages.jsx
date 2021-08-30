import React from 'react';

function Messages({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>{message.value}</div>
      ))}
    </div>
  );
}

export default Messages;
