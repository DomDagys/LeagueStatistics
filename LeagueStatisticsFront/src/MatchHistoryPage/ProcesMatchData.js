export function procesMatchData(matchData){
    //console.log(matchData);
    var match = {
        timeMin: Math.floor(matchData.gameDuration/60),
        timeSec: matchData.gameDuration%60,
        teamBlue: {
            ... matchData.teams[0],
            participants: formatParticipants(matchData.participantIdentities.slice(0,5), matchData.participants.slice(0,5))
        },
        teamRed: {
            ... matchData.teams[1],
            participants: formatParticipants(matchData.participantIdentities.slice(5,10), matchData.participants.slice(5,10))
        }
    }
    //console.log(match);
    return match;
}

function formatParticipants(participantIdentities, participants){
    var x = [];
    for (let index = 0; index < 5; index++) {
        x.push(formatParticipant(participantIdentities[index],participants[index]));
    }
    return x;
}

function formatParticipant(participantIdentitie, participant){
    return {
        ... participantIdentitie.player,
        ... participant
    }
}

export function getImageUrl(data, key){
    //console.log(data);
    for(var i in data){
        //console.log(i);
        //console.log(data[i]);
        //console.log(data[i].key, key);
        if(data[i].key == key){
            return "http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/"+i+".png"
        }
    }
    return "";
}