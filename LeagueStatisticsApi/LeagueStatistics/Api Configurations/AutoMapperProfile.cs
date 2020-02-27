using AutoMapper;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Api_Configurations
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UpdateUserDto, User>();
            CreateMap<User, UpdateUserDto>();

            CreateMap<NewUserDto, User>();
            CreateMap<User, NewUserDto>();

            CreateMap<GetUserDto, User>();
            CreateMap<User, GetUserDto>();

            CreateMap<UpdateUserDto, User>();
            CreateMap<User, UpdateUserDto>();
        }
    }
}
