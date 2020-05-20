import React from 'react';

class SummonerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const iconLink = `http://ddragon.leagueoflegends.com/cdn/10.10.3216176/img/profileicon/${this.props.summonerData.profileIconId}.png`

        return (<div>
            <h2>{this.props.summonerData.name}</h2>
            <img src={iconLink} width="150px"></img>
            <h4>Level {this.props.summonerData.summonerLevel}</h4>
        </div>);
    }
}

export default SummonerProfile;