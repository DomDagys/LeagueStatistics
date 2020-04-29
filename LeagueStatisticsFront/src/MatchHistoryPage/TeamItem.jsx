import React from 'react';
import { PlayerItem } from "./PlayerItem";
import "./MatchHistoryPage.css"

class TeamItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        team: this.props.team,
        data: this.props.data
    };
    //console.log(this.state);
  }

  render() {
    return (
      <div>
        <div>
          {this.state.team.win}
        </div>
        <div>
          {
            this.state.team.participants.map(participant => (
              <div className="participant"><PlayerItem participant={participant} key={participant.accountId} data={this.state.data}/></div>
            ))
          }
        </div>
      </div>
    )
  }
}

export { TeamItem };