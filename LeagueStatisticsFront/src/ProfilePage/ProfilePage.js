import React from "react";
import { connect } from "react-redux";
import config from "config";
import { quickstatsService, summonerService, matchService } from "../_services"
import { alertActions } from "../_actions";
import { summonerConstants } from "../_constants";
import SummonerProfile from "../_components/SummonerProfile";
import QuickStatistics from "../_components/QuickStatistics";
import { leagueService } from "../_services/league.service";
import LeagueRanks from "../_components/LeagueRanks";
import "../styles/ProfilePage.css";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: null,
      summonerData: null,
      leagueData: null,
      region: "EUW1",
      searchedSummoner: "",
      championData: null,
      soloqChampions: null,
      flexChampions: null,
      championMastery: null
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.clear();
  }

  getProfileData(summonerName, region) {
    summonerService.getSummonerData(summonerName, region)
      .then(summonerData => {
        this.setState({ summonerData: summonerData });
        summonerService.getChampionMastery(summonerData.id, region)
          .then(championMastery => this.setState({ championMastery: championMastery }));
      })
      .catch(message => this.props.error(message));

    leagueService.getRankedStats(summonerName, region)
      .then(leagueData => this.setState({ leagueData: leagueData }));

    matchService.getRankedChampions(summonerName, region, 420)
      .then(rankedChampions => this.setState({ soloqChampions: rankedChampions }))
      .catch(this.setState({ soloqChampions: null }));

    matchService.getRankedChampions(summonerName, region, 440)
      .then(rankedChampions => this.setState({ flexChampions: rankedChampions }))
      .catch(this.setState({ flexChampions: null }));

    quickstatsService.getStatistics(summonerName, region)
      .then(data => this.setState({ statistics: data }));
  }

  componentDidMount() {
    let summonerName = this.props.user.summonerName;
    let region = this.props.user.region;

    this.getProfileData(summonerName, region);

    fetch("http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json")
      .then(response => response.json())
      .then(championObject => {
        let championData = Object.entries(championObject.data);
        this.setState({ championData: championData });
      });

  }

  handleClick(e) {
    this.props.clear();
    this.setState({ statistics: null })
    this.setState({ leagueData: null })
    let summonerName = this.state.searchedSummoner;
    let region = this.state.region;

    this.getProfileData(summonerName, region);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleLive = () => {
    this.props.history.push("/livegame", this.state);
  };

  render() {
    console.log(this.state)
    return (<div>
      <div className="summonerSearchBox">
        <h1>League statistics</h1>
        <input className="searchBar" type="text" placeholder="Search Summoner" value={this.state.searchedSummoner}
          name="searchedSummoner" onChange={this.handleChange} ></input>
        <select className="regionList"
          name="region"
          value={this.state.region}
          onChange={this.handleChange}
          id="region"
        >
          <option value="EUW1">EUW</option>
          <option value="EUN1">EUNE</option>
          <option value="NA1">NA</option>
          <option value="KR">KR</option>
        </select>
        <button onClick={this.handleClick} className="btn btn-primary" >Search</button>
        <button onClick={this.handleLive} className="btn btn-success">Live Game</button>
      </div>
      <div >
        {this.state.summonerData !== null && (<SummonerProfile summonerData={this.state.summonerData} />)}
      </div>
      <div className={this.state.statistics && this.state.championData ? "quickStats" : ""}>
        {this.state.statistics && this.state.championData ? (<QuickStatistics {... this.state.statistics}
          championData={this.state.championData} />) : (<p>Loading...</p>)}
      </div>
      {this.state.leagueData !== null && this.state.soloqChampions !== null
        && this.state.flexChampions !== null && this.state.championData !== null
        && this.state.championMastery !== null &&
        (<LeagueRanks leagueData={this.state.leagueData} soloqChampions={this.state.soloqChampions}
          flexChampions={this.state.flexChampions} championData={this.state.championData} championMastery={this.state.championMastery} />)}
    </div>);
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const actionCreators = {
  error: alertActions.error,
  clear: alertActions.clear
};

const connectedProfilePage = connect(mapStateToProps, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };
