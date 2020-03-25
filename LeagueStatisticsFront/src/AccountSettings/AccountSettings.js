import React from "React";
import { connect } from "react-redux";
import { userActions } from "../_actions";
// BUTU GERAI JEI KAZKAS SITA DAMUSTU NES MAN PIZDA :)
// - D.K

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "xxxx",
      region: "xxxx",
      aboutMe: "xxxx",
      password: "xxxx",
      summonerName: "xxxx"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("test");
    console.log(this.props);
    this.setState({ email: this.props.user.email });
  }

  handleChange(e) {}

  handleSubmit(e) {
    e.preventDefault();
    console.log("Hellp me " + this.state.email);
    const { dispatch } = this.props;
    if (true) {
      const { user } = {
        email: "test",
        password: "test",
        summonerName: "test",
        region: "test",
        aboutMe: "test",
        id: 3
      };
      dispatch(userActions.update(user));
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <form name="form" onSubmit={this.handleSubmit}>
          <label>User Name</label>
          <p>{user.username}</p>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={this.handleChange}
          />
          <button type="submit">Submit changes</button>
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

const SettingsConnect = connect(mapStateToProps)(Settings);

export default connect(mapStateToProps)(Settings);
