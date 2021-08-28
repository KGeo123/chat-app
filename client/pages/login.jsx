import { ErrorMessage, Formik } from 'formik';
import Form from '@/components/shared/Form';
import React from 'react';
import Field from '@/components/shared/Field';
import Button from '@/components/shared/Button';
import FieldContainer from '@/components/shared/FieldContainer';
import ErrorText from '@/components/shared/ErrorText';
import loginSchema from 'validationSchemas/login';
import Logo from '@/components/shared/Logo';
import useServerError from 'hooks/useServerError';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/dist/client/router';
import jwt from 'jsonwebtoken';

function Login() {
  const [serverError, setServerError] = useServerError();
  const { user, setUser } = useAuth();
  const router = useRouter();

  return (
    <Formik
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        try {
          const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 401) {
            throw new Error('email or password is incorrect');
          }
          const { accessToken } = await response.json();
          const { email, userId, username } = jwt.decode(accessToken);
          setUser({ email, userId, username, accessToken });
          actions.setSubmitting(false);
          router.replace('/chat-room');
        } catch (error) {
          setServerError(error.message);
        }
      }}
      validationSchema={loginSchema}
      initialValues={{ email: '', password: '' }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Logo />
          <FieldContainer>
            <Field placeholder="email" name="email" />
            <ErrorMessage name="email">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Field placeholder="password" name="password" />
            <ErrorMessage name="password">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
            {serverError && <ErrorText>{serverError}</ErrorText>}
            {isSubmitting && <p>loading...</p>}
          </FieldContainer>
          <Button disabled={isSubmitting} type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
