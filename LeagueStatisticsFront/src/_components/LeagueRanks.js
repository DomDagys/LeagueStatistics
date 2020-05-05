import React from 'react';

class LeagueRanks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedQueue: null}

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleRankedSoloClick = this.handleRankedSoloClick.bind(this);
        this.handleFlexClick = this.handleFlexClick.bind(this);
    }
    render() {
        //console.log(this.props.leagueData.length);
        
        console.log(this.state);
        console.log(this.props.leagueData);
        //const iconLink = "src/leagueIcons/Emblem_Challenger.png";
        //this.props
        return (<div>
            {this.state.selectedQueue ? <h5>{this.state.selectedQueue.queueType}</h5> : <h5>Unranked</h5>}
            {this.state.selectedQueue ? <img src={`src/leagueIcons/Emblem_${this.state.selectedQueue.tier}.png`} width="150px"></img> : <img src={`src/leagueIcons/Emblem_Unranked.png`} width="150px"></img>}
            {this.state.selectedQueue ? <p>{this.state.selectedQueue.tier} {this.state.selectedQueue.rank} LP:{this.state.selectedQueue.leaguePoints}</p> : null}
            <button onClick={this.handleRankedSoloClick} className="btn btn-primary" >SoloQ stats</button>
            <button onClick={this.handleFlexClick} className="btn btn-primary" >Flex stats</button>
        </div>);
    }

    handleRankedSoloClick(e){
        let queueData = null;
        this.props.leagueData.map(entryDto => {
            if(entryDto.queueType == "RANKED_SOLO_5x5"){
                queueData = entryDto;
            }
        });
    
        this.setState({selectedQueue: queueData});
    }

    handleFlexClick(e){
        let queueData = null;
        this.props.leagueData.map(entryDto => {
            if(entryDto.queueType == "RANKED_FLEX_SR"){
                queueData = entryDto;
            }
        });
    
        this.setState({selectedQueue: queueData});
    }

    componentDidMount(){
        if(this.state.selectedQueue == null){
            let queueData = null;
            console.log(this.props.leagueData);
            //this.props.leagueData.foreach()
            this.props.leagueData.map(entryDto => {
                //console.log(entryDto);
                if(entryDto.queueType == "RANKED_SOLO_5x5"){
                    queueData = entryDto;
                    this.setState({selectedQueue: queueData})
                }
            });
        }
    }
}

export default LeagueRanks;