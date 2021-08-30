import React, { useRef } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import fetchProtected from 'lib/fetchProtected';
import useAuth from 'hooks/useAuth';

function AddMessageTextBox({ user }) {
  const inputRef = useRef();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { newToken } = await fetchProtected(
      'http://localhost:5000/messages/new-message',
      user.accessToken,
      {
        method: 'POST',
        body: JSON.stringify({
          value: inputRef.current.value,
          senderId: user.userId
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (newToken) {
      auth.setUser({ ...auth.user, accessToken: newToken });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="your message" />
      <button type="submit">
        <BsFillPlayFill />
      </button>
    </form>
  );
}

export default AddMessageTextBox;
