import React from 'react';
import "../styles/LeagueRanks.css";

class LeagueRanks extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            queueChampions: null,
            queueName: ""
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRankedSoloClick = this.handleRankedSoloClick.bind(this);
        this.handleFlexClick = this.handleFlexClick.bind(this);

        this.getChampionName = this.getChampionName.bind(this);
        this.getChampionLevel = this.getChampionLevel.bind(this);
        this.getChampionPoints = this.getChampionPoints.bind(this);
    }

    getChampionName(championId) {
        let name = "";
        this.props.championData.forEach(champion => {
            if (championId == champion[1].key) {
                name = champion[0];
            }
        })
        return name;
    }

    getChampionLevel(championId) {
        let championLevel = "";
        this.props.championMastery.forEach(champion => {
            if (championId == champion.championId) {
                championLevel = champion.championLevel;
            }
        })
        return championLevel;
    }

    getChampionPoints(championId) {
        let championPoints = "";
        this.props.championMastery.forEach(champion => {
            if (championId == champion.championId) {
                championPoints = champion.championPoints;
            }
        })
        return championPoints;
    }

    getQeueuType(queueType) {
        if (queueType == "RANKED_SOLO_5x5")
            return "Ranked Solo";

        if (queueType == "RANKED_FLEX_SR")
            return "Flex Queue";

        return "Unranked";
    }

    render() {
        return (<div>
            <div className="rankedChampList">
                <div className="buttonSpacing">
                <label className="queueName">{this.state.queueName}</label>
                    <button onClick={this.handleRankedSoloClick} className="btn btn-primary" >SoloQ stats</button>
                    <button onClick={this.handleFlexClick} className="btn btn-primary" >Flex stats</button>
                </div>
                {this.state.queueChampions ? this.state.queueChampions.map(champion => {
                    const champIcon = `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${this.getChampionName(champion.championId)}.png`;
                    return <div className="rankedChampion">
                        <img key={champion.championId} src={champIcon}></img>
                        <label className="rankedChampionInfo">{champion.championName}</label>
                        <label className="rankedChampionInfo">Game count: {champion.gamesPlayed}</label>
                    </div>;
                }) : ""}
                <div className="masteryList">
                    {this.state.queueChampions ? this.state.queueChampions.map(champion => {
                        return <div className="masteryItem">
                            <img className="masteryIcon" src={`src/assets/masteryIcons/Level_${this.getChampionLevel(champion.championId)}.png`}></img>
                            <label>Points: {this.getChampionPoints(champion.championId)}</label>
                        </div>;
                    }) : ""}
                </div>
            </div>
        </div>);
    }

    handleRankedSoloClick(e) {
        let queueData = null;
        this.props.leagueData.map(entryDto => {
            if (entryDto.queueType == "RANKED_SOLO_5x5") {
                queueData = entryDto;
            }
        });

        this.setState({ queueChampions: this.props.soloqChampions });
        this.setState({ queueName: "Ranked Solo" });
    }

    handleFlexClick(e) {
        let queueData = null;
        this.props.leagueData.map(entryDto => {
            if (entryDto.queueType == "RANKED_FLEX_SR") {
                queueData = entryDto;
            }
        });
        this.setState({ queueChampions: this.props.flexChampions });
        this.setState({ queueName: "Ranked Flex" });
    }

    componentDidMount() {
        if (this.state.queueChampions == null) {
            if(this.props.soloqChampions != null){
                this.setState({ queueChampions: this.props.soloqChampions });
                this.setState({ queueName: "Ranked Solo" });
            }
            else if(this.props.flexChampions != null){
                this.setState({ queueChampions: this.props.flexChampions });
                this.setState({ queueName: "Ranked Flex" });
            }
        }
    }
}

export default LeagueRanks;