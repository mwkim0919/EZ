import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StoreState } from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { logout } from 'src/actions/auth';
import { Button } from 'src/components/Button';

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  width: 128px;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  background-color: rgb(7, 71, 166);
`;

const NavLink = (props: any) => {
  return (
    <div>
      <Link to={props.to}>{props.children}</Link>
    </div>
  );
};

class Navbar extends React.Component<any> {
  render() {
    return (
      <Nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/budget">Budget</NavLink>
        <NavLink to="/planner">Planner</NavLink>
        <NavLink to="/todo">Todo</NavLink>
        {this.props.currentUser && (
          <div onClick={this.props.logout}>
            <Button color="red">Logout</Button>
          </div>
        )}
      </Nav>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
