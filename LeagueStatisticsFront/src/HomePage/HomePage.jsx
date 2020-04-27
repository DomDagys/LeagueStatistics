import React from "react";
import { connect } from "react-redux";
import { history, store } from "../_helpers";
import { userService } from "../_services";
import "../styles/button.css";
import { userActions } from "../_actions/user.actions";
import { ModalForm } from "../ModalSummonerForm/ModalForm";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        summonerName: "",
        region: ""
      }
    };
    this.props.getUserById(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.summonerName == null)
      history.push("/update");

    let new_obj = Object.assign(
      {},
      ...this.state.user,
      nextProps.users.userInfo
    );
    this.setState(new_obj);
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  render() {
    let user = this.state;

    return (
      <div className="col-md-8 col-md-offset-3">
        <h1>Hi {user.username} </h1>
        <h2>
          SummonerName: {user.summonerName}{" "}
          <Link to="/update" className="color red">
            Want to change? Click
            </Link>
        </h2>
        <p>LOL</p>

        <h3>Users are very secure ;)</h3>
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

const actionCreators = {
  getUserById: userActions.getUserById
};

const connectedHomePage = connect(mapStateToProps, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
