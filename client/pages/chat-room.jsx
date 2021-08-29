import useAuth from 'hooks/useAuth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Messages from '@/components/Messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { messagesActions } from 'redux/messages';
import fetchProtected from 'lib/fetchProtected';

function ChatRoom() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  if (!user) router.replace('/signup');

  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      const { newToken, data } = await fetchProtected(
        'http://localhost:5000/messages/all-messages',
        user.accessToken
      );
      if (newToken) {
        setUser({ ...user, accessToken: newToken });
      }
      dispatch(messagesActions.setMessages(data.messages));
    };
    getMessages();
  }, []);

  return (
    <>
      <Messages user={user} messages={messages} />
      {/* <AddMessageTextBox /> */}
    </>
  );
}

export default ChatRoom;
