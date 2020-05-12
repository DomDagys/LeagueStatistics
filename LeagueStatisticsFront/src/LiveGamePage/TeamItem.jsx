import React from "react";
import "../MatchHistoryPage/MatchHistoryPage.css";
import { Player } from "./Player";

class TeamItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.team,
      data: this.props.data,
      searchedSummoner: this.props.searchedSummoner,
      region: this.props.region,
    };
    //console.log(this.state);
    //console.log(this.state.data.Aatrox.key)
  }

  render() {
    console.log("TEAM item data", this.state.data);
    return (
      <div>
        {this.state.team.participants.map((participant) => (
          <div className="participant">
            <Player
              participant={participant}
              key={participant.accountId}
              data={this.state.data}
              searchedSummoner={this.state.searchedSummoner}
              region={this.state.region}
            />
          </div>
        ))}
      </div>
    );
  }
}

export { TeamItem };
