import React from 'react';
import { matchService } from "../_services/match.service";
import { MatchHistoryItem } from "./MatchHistoryItem";
import "./MatchHistoryPage.css";
import "../styles/ProfilePage.css";
import { store } from "../_helpers";
import { summonerService } from "../_services"
import { alertActions } from '../_actions/alert.actions';
import { connect } from 'react-redux';

class MatchHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      data: {
        data: []
      },
      searchedSummoner: store.getState().authentication.user.summonerName,
      region: store.getState().authentication.user.region,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.props.clear();
  }

  componentDidMount() {
    var promise0 = matchService.getMatches(this.state.searchedSummoner, this.state.region, 10, 0);
    promise0.then(response => response.json())
      .then(data => {
        this.setState({ matches: data });
      });
    var url = "http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json";
    var promise1 = fetch(url);
    promise1.then(response => response.json())
      .then(data => {
        this.setState({
          ... this.state,
          data: data.data
        });
      });

    var url = "http://ddragon.leagueoflegends.com/cdn/10.10.3208608/data/en_US/summoner.json";
    var promise2 = fetch(url);
    promise2.then(response => response.json())
      .then(data => {
        this.setState({
          ... this.state,
          data1: data.data
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    let summonerName = this.state.searchedSummoner;
    let region = this.state.region;

    summonerService.getSummonerData(summonerName, region)
      .catch(message => this.props.error(message))
      .then(x => {
        console.log("TEST");
        var promise0 = matchService.getMatches(this.state.searchedSummoner, this.state.region, 10, 0);
        promise0
          .then(response => response.json())
          .then(data => {
            this.setState({ matches: data });
            console.log(this.state);
          });
      })
  }


  render() {
    return (
      <div>
        <div className="summonerSearchBox">
          <h1>League statistics</h1>
          <input
            type="text" placeholder="Search Summoner" value={this.state.searchedSummoner}
            name="searchedSummoner" onChange={this.handleChange} className="searchBar"
          ></input>
          <select className="regionList"
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
          <button onClick={this.handleClick} className="btn btn-primary" >Search</button>
        </div>
        <div>
          {
            this.state.matches.map(match => (
              <div className="match"><MatchHistoryItem match={match} key={match.gameId} data={this.state.data} data1={this.state.data1} /></div>
            ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

const actionCreators = {
  clear: alertActions.clear,
};

const connectedMatchHistoryPage = connect(mapStateToProps, actionCreators)(MatchHistoryPage);
export { connectedMatchHistoryPage as MatchHistoryPage };