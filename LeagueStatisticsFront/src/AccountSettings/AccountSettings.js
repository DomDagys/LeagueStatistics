import React from "React";
import { connect } from "react-redux";

// BUTU GERAI JEI KAZKAS SITA DAMUSTU NES MAN PIZDA :)
// - D.K

class Settings extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="container">
          <h1>Your name: {user.username}</h1>
          <h1>Your email: {user.email}</h1>
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

const SettingsConnect = connect(mapStateToProps)(Settings);

export default connect(mapStateToProps)(Settings);
