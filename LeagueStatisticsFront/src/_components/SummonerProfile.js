import React from 'react';
import "../styles/SummonerProfile.css";
import "../styles/LeagueRanks.css";

class SummonerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soloqData: null,
            flexData: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getQeueuType(queueType) {
        if (queueType == "RANKED_SOLO_5x5")
            return "Ranked Solo";

        if (queueType == "RANKED_FLEX_SR")
            return "Flex Queue";

        return "Unranked";
    }

    componentDidMount() {
        this.setState({
            soloqData: this.props.leagueData[0],
            flexData: this.props.leagueData[1]
        });
    }

    render() {
        const iconLink = `http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/profileicon/${this.props.summonerData.profileIconId}.png`

        return (<div className="profileComponents">
            <button className={this.props.isFollowed ? "btn btn-success" : "btn btn-primary"} onClick={this.props.handleFollowClick}>
                {this.props.isFollowed ? "Followed" : "Follow"}
            </button>
            <h3>{this.props.summonerData.name}</h3>
            <img src={iconLink} className="summonerIcon"></img>
            <h4>Level {this.props.summonerData.summonerLevel}</h4>
            <div>
                {this.state.soloqData ? <h3>{this.getQeueuType(this.state.soloqData.queueType)}</h3> : <h3>Unranked</h3>}
                {this.state.soloqData ? <img className="rankedIcon" src={`src/assets/leagueIcons/Emblem_${this.state.soloqData.tier}.png`} width="150px"></img> : <img className="rankedIcon" src={`src/assets/leagueIcons/Emblem_Unranked.png`} width="150px"></img>}
                <span className="rankedPoints">{this.state.soloqData ? <p>{this.state.soloqData.tier} {this.state.soloqData.rank} <br /> LP:{this.state.soloqData.leaguePoints}</p> : <p> <br /> <br /></p>}</span>
            </div>
            <div>
                {this.state.flexData ? <h3>{this.getQeueuType(this.state.flexData.queueType)}</h3> : <h3>Unranked</h3>}
                {this.state.flexData ? <img className="rankedIcon" src={`src/assets/leagueIcons/Emblem_${this.state.flexData.tier}.png`} width="150px"></img> : <img className="rankedIcon" src={`src/assets/leagueIcons/Emblem_Unranked.png`} width="150px"></img>}
                <span className="rankedPoints">{this.state.flexData ? <p>{this.state.flexData.tier} {this.state.flexData.rank} <br /> LP:{this.state.flexData.leaguePoints}</p> : <p><br /> <br /></p>}</span>
            </div>

        </div>);
    }
}

export default SummonerProfile;