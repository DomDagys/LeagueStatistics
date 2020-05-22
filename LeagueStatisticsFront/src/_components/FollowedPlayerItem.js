import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../styles/ProfilePage.css";
import "../styles/FollowedPlayer.css";
import { userActions } from '../_actions/user.actions';
import { alertActions } from '../_actions';

class FollowedPlayerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: "followed_player_" + this.props.summonerName
        }

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(e) {
        const user = this.props.user;
        let followedPlayers = [];
        user.followedPlayers.forEach(player => {
            if (player.summonerName != this.props.summonerName) {
                followedPlayers = [...followedPlayers, player]
            }
        });
        user.followedPlayers = followedPlayers;
        this.props.update({ id: this.props.user.id, followedPlayers }, false);

    }

    render() {
        return (<div id={"followed_player_" + this.props.summonerName} className="followedPlayer">
            <Link to={`/profile?summoner=${this.props.summonerName}&region=${this.props.region}`}>{this.props.summonerName} {this.props.region}</Link>
            <button className="removeFollowed" onClick={this.handleRemove}>X</button>
        </div>);
    }
}


export default FollowedPlayerItem;