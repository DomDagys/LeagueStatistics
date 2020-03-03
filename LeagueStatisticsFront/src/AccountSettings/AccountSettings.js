import React from "React";
import { connect } from "react-redux";

// BUTU GERAI JEI KAZKAS SITA DAMUSTU NES MAN PIZDA :)
// - D.K

class Settings extends React.Component {
  handleChange(e){

    console.log(e.target.value);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <form name="form">
          <label>User Name</label>
          <p>{user.username}</p>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
          />
          <label>Region</label>
          <input
            type="text"
            name="region"
          />
          <label>AboutMe</label>
          <input
            type="text"
            name="aboutme"
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={user.token}
          />
          <lable>SummonerName</lable>
          <input
            type="text"
            name="summonerName"
          />

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
