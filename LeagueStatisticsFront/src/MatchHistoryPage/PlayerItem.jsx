import React from 'react';
import { getImageUrl } from "./ProcesMatchData";
import "./MatchHistoryPage.css"

class PlayerItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      participant: this.props.participant,
      data: this.props.data
    };
    //console.log(this.state);
    //console.log(this.state.data.Aatrox.key)
    
  }

  render() {
    return (
          <div>
            <div className="item">{this.state.participant.summonerName}</div>
            <div className="item">KDA:&#160;{this.state.participant.stats.kills}/{this.state.participant.stats.deaths}/{this.state.participant.stats.assists}</div>
            <div className="item">Farm:&#160;{this.state.participant.stats.totalMinionsKilled}</div>
            <div className="item"><img className="image" src={getImageUrl(this.state.data, this.state.participant.championId)} alt={this.state.participant.championId}></img></div>
          </div>
    )
  }
}

export { PlayerItem };