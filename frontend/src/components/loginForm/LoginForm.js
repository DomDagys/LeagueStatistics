import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            value={this.state.username}
            type="username"
            required
            placeholder="Enter user name"
            onChange={this.handleChange}
          />
          <input
            type="pasword"
            required
            placeholder="Enter pasword"
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
