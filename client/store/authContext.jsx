import React from 'react';
import useRefreshToken from 'hooks/useRefreshToken';

const AuthCtx = React.createContext({
  email: '',
  username: '',
  userId: '',
  accessToken: ''
});

export function AuthProvider({ children }) {
  const { user, shouldDisplayContent, setUser } = useRefreshToken();

  return (
    <AuthCtx.Provider value={{ user, setUser }}>
      {/* todo: later replace this with a loading spinner */}
      {shouldDisplayContent ? children : 'loading...'}
    </AuthCtx.Provider>
  );
}

export default AuthCtx;
