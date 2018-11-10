import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types';

// This is the component that determines at render time what to do
// tslint:disable-next-line
const Switch = (props: any) => {
  const { Component, FallbackComponent, currentUser, ...rest } = props;
  if (!currentUser.email || !Component) {
    return <FallbackComponent {...rest} />;
  } else {
    return <Component {...rest} />;
  }
};

const ConnectedSwitch = connect((state: AppState) => ({
  currentUser: state.currentUser,
}))(Switch);

// If user isn't signed in, we will render FallbackComponent, otherwise, the first one.
const getFallbackComponent = (
  Component: React.ComponentClass,
  FallbackComponent: React.ComponentClass
) => {
  // tslint:disable-next-line
  return (props: any) => (
    <ConnectedSwitch
      {...props}
      FallbackComponent={FallbackComponent}
      Component={Component}
    />
  );
};

export default getFallbackComponent;
