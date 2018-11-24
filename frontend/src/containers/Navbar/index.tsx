import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, CurrentUser } from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { logout } from 'src/actions/auth';

interface NavbarProps {
  currentUser: CurrentUser;
  logout: () => void;
}

class Navbar extends React.Component<NavbarProps> {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          EZ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to="/budget" className="nav-link">
                Budget
              </Link>
            </li> */}
            <li className="nav-item dropdown">
              <Link
                to="/budget"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Budget
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/budget" className="dropdown-item">
                  Home
                </Link>

                <div className="dropdown-divider" />
                <Link to="/budget/transactions" className="dropdown-item">
                  Transaction
                </Link>
                <div className="dropdown-divider" />
                <Link to="/budget/schedules" className="dropdown-item">
                  Transaction Schedule
                </Link>
                <div className="dropdown-divider" />
                <Link to="/budget/categories" className="dropdown-item">
                  Category
                </Link>
              </div>
            </li>
          </ul>
          <div className="my-2 my-lg-0">
            {this.props.currentUser.email && (
              <div onClick={this.props.logout}>
                <button className="" color="red">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
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
