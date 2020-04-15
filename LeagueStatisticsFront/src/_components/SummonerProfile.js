import React from 'react';

class SummonerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const iconLink = `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/${this.props.summonerData.profileIconId}.png`;

        return (<div>
            <h2>{this.props.summonerData.name}</h2>
            <img src={iconLink}></img>
            <p>Level {this.props.summonerData.summonerLevel}</p>
        </div>);
    }
}

export default SummonerProfile;