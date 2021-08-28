import useAuth from 'hooks/useAuth';
import React from 'react';
import { useRouter } from 'next/dist/client/router';

function ChatRoom() {
  const { user } = useAuth();
	console.log(user);
	const router = useRouter();
  if (!user) router.replace('/signup');

  return <div></div>;
}

export default ChatRoom;
