import React from 'react';
import { PlayerItem } from "./PlayerItem";
import { PlayerItemA } from "./PlayerItem/PlayerItem";
import "./MatchHistoryPage.css"

class TeamItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        team: this.props.team,
        data: this.props.data,
        data1: this.props.data1
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
              <div>
                <div className="participant"><PlayerItemA participant={participant} key={participant.accountId} data={this.state.data} data1={this.state.data1}/></div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export { TeamItem };