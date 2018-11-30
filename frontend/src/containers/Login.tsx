import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { AppState, CurrentUser } from '../types';
import { login } from '../actions/auth';
import { Button } from '../components/Button';
import { push, ConnectedRouterProps } from 'connected-react-router';

interface LoginFormValues {
  email: string;
  password: string;
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required(),
  password: Yup.string(),
});

interface Props {
  currentUser: CurrentUser;
  login: ({ email, password }: LoginFormValues) => void;
  push: (url: string) => void;
}

class Login extends React.Component<Props> {
  render() {
    const { currentUser } = this.props;

    // User is already signed in, redirect to Dashboard
    if (currentUser.email) {
      return <Redirect to="/" />;
    }
    // TODO: Create generic loading container
    const Loading = () => {
      return <div>Loading...</div>;
    };
    // TODO: Create generic error message container
    // const Error = (props: any) => {
    //   return (
    //     <div>
    //       <h6>Error</h6>
    //       <div>Message: {props.children}</div>
    //     </div>
    //   );
    // };

    // if (loading) {
    //   return <Loading />;
    // }

    return (
      // <div className="container">
      <div className="auth-container">
        <div className="auth-form__text-box">
          <h1 className="header">LOG IN</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirm: '',
            }}
            onSubmit={(values: LoginFormValues) => {
              const { email, password } = values;
              console.log('Login Submit');
              this.props.login({ email, password });
            }}
            validationSchema={loginValidationSchema}
            render={(formikBag: FormikProps<LoginFormValues>) => {
              return (
                <Form>
                  <Field
                    name="email"
                    render={(formikProps: FieldProps<LoginFormValues>) => {
                      const { field, form } = formikProps;
                      // @ts-ginore
                      return (
                        <div className="auth-form__input-box">
                          <input
                            type="text"
                            {...field}
                            className="auth-form__input"
                            placeholder="Email"
                          />
                          <div className="auth-form__error">
                            {form.touched.email &&
                              '*' + form.errors.email &&
                              '*' + form.errors.email}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Field
                    name="password"
                    render={({ field, form }: FieldProps<LoginFormValues>) => {
                      return (
                        <div>
                          <input
                            className="auth-form__input"
                            type="password"
                            {...field}
                            placeholder="Password"
                          />
                          <div className="auth-form__error">
                            {form.touched.password &&
                              form.errors.password &&
                              form.errors.password}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <hr style={{ backgroundColor: 'white', marginTop: '20px' }} />
                  <button
                    className="btn auth-form__btn--green"
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      this.props.push('/signup');
                    }}
                    color="green"
                  >
                    > SIGN UP
                  </button>
                  <button type="submit" className="btn auth-form__btn--blue">
                    LOG IN
                  </button>
                </Form>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = {
  login,
  push,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
