import React from "react";
import { connect } from "react-redux";
import { history, store } from "../_helpers";
import { userService } from "../_services";
import "../styles/button.css";
import { userActions } from "../_actions/user.actions";
import { ModalForm } from "../ModalSummonerForm/ModalForm";

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
    if (user.summonerName != null) {
      return (
        <div className="col-md-8 col-md-offset-3">
          <h1>Hi {user.username} </h1>
          <h2>
            SummonerName: {user.summonerName}{" "}
            <a href="/update" className="color red">
              Want to change? Click
            </a>
          </h2>
          <p>LOL</p>

          <h3>Users are very secure ;)</h3>
        </div>
      );
    } else {
      return <ModalForm />;
    }
  }
}

function mapStateToProps(state) {
  const { users, authentication, settings } = state;
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
