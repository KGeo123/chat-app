import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Form from '@/components/shared/Form';
import Field from '@/components/shared/Field';
import Logo from '@/components/shared/Logo';
import { Formik, ErrorMessage } from 'formik';
import Button from '@/components/shared/Button';
import FieldContainer from '@/components/shared/FieldContainer';
import signUpValidationSchema from 'validationSchemas/signUp';
import ErrorText from '@/components/shared/ErrorText';
import { useRouter } from 'next/dist/client/router';

function SignUp() {
  const { user, setUser } = useAuth();
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  useEffect(() => {
    setTimeout(() => setServerError(''), 5000);
  }, [serverError]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const { email, password, username } = values;
        try {
          const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, username }),
            headers: { 'Content-Type': 'application/json' }
          });
          if (response.status === 409) {
            setServerError(
              'the specified email is already in use in another account'
            );
            return;
          }
          const data = await response.json();
          setUser(data.user);
          actions.setSubmitting(false);
          router.replace('/');
        } catch (error) {
          // todo: redirect to error page
          console.log(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Logo />
          <FieldContainer>
            <Field placeholder="email" type="text" name="email" />
            <ErrorMessage name="email">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Field placeholder="username" type="text" name="username" />
            <ErrorMessage name="username">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Field placeholder="password" type="text" name="password" />
            <ErrorMessage name="password">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
          </FieldContainer>
          <FieldContainer>
            <Field
              placeholder="confirm password"
              type="text"
              name="confirmPassword"
            />
            <ErrorMessage name="confirmPassword">
              {(error) => <ErrorText>{error}</ErrorText>}
            </ErrorMessage>
            {serverError && <ErrorText>{serverError}</ErrorText>}
            {isSubmitting && <p>loading...</p>}
          </FieldContainer>
          <Button disabled={isSubmitting} type="submit">
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
