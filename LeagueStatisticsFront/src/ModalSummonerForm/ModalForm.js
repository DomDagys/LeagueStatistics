import React from "react";
import { ModalDialog, Modal, Button, Form } from "react-bootstrap";
import "../styles/summonerName.css";
import { userActions } from "../_actions";
import { connect } from "react-redux";
class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      dateOfBirth: "",
      summonerName: "",
      region: ""
    };

    this.updateState = this.updateState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateState(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state.summonerName);
  }

  submitForm(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);

    console.log(user);
  }

  render() {
    const { user } = this.props;

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
            value={this.props.summonerName}
            onChange={this.updateState}
          ></input>
          <select
            name="region"
            value={this.props.region}
            onChange={this.updateState}
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

const actionCreators = {
  update: userActions.update
};

const connectedRegisterPage = connect(actionCreators)(ModalForm);
export default ModalForm;
