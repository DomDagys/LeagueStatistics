import React from "react";
import { connect } from "react-redux";
import config from "config";
import { quickstatsService, summonerService } from "../_services"
import { alertActions } from "../_actions";
import regeneratorRuntime from "regenerator-runtime";
import { summonerConstants } from "../_constants";
import SummonerProfile from "../_components/SummonerProfile";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null,
            summonerData: null
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.props.clear();
    }

    componentDidMount() {
        let summonerName = this.props.user.summonerName;
        let region = this.props.user.region;

        summonerService.getSummonerData(summonerName, region)
            .then(summonerData => this.setState({
                summonerData: summonerData,
                iconLink: `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/${summonerData.profileIconId}.png`
            }))
            .catch(message => this.props.error(message));

        quickstatsService.getStatistics(summonerName, region)
            .then(data => this.setState({ statistics: data }));
    }

    render() {
        console.log("Rendered")
        return (<div>
            <h1>This is the profile page</h1>
            {this.state.summonerData !== null && (<SummonerProfile summonerData={this.state.summonerData} />)}
            <p>Wins: {this.state.statistics !== null && this.state.statistics.wins}</p>
            <p>Losses: {this.state.statistics !== null && this.state.statistics.loss}</p>
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