import React from 'react';
import { matchService } from "../_services/match.service";
import { MatchHistoryItem } from "./MatchHistoryItem";
import "./MatchHistoryPage.css"
import { store } from "../_helpers";
import { summonerService } from "../_services"

class MatchHistoryPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches:[],
      data:{
        data:[]
      },
      searchedSummoner: store.getState().authentication.user.summonerName,
      region: store.getState().authentication.user.region,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    var promise0 = matchService.getMatches(this.state.searchedSummoner, this.state.region, 10, 0);
    promise0.then(response => response.json())
    .then(data => {
      this.setState({matches: data});
    });
    var url = "http://ddragon.leagueoflegends.com/cdn/10.8.1/data/en_US/champion.json";
    var promise1 = fetch(url);
    promise1.then(response => response.json())
    .then(data => {
      this.setState({
        ... this.state,
        data: data.data
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    });
  }

  handleClick(e) {
    let summonerName = this.state.searchedSummoner;
    let region = this.state.region;

    summonerService.getSummonerData(summonerName, region)
        .catch(message => this.props.error(message))
        .then(x=>{
          console.log("TEST");
          var promise0 = matchService.getMatches(this.state.searchedSummoner, this.state.region, 10, 0);
          promise0
            .then(response => response.json())
            .then(data => {
              this.setState({matches: data});
              console.log(this.state);
          });
        })
  }


  render() {
    return (
      <div>
        <div className="input-group mb-3">
          <input 
            type="text" placeholder="Search Summoner" value={this.state.searchedSummoner} 
            name="searchedSummoner" onChange={this.handleChange}
          ></input>
          <select
            name="region"
            value={this.state.region}
            onChange={this.handleChange}
            id="region"
          >
            <option value="EUN1">EUNE</option>
            <option value="EUW1">EUW</option>
            <option value="NA1">NA</option>
            <option value="KR">KR</option>
          </select>
          <button onClick={this.handleClick} className="btn btn-primary" >Search</button>
        </div>
        <div>
          {
            this.state.matches.map(match => (
              <div className="match"><MatchHistoryItem match={match} key={match.gameId} data={this.state.data}/></div>
            ))
          }
        </div>
      </div>
    )
  }
}

export { MatchHistoryPage };