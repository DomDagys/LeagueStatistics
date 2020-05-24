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
import ProfilePageView from "./ProfilePageView";
import queryString from 'query-string';
import { userActions } from "../_actions";

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
      championMastery: null,
      isFollowed: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
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
      .then(data => this.setState({ statistics: data }))
      .catch(message => this.props.error(message));
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    this.getProfileData(queryParams.summoner, queryParams.region);

    fetch("http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json")
      .then(response => response.json())
      .then(championObject => {
        let championData = Object.entries(championObject.data);
        this.setState({ championData: championData });
      });

    this.props.user.followedPlayers.forEach(player => {
      if (player.summonerName == queryParams.summoner)
        this.setState({ isFollowed: true });
    });
  }

  handleClick(e) {
    this.props.clear();
    let summonerName = this.state.searchedSummoner;
    let region = this.state.region;

    this.props.history.push(`/profile?summoner=${summonerName}&region=${region}`);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleFollowClick(e) {
    const queryParams = queryString.parse(this.props.location.search);
    let exists = false;
    this.props.user.followedPlayers.forEach(player => {
      if (player.summonerName == queryParams.summoner)
        exists = true;
    });

    if (exists) {
      console.log("JAU YRA TOKS ZAIDEJAS");
      return;
    }

    const followedPlayer = {
      summonerName: queryParams.summoner,
      region: queryParams.region,
      level: 0,
      iconId: 0,
      rank: "",
      tier: "",
      leaguePoints: 0
    }

    const followedPlayers = [...this.props.user.followedPlayers, followedPlayer]
    this.props.user.followedPlayers = followedPlayers;
    this.props.update({ id: this.props.user.id, followedPlayers }, false);
    this.setState({ isFollowed: true })
  }

  handleLive = () => {
    const queryParams = queryString.parse(this.props.location.search);
    this.props.history.push(`/livegame?summoner=${queryParams.summoner}&region=${queryParams.region}`, this.state);
  };

  handlePerformance() {
    var performanceDiv = document.getElementById("performanceTips");
    var quickStatsDiv = document.getElementById("quickStatsDiv");
    if (performanceDiv.style.display === "block") {
      performanceDiv.style.display = "none";
      quickStatsDiv.style.height = "450px";
    } else {
      performanceDiv.style.display = "block";
      quickStatsDiv.style.height = "700px";
    }
    //performanceDiv.hidden = !performanceDiv.hidden;
  }

  render() {
    console.log(this.state)
    const queryParams = queryString.parse(this.props.location.search);
    return (
      <div>
        <div className="summonerSearchBox">
          <h1>League statistics</h1>
          <input className="searchBar" type="text" placeholder="Search Summoner" value={this.props.searchedSummoner}
            name="searchedSummoner" onChange={this.handleChange} ></input>
          <select className="regionList"
            name="region"
            value={this.region}
            onChange={this.handleChange}
            id="region"
          >
            <option selected={this.state.region == "EUW1" ? "selected" : ""} value="EUW1">EUW</option>
            <option selected={this.state.region == "EUN1" ? "selected" : ""} value="EUN1">EUNE</option>
            <option selected={this.state.region == "NA1" ? "selected" : ""} value="NA1">NA</option>
            <option selected={this.state.region == "KR" ? "selected" : ""} value="KR">KR</option>
          </select>
          <span className="buttonSpacing">
            <button onClick={this.handleClick} className="btn btn-primary" >Search</button>
            <button onClick={this.handleLive} className="btn btn-success">Live Game</button>
          </span>
        </div>
        <ProfilePageView {...this.state}
          handleFollowClick={this.handleFollowClick}
          region={queryParams.region}
          handlePerformance={this.handlePerformance}>
        </ProfilePageView>
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
  clear: alertActions.clear,
  success: alertActions.success,
  update: userActions.update
};

const connectedProfilePage = connect(mapStateToProps, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };
