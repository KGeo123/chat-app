import React from 'react';

function Messages({ user, messages }) {
  return (
    <div>
      {messages.map((message) => (
        <div>message</div>
      ))}
    </div>
  );
}

export default Messages;
