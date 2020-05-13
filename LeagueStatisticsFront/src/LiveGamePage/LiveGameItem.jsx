import React from "react";
import { TeamItem } from "./TeamItem";
import "../MatchHistoryPage/MatchHistoryPage.css";
import { procesMatchData } from "./LiveGame";

export default class LiveGameItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: procesMatchData(this.props.match),
      data: this.props.data,
      searchedSummoner: this.props.searchedSummoner,
      region: this.props.region,
    };
    //procesMatchData(this.props.match);
    //console.log("STATE", this.state);
  }

  componentWillMount() {
    this.setState({ match: procesMatchData(this.props.match) });
  }

  render() {
    /*return (
      <div>
        <div>
            <div>
            {
                this.state.match.teams.map(team => (
                <TeamItem team={team}/>
                ))
            }
            </div>
            <div>
            {
                this.state.match.participantIdentities.map(participant => (
                <div>
                    {JSON.stringify(participant.player.summonerName)}
                </div>
                ))
            }
            </div>
        </div>
      </div>
    )*/
    console.log("PROPSAI", this.state);
    return this.state.match ? (
      <div>
        <div>
          <div className="teamWin">
            <TeamItem
              team={this.state.match.teamBlue}
              data={this.state.data}
              searchedSummoner={this.state.searchedSummoner}
              region={this.state.region}
            />
          </div>
          <div className="teamWin">
            <TeamItem
              team={this.state.match.teamRed}
              data={this.state.data}
              searchedSummoner={this.state.searchedSummoner}
              region={this.state.region}
            />
          </div>
        </div>
      </div>
    ) : (
      <div>Waiting</div>
    );
  }
}
