using AutoMapper;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using LeagueStatistics.Repositories.Interfaces;
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
        private readonly IUserRepository _repository;

        public UserService(IMapper mapper, IUserRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<NewUserDto> CreateUser(NewUserDto newUserDto)
        {
            //Implement validation

            var user = _mapper.Map<User>(newUserDto);

            //Hashing

            await _repository.Create(user);
            newUserDto = _mapper.Map<NewUserDto>(user);

            return newUserDto;
        }

        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<GetUserDto>> GetAllUsers()
        {
            var users = await _repository.GetAll();
            var usersDto = _mapper.Map<GetUserDto[]>(users);

            return usersDto;
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
