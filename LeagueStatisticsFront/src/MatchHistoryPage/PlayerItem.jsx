import React from 'react';
import { getImageUrl } from "./ProcesMatchData";
import { getItemImageUrl } from "./ProcesMatchData";
import { getSpelImageUrl } from "./ProcesMatchData";
import "./MatchHistoryPage.css"

class PlayerItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      participant: this.props.participant,
      data: this.props.data,
      data1: this.props.data1
    };
    //console.log(this.state);
    //console.log(this.state.data.Aatrox.key)
    
  }

  render() {
    console.log("From player item", this.state);
    return (
          <div>
            <div className="item">{this.state.participant.summonerName}</div>
            <div className="item">KDA:&#160;{this.state.participant.stats.kills}/{this.state.participant.stats.deaths}/{this.state.participant.stats.assists}</div>
            <div className="item">Farm:&#160;{this.state.participant.stats.totalMinionsKilled}</div>
            <div className="item"><img className="image" src={getImageUrl(this.state.data, this.state.participant.championId)} alt={this.state.participant.championId}></img></div>
            <div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item0)} alt={this.state.participant.stats.item0}></img></div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item1)} alt={this.state.participant.stats.item1}></img></div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item2)} alt={this.state.participant.stats.item2}></img></div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item3)} alt={this.state.participant.stats.item3}></img></div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item4)} alt={this.state.participant.stats.item4}></img></div>
              <div className="itemItem"><img className="itemImage" src={getItemImageUrl(this.state.participant.stats.item5)} alt={this.state.participant.stats.item5}></img></div>
            </div>
            <div className="item"></div>
            <div>
              <div className="itemItem"><img className="itemImage" src={getSpelImageUrl(this.state.data1, this.state.participant.spell1Id)} alt={this.state.participant.spell1Id}></img></div>
              <div className="itemItem"><img className="itemImage" src={getSpelImageUrl(this.state.data1, this.state.participant.spell2Id)} alt={this.state.participant.spell2Id}></img></div>
            </div>
          </div>
    )
  }
}

export { PlayerItem };