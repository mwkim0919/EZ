import * as React from 'react';
import { connect } from 'react-redux';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { signUp, AuthenticationInput } from 'src/actions/auth';
import { Button } from 'src/components/Button';
import { AppState } from '../types';
import { push } from 'connected-react-router';

interface Props {
  signUp: (input: AuthenticationInput) => void;
  push: (url: string) => void;
}

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required(),
  password: Yup.string().required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required(),
});

class SignUp extends React.Component<Props> {
  // TODO: Display ajax error message...
  render() {
    return (
      <div className="auth-container">
        <div className="auth-form__text-box">
          <h1 className="header">SIGN UP</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirm: '',
            }}
            onSubmit={(values: SignUpFormValues) => {
              // alert(JSON.stringify(values));
              console.log('SignUp Submit : ', values);
              const { email, password } = values;
              this.props.signUp({ email, password });
            }}
            validationSchema={signUpValidationSchema}
            render={(formikBag: FormikProps<SignUpFormValues>) => {
              // console.log('FormikBag ', formikBag);
              return (
                <Form>
                  <Field
                    name="email"
                    render={(formikProps: FieldProps<SignUpFormValues>) => {
                      // console.log('FormikProps ', formikProps);
                      const { field, form } = formikProps;
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
                    render={({ field, form }: FieldProps<SignUpFormValues>) => {
                      return (
                        <div className="auth-form__input-box">
                          <input
                            className="auth-form__input"
                            type="password"
                            {...field}
                            placeholder="Password"
                          />
                          <div className="auth-form__error">
                            {form.touched.password &&
                              '*' + form.errors.password &&
                              '*' + form.errors.password}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Field
                    name="passwordConfirm"
                    render={({ field, form }: FieldProps<SignUpFormValues>) => {
                      return (
                        <div className="auth-form__input-box">
                          <input
                            className="auth-form__input"
                            type="password"
                            {...field}
                            placeholder="Confirm Password"
                          />
                          <div className="auth-form__error">
                            {form.touched.passwordConfirm &&
                              '*' + form.errors.passwordConfirm &&
                              '*' + form.errors.passwordConfirm}
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
                      this.props.push('/');
                    }}
                    color="green"
                  >
                    > LOG IN
                  </button>
                  <button className="btn auth-form__btn--blue" type="submit">
                    SIGN UP
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
  signUp,
  push,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
