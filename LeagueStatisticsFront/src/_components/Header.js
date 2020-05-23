import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/App.css";
import { history } from "../_helpers";

class Header extends React.Component {
  render() {
    return (
      <div>
        <LoggedInView {...this.props.user} />
      </div>
    );
  }
}

const LoggedInView = props => {
  if (props.username) {
    return (
      <div className="right">
        <ul>
          <li>
            <a className="active" href="/">
              Home
            </a>
          </li>
          <li>
            <a href="/settings">Account settings</a>
          </li>
          <li>
            {props.summonerName ? <a href={`/profile?summoner=${props.summonerName}&region=${props.region}`}>Profile</a> : ""}
          </li>
          <li>{props.summonerName ? <a href={`/match_history?summoner=${props.summonerName}&region=${props.region}`}>Match History</a> : ""}</li>
          <li>
            <button
              className="button-for-logout button"
              onClick={() => (
                localStorage.removeItem("user"), history.push("/login")
              )}
            >
              Logout
            </button>
          </li>
          <li>
            <label>hi</label>
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;

  return {
    user,
    users
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };
