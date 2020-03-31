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
            CreateMap<AuthenticatedUserDto, User>();
            CreateMap<User, AuthenticatedUserDto>();

            CreateMap<UpdateUserDto, User>();
            CreateMap<User, UpdateUserDto>();

            CreateMap<NewUserDto, User>();
            CreateMap<User, NewUserDto>();

            CreateMap<GetUserDto, User>();
            CreateMap<User, GetUserDto>();

            CreateMap<UpdateUserDto, User>()
                .ForMember(user => user.Email, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.Email))))
                .ForMember(user => user.SummonerName, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.SummonerName))))
                .ForMember(user => user.Region, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.Region))))
                .ForMember(user => user.AboutMe, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.AboutMe))));
            CreateMap<User, UpdateUserDto>();
            CreateMap<object, UpdateUserDto>();
        }
    }
}
