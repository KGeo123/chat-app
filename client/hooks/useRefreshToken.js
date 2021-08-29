import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function useRefreshToken() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [shouldDisplayContent, setShouldDisplayContent] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const refreshTokenUrl = 'http://localhost:5000/auth/refresh-token';
        const response = await fetch(refreshTokenUrl, {
          credentials: 'include'
        });
        console.log(response);
        if (response.status === 401) {
          setShouldDisplayContent(true);
          return router.push('/signup');
        }
        // todo: this may change
        const { accessToken, userData } = await response.json();
        const { email, userId, username } = userData;
        setUser({ accessToken, email, userId, username });
        setShouldDisplayContent(true);
        router.replace('/chat-room');
      } catch (error) {
        router.replace('/signup');
      }
    };
    fetchUser();
  }, []);

  return { user, shouldDisplayContent, setUser };
}
