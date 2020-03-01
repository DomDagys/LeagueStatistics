import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { NavigationBar } from "../Navigation";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.username}!</h1>
        <p>LOL</p>
        <h3>Users are very secure ;)</h3>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
