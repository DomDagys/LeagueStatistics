import React from 'react';
import "../styles/LeagueRanks.css";

class LeagueRanks extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            selectedQueue: null,
            queueChampions: null
        }

        this.props.soloqChampions.forEach(playedChamp => {
            this.props.championData.forEach(champion => {
                if (playedChamp.championId == champion[1].key) {
                    playedChamp.championName = champion[0];
                }
            })
        });

        this.props.flexChampions.forEach(playedChamp => {
            this.props.championData.forEach(champion => {
                if (playedChamp.championId == champion[1].key) {
                    playedChamp.championName = champion[0];
                }
            })
        });

        this.props.soloqChampions.forEach(playedChamp => {
            this.props.championMastery.forEach(mastery => {
                if (playedChamp.championId == mastery.championId) {
                    playedChamp.championLevel = mastery.championLevel;
                    playedChamp.championPoints = mastery.championPoints;
                }
            })
        });

        this.props.flexChampions.forEach(playedChamp => {
            this.props.championMastery.forEach(mastery => {
                if (playedChamp.championId == mastery.championId) {
                    playedChamp.championLevel = mastery.championLevel;
                    playedChamp.championPoints = mastery.championPoints;
                }
            })
        });

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRankedSoloClick = this.handleRankedSoloClick.bind(this);
        this.handleFlexClick = this.handleFlexClick.bind(this);
    }

    getQeueuType(queueType) {
        if (queueType == "RANKED_SOLO_5x5")
            return "Ranked Solo";

        if (queueType == "RANKED_FLEX_SR")
            return "Flex Queue";

        return "Unranked";
    }

    render() {
        //console.log(this.props.leagueData.length);

        console.log(this.state);
        console.log(this.props.leagueData);
        //const iconLink = "src/leagueIcons/Emblem_Challenger.png";
        //this.props
        return (<div>
            <div className="rankBox">
                {this.state.selectedQueue ? <h3>{this.getQeueuType(this.state.selectedQueue.queueType)}</h3> : <h3>Unranked</h3>}
                {this.state.selectedQueue ? <img src={`src/assets/leagueIcons/Emblem_${this.state.selectedQueue.tier}.png`} width="150px"></img> : <img src={`src/leagueIcons/Emblem_Unranked.png`} width="150px"></img>}
                <span className="rankedPoints">{this.state.selectedQueue ? <p>{this.state.selectedQueue.tier} {this.state.selectedQueue.rank} <br /> LP:{this.state.selectedQueue.leaguePoints}</p> : null}</span>
            </div>
            <div className="rankedChampList">
                <div className="buttonSpacing">
                    <button onClick={this.handleRankedSoloClick} className="btn btn-primary" >SoloQ stats</button>
                    <button onClick={this.handleFlexClick} className="btn btn-primary" >Flex stats</button>
                </div>
                {this.state.queueChampions ? this.state.queueChampions.map(champion => {
                    const champIcon = `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${champion.championName}.png`;
                    return <div className="rankedChampion">
                        <img key={champion.championId} src={champIcon}></img>
                        <label className="rankedChampionInfo">{champion.championName}</label>
                        <label className="rankedChampionInfo">Game count: {champion.gamesPlayed}</label>
                    </div>;
                }) : ""}
                <div className="masteryList">
                    {this.state.queueChampions ? this.state.queueChampions.map(champion => {
                        return <div className="masteryItem">
                            <img className="masteryIcon" src={`src/assets/masteryIcons/Level_${champion.championLevel}.png`}></img>
                            <label>Points: {champion.championPoints}</label>
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

        this.setState({ selectedQueue: queueData });
        this.setState({ queueChampions: this.props.soloqChampions });
    }

    handleFlexClick(e) {
        let queueData = null;
        this.props.leagueData.map(entryDto => {
            if (entryDto.queueType == "RANKED_FLEX_SR") {
                queueData = entryDto;
            }
        });

        this.setState({ selectedQueue: queueData });
        this.setState({ queueChampions: this.props.flexChampions });
    }

    componentDidMount() {
        if (this.state.selectedQueue == null) {
            let queueData = null;
            console.log(this.props.leagueData);
            //this.props.leagueData.foreach()
            this.props.leagueData.map(entryDto => {
                //console.log(entryDto);
                if (entryDto.queueType == "RANKED_SOLO_5x5") {
                    queueData = entryDto;
                    this.setState({ selectedQueue: queueData })
                }
            });
        }
        if (this.state.queueChampions == null) {
            this.setState({ queueChampions: this.props.soloqChampions });
        }
    }
}

export default LeagueRanks;