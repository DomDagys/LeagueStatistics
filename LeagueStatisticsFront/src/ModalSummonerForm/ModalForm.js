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
      summonerName: "",
      region: ""
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
      console.log(this.state);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    console.log(this.props);
    if (this.props) {
      Object.assign(this.state, {
        email: this.props.email,
        username: this.props.username
      });
    }
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
            value={this.state.summonerName}
            onChange={this.updateState("summonerName")}
          ></input>
          <select
            name="region"
            value={this.state.region}
            onChange={this.updateState("region")}
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
