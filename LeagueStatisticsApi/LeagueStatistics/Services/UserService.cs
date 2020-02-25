using AutoMapper;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using LeagueStatistics.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeagueStatistics.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;

        public UserService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<NewUserDto> CreateUser(NewUserDto newUserDto)
        {
            //Implement validation

            var newUser = _mapper.Map<User>(newUserDto);

            //Hashing

            //Adding to repo

            newUserDto = _mapper.Map<NewUserDto>(newUser);

            return newUserDto;
        }

        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<GetUserDto>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<GetUserDto> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<UpdateUserDto> UpdateUser(int id, UpdateUserDto updateUserDto)
        {
            throw new NotImplementedException();
        }
    }
}
