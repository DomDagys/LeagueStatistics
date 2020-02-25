import React from 'react';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }


  render(){
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit=>
          <input value={this.state.username} type="username" required placeholder="Enter user name"/>
          <input type="pasword" required placeholder="Enter pasword"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default LoginForm;
