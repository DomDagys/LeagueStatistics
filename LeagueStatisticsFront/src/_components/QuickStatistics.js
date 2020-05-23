import React from 'react';
import "../styles/QuickStatistics.css"

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

    renderWinsLosses(wins) {
        if (wins >= 8)
            return "excellent"
        if (wins <= 3)
            return "negative";
        if (wins >= 6)
            return "positive";

        return "normal";
    }

    renderWinrate(winrate) {
        if (winrate >= 75)
            return "excellent";
        if (winrate <= 35)
            return "negative";
        if (winrate >= 60)
            return "positive";

        return "normal";
    }

    renderKdaScore(kda) {
        if (kda > 4)
            return "excellent";
        if (kda < 2)
            return "negative";
        if (kda > 3)
            return "positive";

        return "normal";
    }

    renderKillsAssists(count) {
        if (count >= 12)
            return "excellent";
        if (count <= 3)
            return "negative";
        if (count >= 8)
            return "positive";

        return "normal";
    }

    renderDeaths(deaths) {
        if (deaths >= 10)
            return "negative";
        if (deaths <= 2)
            return "excellent";
        if (deaths <= 5)
            return "positive";

        return "normal";
    }

    render() {

        const gameCount = this.props.gamesPlayed;
        let recentChampId = 0;
        return (
            <div>
                {/* <h3>Recent games statistics</h3>
                <label>Performance: </label>
                {this.props.negativeTips ? this.props.negativeTips.map(tips => {
                    return <p>{tips}</p>
                }) : ""}
                {this.props.positiveTips ? this.props.positiveTips.map(tips => {
                    return <p>{tips}</p>
                }) : ""} */}
                <div className="roleBox">
                    <h3><b>Roles played</b></h3>
                    {this.props.favoriteRoles.map(role => {
                        return <div>
                            <img className="roleIcon" src={`src/assets/roleIcons/${role.role}.png`}></img>
                            <label>Game count: {role.gameCount}</label>
                        </div>
                    })}
                </div>
                <p className="gameInfo">From games: {gameCount} &emsp; &emsp;
                                        Wins: <span className={this.renderWinsLosses(this.props.wins)}>{this.props.wins}</span> &emsp; &emsp;
                                        Losses: <span className={this.renderWinsLosses(this.props.wins)}>{this.props.loss}</span>

                </p>{/* Roles played: {this.props.favoriteRoles.map(role => { return role.gameCount ? `Role:${role.role} Count:${role.gameCount}, ` : "" })} */}
                <p className="gameInfo" >Winrate: <span className={this.renderWinrate(this.props.wins * 100 / gameCount)}>{this.props.wins * 100 / gameCount}</span>% &emsp; &emsp; &emsp;
                                        KDA score: <span className={this.renderKdaScore(this.props.kda)}>{this.props.kda}:1</span> <br />
                                        Average KDA: <span className={this.renderKillsAssists(this.props.kills / gameCount)}>{this.props.kills / gameCount}</span>/
                                        <span className={this.renderDeaths(this.props.deaths / gameCount)}>{this.props.deaths / gameCount}</span>/
                                        <span className={this.renderKillsAssists(this.props.assists / gameCount)}>{this.props.assists / gameCount}</span></p>
                <br />
                <h3><b>Top 3 recently played champions</b></h3>
                <div>
                    {this.props.favoriteChampions.map(champion => {
                        const champIcon = `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${champion.championName}.png`;
                        return (<img className="championIcon" key={champion.championName} src={champIcon}></img>);
                    })}
                    {this.props.favoriteChampions.map(champion => {
                        recentChampId += 1;
                        let winrate = (champion.wins * 100 / champion.gamesPlayed) - (champion.wins * 100 / champion.gamesPlayed % 1);
                        return <div className={`recentChampInfo${recentChampId}`}>
                            <p>
                                <b key={champion.championId} >{champion.championName} </b>
                                <br />
                            Win rate: <span className={this.renderWinrate(winrate)}>{winrate}</span>%
                            <br />
                            KDA: <span className={this.renderKdaScore(champion.kda)}>{champion.kda}:1</span>
                            </p>
                        </div>;
                    })}
                </div>
                <button className="performanceBtn" onClick={this.props.handlePerformance}>Performance</button>
                <div className="performanceTips" id="performanceTips" hidden={true}>
                    <h3>Recent games statistics</h3>
                    <label>Performance: </label>
                    {this.props.negativeTips ? this.props.negativeTips.map(tips => {
                        return <p>{tips}</p>
                    }) : ""}
                    {this.props.positiveTips ? this.props.positiveTips.map(tips => {
                        return <p>{tips}</p>
                    }) : ""}
                </div>
            </div>);
    }
}

export default QuickStatistics;