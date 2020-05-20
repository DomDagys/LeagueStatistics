import React from 'react';

class QuickStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.props.favoriteChampions.forEach(playedChamp => {
            this.props.championData.forEach(champion => {
                if (playedChamp.championId == champion[1].key) {
                    playedChamp.championName = champion[0];
                }
            })
        });
    }

    render() {

        const gameCount = this.props.gamesPlayed;
        return (
            <div>
                <h3>Recent games statistics</h3>
                <label>Performance: </label>
                {this.props.negativeTips.map(tips => {
                    return <p>{tips}</p>
                })}
                {this.props.positiveTips.map(tips => {
                    return <p>{tips}</p>
                })}
                <p>From games: {gameCount}, Wins: {this.props.wins}, Losses: {this.props.loss} <br />
                Roles played: {this.props.favoriteRoles.map(role => { return role.gameCount ? `Role:${role.role} Count:${role.gameCount}, ` : "" })}
                </p>
                <p>Winrate: {this.props.wins * 100 / gameCount}% KDA score: {this.props.kda}:1 <br />
                    Average KDA: {this.props.kills / gameCount}/{this.props.deaths / gameCount}/{this.props.assists / gameCount}</p>
                <h4>Top 3 recently played champions</h4>
                <div>
                    {this.props.favoriteChampions.map(champion => {
                        const champIcon = `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${champion.championName}.png`;
                        return <img key={champion.championName} src={champIcon}></img>;
                    })}
                    <p>
                        {this.props.favoriteChampions.map(champion => {
                            return <b key={champion.championId} >{champion.championName}
                            &emsp; &emsp; &emsp; &emsp; &emsp; </b>;
                        })}
                    </p>
                    <p>
                        {this.props.favoriteChampions.map(champion => {
                            return `Wr: ${(champion.wins * 100 / champion.gamesPlayed) - (champion.wins * 100 / champion.gamesPlayed % 1)}% 
                                    KDA: ${champion.kda}:1, `;
                        })}
                    </p>
                </div>
            </div>);
    }
}

export default QuickStatistics;