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
    const queryParams = queryString.parse(this.props.location.search);

    this.getProfileData(queryParams.summoner, queryParams.region);

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
    return (
      <div>
        <ProfilePageView {...this.state}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleLive={this.handleLive}>

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
  clear: alertActions.clear
};

const connectedProfilePage = connect(mapStateToProps, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };
