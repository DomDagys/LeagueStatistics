import React from "react";
import { connect } from "react-redux";
import config from "config";
import { quickstatsService } from "../_services"
import { alertActions } from "../_actions";
import regeneratorRuntime from "regenerator-runtime";
import { summonerConstants } from "../_constants";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.props.clear();
    }

    componentDidMount() {
        let summonerName = this.props.user.summonerName;
        let region = this.props.user.region;
        quickstatsService.getStatistics(summonerName, region)
            .then(data => this.setState({ statistics: data }))
            .catch(message => this.props.error(message));
    }

    render() {
        console.log("Rendered")
        return (<div>
            <h1>This is the profile page</h1>
            <p>Wins: {this.state.statistics !== null && this.state.statistics.wins}</p>
            <p>Losses: {this.state.statistics !== null && this.state.statistics.loss}</p>

        </div>);
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
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