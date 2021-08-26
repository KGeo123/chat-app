import React from 'react';
import useAuth from '../hooks/useAuth';
import Form from '@/components/shared/Form';
import Field from '@/components/shared/Field';
import Logo from '@/components/shared/Logo';
import { Formik } from 'formik';
import Button from '@/components/shared/Button';
import FieldContainer from '@/components/shared/FieldContainer';

function SignUp() {
  const { user, setUser } = useAuth();

  return (
    <Formik>
      <Form>
        <Logo />
        <FieldContainer>
          <Field placeHolder="your email" type="text" name="email" />
        </FieldContainer>
        <FieldContainer>
          <Field placeHolder="password" type="text" name="username" />
        </FieldContainer>
        <FieldContainer>
          <Field placeHolder="confirm password" type="text" name="password" />
        </FieldContainer>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Formik>
  );
}

export default SignUp;
