import * as React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Nav } from './style';
import { StoreState } from '../../types';

class Navbar extends React.Component {
  render() {
    return <Nav>{this.props.children}</Nav>;
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    currentUser: state.currentUser,
  };
};
export default connect(mapStateToProps)(Navbar);
