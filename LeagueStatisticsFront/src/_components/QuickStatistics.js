import React from 'react';

class QuickStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const gameCount = this.props.gamesPlayed;
        return (
            <div>
                <h3>Recent games statistics</h3>
                <p>From games: {gameCount}, Wins: {this.props.wins}, Losses: {this.props.loss}</p>
                <p>Winrate: {this.props.wins * 100 / gameCount}% KDA score: {this.props.kda} <br />
                    Average KDA: {this.props.kills / gameCount}/{this.props.deaths / gameCount}/{this.props.assists / gameCount}</p>
            </div>);
    }
}

export default QuickStatistics;