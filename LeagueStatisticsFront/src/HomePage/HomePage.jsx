import React from "react";
import { connect } from "react-redux";
import { history, store } from "../_helpers";
import { userService } from "../_services";
import "../styles/button.css";
import '../styles/FollowedPlayer.css';
import { userActions } from "../_actions/user.actions";
import { ModalForm } from "../ModalSummonerForm/ModalForm";
import { Link } from "react-router-dom";
import { alertActions } from "../_actions";
import FollowedPlayerItem from "../_components/FollowedPlayerItem";

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
    this.props.clear();
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

  handleRemove(e) {

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
        <div className="followedList">
          <h3>Followed Players</h3>
          {this.props.user.followedPlayers.map(player => {
            return (<div className="followedPlayerItem" >
              <FollowedPlayerItem
                {...player}
                user={this.props.user}
                update={this.props.update}></FollowedPlayerItem>
            </div>)
          })}
        </div>
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
  getUserById: userActions.getUserById,
  clear: alertActions.clear,
  update: userActions.update
};

const connectedHomePage = connect(mapStateToProps, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
