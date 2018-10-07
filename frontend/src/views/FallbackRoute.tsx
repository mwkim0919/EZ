import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../types';

// This is the component that determines at render time what to do
const Switch = (props: any) => {
  const { Component, FallbackComponent, currentUser, ...rest } = props;
  // TODO: Checking the existence of accessToken isn't enough
  if (!currentUser || !Component) {
    return <FallbackComponent {...rest} />;
  } else {
    return <Component {...rest} />;
  }
};

const ConnectedSwitch = connect((state: StoreState) => ({
  currentUser: state.auth.currentUser,
}))(Switch);

// If user isn't signed in, we will render FallbackComponent, otherwise, the first one.
const getFallbackComponent = (
  Component: React.ComponentClass,
  FallbackComponent: React.ComponentClass
) => {
  return (props: { auth: any }) => (
    <ConnectedSwitch
      {...props}
      FallbackComponent={FallbackComponent}
      Component={Component}
    />
  );
};

export default getFallbackComponent;
