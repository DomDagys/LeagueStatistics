﻿using LeagueStatistics.Dtos.UserDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services.Interfaces
{
    public interface IUserService
    {
        Task<ICollection<GetUserDto>> GetAllUsers();
        Task<GetUserDto> GetUserById(int id);
        Task<NewUserDto> CreateUser(NewUserDto newUserDto);
        Task<UpdateUserDto> UpdateUser(int id, UpdateUserDto updateUserDto);
        Task<bool> DeleteUser(int id);
    }
}
