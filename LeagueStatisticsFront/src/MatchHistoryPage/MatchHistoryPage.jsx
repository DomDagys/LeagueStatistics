import React from "react";
import { matchService } from "../_services/match.service";
import { MatchHistoryItem } from "./MatchHistoryItem";
import "./MatchHistoryPage.css";
import "../styles/ProfilePage.css";
import { store } from "../_helpers";
import { summonerService } from "../_services";
import { alertActions } from "../_actions/alert.actions";
import { connect } from "react-redux";
import queryString from "query-string";
import "../styles/SpectatorError.css";
class MatchHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      data: {
        data: [],
      },
      searchedSummoner: store.getState().authentication.user.summonerName,
      region: store.getState().authentication.user.region,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.props.clear();
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    this.state.searchedSummoner = queryParams.summoner;
    this.state.region = queryParams.region;
    var promise0 = matchService.getMatches(
      this.state.searchedSummoner,
      this.state.region,
      10,
      0
    );
    promise0
      .then((response) => {
        if (!response.ok) {
          this.setState({ error: response });
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ matches: data });
      });
    var url =
      "http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json";
    var promise1 = fetch(url);
    promise1
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          data: data.data,
        });
      });

    var url =
      "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/data/en_US/summoner.json";
    var promise2 = fetch(url);
    promise2
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          data1: data.data,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    let summonerName = this.state.searchedSummoner;
    let region = this.state.region;
    this.props.history.push(
      `/match_history?summoner=${summonerName}&region=${region}`
    );
    summonerService
      .getSummonerData(summonerName, region)
      .catch((message) => this.props.error(message))
      .then((x) => {
        console.log("TEST");
        var promise0 = matchService.getMatches(
          this.state.searchedSummoner,
          this.state.region,
          10,
          0
        );
        promise0
          .then((response) => {
            if (!response.ok) {
              this.setState({ error: response });
            }
            return response.json();
          })
          .then((data) => {
            this.setState({ matches: data });
            console.log(this.state);
          });
      });
  }

  render() {
    console.log("From MHP", this.state.matches.length);
    if (this.state.error != "")
      return (
        <div className="summonerSearchBox">
          <div className="divas">
            <h1>
              Could not find matches for summoner: {this.state.searchedSummoner}
            </h1>
            <h2>Try to change summoner name or region!</h2>
          </div>
          <div className="summonerSearchBox">
            <h1>League statistics</h1>
            <input
              type="text"
              placeholder="Search Summoner"
              value={this.state.searchedSummoner}
              name="searchedSummoner"
              onChange={this.handleChange}
              className="searchBar"
            ></input>
            <select
              className="regionList"
              name="region"
              value={this.state.region}
              onChange={this.handleChange}
              id="region"
            >
              <option value="EUN1">EUNE</option>
              <option value="EUW1">EUW</option>
              <option value="NA1">NA</option>
              <option value="KR">KR</option>
            </select>
            <button onClick={this.handleClick} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      );
    return (
      <div>
        <div className="summonerSearchBox">
          <h1>League statistics</h1>
          <input
            type="text"
            placeholder="Search Summoner"
            value={this.state.searchedSummoner}
            name="searchedSummoner"
            onChange={this.handleChange}
            className="searchBar"
          ></input>
          <select
            className="regionList"
            name="region"
            value={this.state.region}
            onChange={this.handleChange}
            id="region"
          >
            <option value="EUN1">EUNE</option>
            <option value="EUW1">EUW</option>
            <option value="NA1">NA</option>
            <option value="KR">KR</option>
          </select>
          <button onClick={this.handleClick} className="btn btn-primary">
            Search
          </button>
        </div>

        {this.state.matches.length == 0 ? (
          <div className="Loading">
            <div>Loading...</div>
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </div>
        ) : (
          this.state.matches.map((match) => (
            <div className="match">
              <MatchHistoryItem
                match={match}
                key={match.gameId}
                data={this.state.data}
                data1={this.state.data1}
              />
            </div>
          ))
        )}

        <div>
          {this.state.matches.map((match) => (
            <div className="match">
              <MatchHistoryItem
                match={match}
                key={match.gameId}
                data={this.state.data}
                data1={this.state.data1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const actionCreators = {
  clear: alertActions.clear,
};

const connectedMatchHistoryPage = connect(
  mapStateToProps,
  actionCreators
)(MatchHistoryPage);
export { connectedMatchHistoryPage as MatchHistoryPage };
