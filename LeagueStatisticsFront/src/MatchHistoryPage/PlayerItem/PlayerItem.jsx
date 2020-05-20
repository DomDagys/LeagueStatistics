import React from 'react';
import { getImageUrl } from "../ProcesMatchData";
import { getItemImageUrl } from "../ProcesMatchData";
import { getSpelImageUrl } from "../ProcesMatchData";
import { Icon_Lvl } from "./Icon_Lvl";
import { Spells } from "./Spells";
import { Items } from "./Items";
import "./PlayerItem.css";

class PlayerItemA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participant: this.props.participant,
            data: this.props.data,
            data1: this.props.data1
        };
    }

    render() {
        //console.log("From player item", this.state);
        return (
            <div className="player">
                <Icon_Lvl 
                    src={getImageUrl(this.state.data, this.state.participant.championId)} 
                    lvl={this.state.participant.stats.champLevel} 
                />
                <Spells 
                    src1={getSpelImageUrl(this.state.data1, this.state.participant.spell1Id)} 
                    src2={getSpelImageUrl(this.state.data1, this.state.participant.spell2Id)} 
                />
                <div className="name"><div className="text">{this.state.participant.summonerName}</div></div>
                <div className="kda"><div className="text">KDA {this.state.participant.stats.kills}/{this.state.participant.stats.deaths}/{this.state.participant.stats.assists}</div></div>
                <div className="cs"><div className="text">CS<br/>{this.state.participant.stats.totalMinionsKilled}</div></div>
                <Items
                    src1={getItemImageUrl(this.state.participant.stats.item0)}
                    src2={getItemImageUrl(this.state.participant.stats.item1)}
                    src3={getItemImageUrl(this.state.participant.stats.item2)}
                    src4={getItemImageUrl(this.state.participant.stats.item3)}
                    src5={getItemImageUrl(this.state.participant.stats.item4)}
                    src6={getItemImageUrl(this.state.participant.stats.item5)}
                />
            </div>
        )
    }
}

export { PlayerItemA };