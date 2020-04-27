import React from "react";
import { connect } from "react-redux";
import config from "config";
import { quickstatsService, summonerService } from "../_services"
import { alertActions } from "../_actions";
import { summonerConstants } from "../_constants";
import SummonerProfile from "../_components/SummonerProfile";
import QuickStatistics from "../_components/QuickStatistics";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null,
            summonerData: null,
            region: this.props.user.region,
            searchedSummoner: "",
            championData: null
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.props.clear();
    }

    getProfileData(summonerName, region) {
        summonerService.getSummonerData(summonerName, region)
            .then(summonerData => this.setState({ summonerData: summonerData }))
            .catch(message => this.props.error(message));

        quickstatsService.getStatistics(summonerName, region)
            .then(data => this.setState({ statistics: data }));
    }

    componentDidMount() {
        let summonerName = this.props.user.summonerName;
        let region = this.props.user.region;

        this.getProfileData(summonerName, region);

        fetch("http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json")
            .then(response => response.json())
            .then(championObject => {
                let championData = Object.entries(championObject.data);
                this.setState({ championData: championData });
            });

    }

    handleClick(e) {
        this.props.clear();
        this.setState({ statistics: null })
        let summonerName = this.state.searchedSummoner;
        let region = this.state.region;

        this.getProfileData(summonerName, region);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log(this.state)
        return (<div>
            <h1>This is the profile page</h1>
            <div className="input-group mb-3">
                <input type="text" placeholder="Search Summoner" value={this.state.searchedSummoner}
                    name="searchedSummoner" onChange={this.handleChange} ></input>
                <select
                    name="region"
                    value={this.state.region}
                    onChange={this.handleChange}
                    id="region"
                >
                    <option value="EUW1">EUW</option>
                    <option value="EUN1">EUNE</option>
                    <option value="NA1">NA</option>
                    <option value="KR">KR</option>
                </select>
                <button onClick={this.handleClick} className="btn btn-primary" >Search</button>
            </div>
            {this.state.summonerData !== null && (<SummonerProfile summonerData={this.state.summonerData} />)}
            {this.state.statistics ? (<QuickStatistics {... this.state.statistics}
                championData={this.state.championData} />) : (<p>Loading...</p>)}
        </div>);
    }
}

function mapStateToProps(state) {
    const { users, authentication, settings } = state;
    const { user } = settings;
    return {
        user,
        users,
    };
}

const actionCreators = {
    error: alertActions.error,
    clear: alertActions.clear
};

const connectedProfilePage = connect(mapStateToProps, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };