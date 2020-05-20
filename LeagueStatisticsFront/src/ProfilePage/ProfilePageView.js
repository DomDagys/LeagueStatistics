import React, { Component } from 'react';
import LeagueRanks from "../_components/LeagueRanks";
import SummonerProfile from "../_components/SummonerProfile";
import QuickStatistics from "../_components/QuickStatistics";

class ProfilePageView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div>
            <div className="summonerSearchBox">
                <h1>League statistics</h1>
                <input className="searchBar" type="text" placeholder="Search Summoner" value={this.props.searchedSummoner}
                    name="searchedSummoner" onChange={this.props.handleChange} ></input>
                <select className="regionList"
                    name="region"
                    value={this.props.region}
                    onChange={this.props.handleChange}
                    id="region"
                >
                    <option value="EUW1">EUW</option>
                    <option value="EUN1">EUNE</option>
                    <option value="NA1">NA</option>
                    <option value="KR">KR</option>
                </select>
                <button onClick={this.props.handleClick} className="btn btn-primary" >Search</button>
                <button onClick={this.props.handleLive} className="btn btn-success">Live Game</button>
            </div>
            <div >
                {this.props.summonerData !== null && (<SummonerProfile summonerData={this.props.summonerData} />)}
            </div>
            <div className={this.props.statistics && this.props.championData ? "quickStats" : ""}>
                {this.props.statistics && this.props.championData ? (<QuickStatistics {... this.props.statistics}
                    championData={this.props.championData} />) : (<p>Loading...</p>)}
            </div>
            {this.props.leagueData !== null && this.props.soloqChampions !== null
                && this.props.flexChampions !== null && this.props.championData !== null
                && this.props.championMastery !== null &&
                (<LeagueRanks leagueData={this.props.leagueData} soloqChampions={this.props.soloqChampions}
                    flexChampions={this.props.flexChampions} championData={this.props.championData} championMastery={this.props.championMastery} />)}
        </div>);
    }
}

export default ProfilePageView;