import React from "React";
import { connect } from "react-redux";
import { userActions, alertActions } from "../_actions";
import { Link } from "react-router-dom";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: this.props.user.id,
        email: "",
        region: this.props.user.region,
        password: "",
        summonerName: "",
        followedPlayers: null
      }
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.clear();
  }

  handleOnChange(e) {
    e.preventDefault();
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    console.log("Steitas", this.state.user);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;
    user.followedPlayers = this.props.user.followedPlayers;

    this.props.update(user, true);
    console.log("AA");
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Settings</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleOnChange}
            />
            {submitted && !user.email && (
              <div className="help-block">Email is required </div>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <label type="text" className="form-control" name="username">
              {this.props.user.username}
            </label>
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">New password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="text">New Summoner name</label>
            <input
              className="form-control"
              name="summonerName"
              placeholder="Summoner Name"
              type="text"
              value={user.summonerName}
              onChange={this.handleOnChange}
            ></input>
          </div>
          <div>
            <label htmlFor="text">Select region</label>
            <select name="region" onChange={this.handleOnChange} id="region">
              <option selected={this.props.user.region == "EUW1" ? "selected" : ""} value="EUW1">EUW</option>
              <option selected={this.props.user.region == "EUN1" ? "selected" : ""} value="EUN1">EUNE</option>
              <option selected={this.props.user.region == "NA1" ? "selected" : ""} value="NA1">NA</option>
              <option selected={this.props.user.region == "KR" ? "selected" : ""} value="KR">KR</option>
            </select>
          </div>
          <div className="form-group">
            <button className="button-for-register-login button1">
              Submit changes
            </button>

            <Link to="/" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
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
  update: userActions.update,
  clear: alertActions.clear
};

const SettingsConnect = connect(mapStateToProps, actionCreators)(Settings);

export default connect(mapStateToProps, actionCreators)(Settings);
