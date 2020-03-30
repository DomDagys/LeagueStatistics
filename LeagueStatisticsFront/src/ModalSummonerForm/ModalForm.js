import React from "react";
import { ModalDialog, Modal, Button, Form } from "react-bootstrap";
import "../styles/summonerName.css";
import { userActions, summonerActions } from "../_actions";
import { connect } from "react-redux";
import { userService } from "../_services/user.service";
import { history } from "../_helpers";
class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      summonerName: "",
      region: "",
      token: "",
      username: "",
      id: null
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props) {
      Object.assign(this.state, {
        email: this.props.user.email,
        id: this.props.user.id,
        username: this.props.user.username,
        token: this.props.user.token,
        aboutMe: ""
      });
    }
  }

  handleOnChange(e) {
    const { name, value } = event.target;
    const { user } = this.state;
    console.log(this.state);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;

    //this.props.getSummonerData(user.summonerName, 'EUW1');
    //const summonerName = localStorage.getItem("summonerName");

    //if (summonerName === null)
    //return;

    this.props.update(user);
    history.push("/");
    window.location.reload(true);
  }

  render() {
    console.log("This state" + this.state.email);

    return (
      <div className="col-sm-4  col-sm-offset-3 ">
        <p>
          Before you can access our website specify your League's Summoner name
          and Region!
        </p>
        <form onSubmit={this.handleSubmit} name="form">
          <input
            className="inputas"
            placeholder="Summoner Name"
            type="text"
            name="summonerName"
            value={this.state.summonerName}
            onChange={this.handleOnChange}
          ></input>
          <select
            name="region"
            value={this.state.region}
            onChange={this.handleOnChange}
            id="region"
          >
            <option value="eune">EUNE</option>
            <option value="euw">EUW</option>
            <option value="na">NA</option>
            <option value="kr">KR</option>
          </select>
          <input type="submit"></input>
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
    users,
  };
}

const actionCreators = {
  update: userActions.update,
  getSummonerData: summonerActions.getSummonerData
};

const connectedUpdatePage = connect(mapStateToProps, actionCreators)(ModalForm);
export { connectedUpdatePage as ModalForm };
