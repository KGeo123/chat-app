import React from 'react';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const { user, setUser } = useAuth();

  return (
    <form
      onSubmit={async () => {
        try {
          const response = await fetch('http://localhost:5000/auth/signup');
          const user = await response.json();
          console.log(user);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <input type="text" name="email" />
      <input type="text" name="username" />
      <input type="text" name="password" />
    </form>
  );
}

export default SignUp;
