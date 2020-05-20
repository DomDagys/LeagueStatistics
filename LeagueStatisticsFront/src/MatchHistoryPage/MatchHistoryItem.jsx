import React from "react";
import { TeamItem } from "./TeamItem";
import "./MatchHistoryPage.css";
import { procesMatchData } from "./ProcesMatchData";

class MatchHistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: procesMatchData(this.props.match),
      data: this.props.data,
      data1: this.props.data1,
    };
    //procesMatchData(this.props.match);
    //console.log("STATE", this.state);
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
    return (
      console.log("From match history item", this.state),
      <div>
        <div>
          {this.state.match.timeMin}min {this.state.match.timeSec}s
        </div>
        <div
          className={
            this.state.match.teamBlue.win == "Win" ? "teamWin" : "teamLost"
          }
        >
          <TeamItem team={this.state.match.teamBlue} data={this.state.data} data1={this.state.data1}/>
        </div>
        <div
          className={
            this.state.match.teamRed.win == "Win" ? "teamWin" : "teamLost"
          }
        >
          <TeamItem team={this.state.match.teamRed} data={this.state.data} data1={this.state.data1}/>
        </div>
      </div>
    );
  }
}

export { MatchHistoryItem };
