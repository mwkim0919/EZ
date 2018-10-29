import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { signUp } from 'src/actions/auth';
import { Button } from 'src/components/Button';
import { AppState } from '../types';

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

class SignUp extends React.Component<any> {
  // TODO: Display ajax error message...
  render() {
    // console.log('This props ', this.props);
    const { loading, error } = this.props.auth;
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

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <h1>Sign up form</h1>
        {error && <div>Error: {error}</div>}
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
                      <div>
                        <label htmlFor="">Email</label>
                        <input type="text" {...field} placeholder="Email" />
                        {form.touched.email &&
                          form.errors.email &&
                          form.errors.email}
                      </div>
                    );
                  }}
                />
                <Field
                  name="password"
                  render={({ field, form }: FieldProps<SignUpFormValues>) => {
                    return (
                      <div>
                        <label htmlFor="">Password</label>
                        <input
                          type="password"
                          {...field}
                          placeholder="Password"
                        />
                        {form.touched.password &&
                          form.errors.password &&
                          form.errors.password}
                      </div>
                    );
                  }}
                />
                <Field
                  name="passwordConfirm"
                  render={({ field, form }: FieldProps<SignUpFormValues>) => {
                    return (
                      <div>
                        <label htmlFor="">Confirm Password</label>
                        <input
                          type="password"
                          {...field}
                          placeholder="Confirm Password"
                        />
                        {form.touched.passwordConfirm &&
                          form.errors.passwordConfirm &&
                          form.errors.passwordConfirm}
                      </div>
                    );
                  }}
                />
                <Button type="submit">Sign up</Button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      signUp,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
