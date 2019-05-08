import React from 'react';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { string, object } from 'yup';
import styled from 'styled-components';

import Store from '../store/store';
import logo from '../res/logo.svg';
import theme from '../theme';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  > * {
    width: 100%;
    max-width: 20rem;
  }

  background: ${theme.palette.common.white};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 14rem;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin: 1rem 0 0 0;
  }

  > button {
    margin: 2rem 0 0 0;
  }
`;

const schema = object().shape({
  name: string().required(),
  password: string().required(),
});

const Login = () => {
  const store = Store.useStore();

  const isSubmitting = !!store.get('credentials') && !store.get('initialized');

  return (
    <LoginWrapper>
      <Formik
        initialValues={{ name: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          store.set('credentials')(values);
        }}
        render={({ submitForm }) => (
          <Form>
            <Logo>
              <img src={logo} alt="Logo GreenRPi" />
            </Logo>
            <FieldsWrapper>
              <Field
                name="name"
                type="text"
                label="Name"
                component={TextField}
              />
              <Field
                type="password"
                label="Password"
                name="password"
                component={TextField}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {isSubmitting ? 'Authenticating...' : 'Authenticate'}
              </Button>
            </FieldsWrapper>
          </Form>
        )}
      />
    </LoginWrapper>
  );
};

export default Login;
