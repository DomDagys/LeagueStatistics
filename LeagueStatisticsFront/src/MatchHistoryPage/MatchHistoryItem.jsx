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
      gameId: "PerformanceDiv" + this.props.match.gameId,
    };
    //procesMatchData(this.props.match);
    this.handleTipsClick = this.handleTipsClick.bind(this);
    //console.log("STATE", this.state);
    //console.log("PROPS", this.props);
  }

  handleTipsClick(e) {
    var T = document.getElementById(this.state.gameId);
    if (T.style.display === "block") {
      T.style.display = "none";
    } else {
      T.style.display = "block";
    }
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
      //console.log("From match history item", this.state),
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
        <div id={this.state.gameId} className="Performance">
        <div class="container-fluid">
          <p class="h3 text-center">Performance:</p>
          <div className="PositiveTip">
          {this.props.match.positiveTips? this.props.match.positiveTips.map(tips => {
                    return <p>{tips}</p>
                }) : <p class="text-center"><strong>Nothing significantly good this game</strong></p>}
          </div>
          <div className="NegativeTip">
                {this.props.match.negativeTips? this.props.match.negativeTips.map(tips => {
                    return <p>{tips}</p>
                }): <p class="text-center"><strong>Nothing significantly bad this game</strong></p>}
          </div>
        </div>
        </div>
        <div>
          <button onClick={this.handleTipsClick} className="tipsButton">Performance</button>
        </div>
      </div>
    );
  }
}


export { MatchHistoryItem };
