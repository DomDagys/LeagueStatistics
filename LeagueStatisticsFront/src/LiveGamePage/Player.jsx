import React from "react";
import "../MatchHistoryPage/MatchHistoryPage.css";
import { getImageUrl, getTierUrl } from "./LiveGame";
import { leagueService } from "../_services";
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: this.props.participant,
      data: this.props.data,
      searchedSummoner: this.props.searchedSummoner,
      region: this.props.region,
      arr: [],
    };
    //console.log(this.state);
    //console.log(this.state.data.Aatrox.key)
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="participant">
          <div className="item">{this.state.participant.summonerName}</div>
          <div className="item">
            <img
              className="image"
              src={getImageUrl(
                this.state.data,
                this.state.participant.championId
              )}
              alt={this.state.participant.championId}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export { Player };
