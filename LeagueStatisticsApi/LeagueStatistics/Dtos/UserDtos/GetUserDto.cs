﻿using LeagueStatistics.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Dtos.UserDtos
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string SummonerName { get; set; }
        public string Region { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AboutMe { get; set; }
        public ICollection<FollowedPlayer> FollowedPlayers { get; set; }
    }
}
