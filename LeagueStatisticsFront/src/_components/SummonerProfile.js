import React from 'react';
import "../styles/SummonerProfile.css";

class SummonerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        </div>);
    }
}

export default SummonerProfile;