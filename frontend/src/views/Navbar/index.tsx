import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../types';
import { Dispatch, bindActionCreators } from 'redux';
import { logout } from 'src/actions/auth';

class Navbar extends React.Component<any> {
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
              <Link to="/budget"
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
                <Link to="/budget/transactions" className="dropdown-item">
                  Transactions
                </Link>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <div className="my-2 my-lg-0">
            {this.props.currentUser && (
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
