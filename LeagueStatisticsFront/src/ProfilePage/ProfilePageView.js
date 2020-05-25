import React, { Component } from 'react';
import LeagueRanks from "../_components/LeagueRanks";
import SummonerProfile from "../_components/SummonerProfile";
import QuickStatistics from "../_components/QuickStatistics";
import "../styles/ProfilePage.css";

class ProfilePageView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (<div>
            <div className={this.props.summonerData ? "summonerProfile" : ""}>
                {this.props.summonerData !== null && this.props.leagueData != null && (<SummonerProfile summonerData={this.props.summonerData}
                    handleFollowClick={this.props.handleFollowClick}
                    isFollowed={this.props.isFollowed}
                    leagueData={this.props.leagueData} />)}
            </div>
            <div id="quickStatsDiv" className={this.props.statistics && this.props.championData ? "quickStats" : ""}>
                {this.props.statistics && this.props.championData ? (<QuickStatistics {... this.props.statistics}
                    championData={this.props.championData} handlePerformance={this.props.handlePerformance} />) : ""}
            </div>
            {this.props.leagueData !== null &&
                (this.props.soloqChampions !== null || this.props.flexChampions !== null)
                && this.props.championData !== null
                && this.props.championMastery !== null &&
                (<LeagueRanks leagueData={this.props.leagueData} soloqChampions={this.props.soloqChampions}
                    flexChampions={this.props.flexChampions} championData={this.props.championData} championMastery={this.props.championMastery} />)}
        </div>);
    }
}

export default ProfilePageView;