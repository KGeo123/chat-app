import { useContext } from 'react';
import AuthCtx from 'store/authContext';

function useAuth() {
  return useContext(AuthCtx);
}

export default useAuth;
