import React from "react";
import { Redirect } from "react-router-dom";
import { ProfilePage } from "../ProfilePage/ProfilePage";
import { store } from "../_helpers";
import { matchService } from "../_services/match.service";
import LiveGameItem from "./LiveGameItem";
import { leagueService } from "../_services";
import queryString from 'query-string';
import "../styles/App.css";

class LiveGamePage extends React.Component {
  constructor(props) {
    super(props);
    const queryParams = queryString.parse(this.props.location.search);
    this.state = {
      searchedSummoner: this.props.location.state.summonerData,
      region: queryParams.region,
      match: [],
      data: [],
      matchParticipants: new Array(),
      found: false,
    };
  }

  componentDidMount() {
    console.log(this.state.region);
    var promise0 = matchService.getLiveGame(
      this.state.searchedSummoner.id,
      this.state.region
    );
    console.log(this.state.searchedSummoner.name);
    promise0
      .then((response) => (response.status == 200 ? response.json() : ""))
      .then((data) => {
        console.log("HE", data);
        if (data != null) {
          console.log("HAhaha");
          this.setState({
            ...this.state,
            matchParticipants: data.participants,
            found: true,
          });
        } else {
          this.setState({ ...this.state, matchParticipants: [] });
          console.log("HA");
        }
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

    for (let i in this.state.matchParticipants) {
      leagueService
        .getRankedStats(i.summonerName, this.state.region)
        .then((leagueData) => {
          if (leagueData != null) {
            this.setState({ match: leagueData });
          }
        });
      console.log("OOOF??", this.state.match);
    }
  }

  render() {
    //console.log(this.state.matchParticipants);
    return (
      (this.state.matchParticipants && this.state.found && (
        <div className="liveGamePage">
          <LiveGameItem
            match={this.state.matchParticipants}
            data={this.state.data}
            searchedSummoner={this.state.searchedSummoner}
            region={this.state.region}
          />
        </div>
      )) || (
        <h1 className="liveGamePage">
          Summoner {this.state.searchedSummoner.name} is not playing right now
        </h1>
      )
    );
  }
}

export default LiveGamePage;
