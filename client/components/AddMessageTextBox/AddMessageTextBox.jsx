import React, { useRef, useEffect } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import useAuth from 'hooks/useAuth';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { messagesActions } from 'redux/messages';
import { uuid } from 'uuidv4';

const socket = io('http://localhost:5000');

function AddMessageTextBox({ user }) {
  const inputRef = useRef();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('add-message', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
  }, [socket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      value: inputRef.current.value,
      senderId: user.userId
    };
    dispatch(messagesActions.addMessage({ ...message, id: uuid() }));
    socket.emit('new-message', message);
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
