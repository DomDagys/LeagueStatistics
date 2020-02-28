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

        public async Task<GetUserDto> Authenticate(string username, string password)
        {
            var user = await _repository.GetByUsername(username);

            if (user == null)
                return null;
            if (user.Password != password)
                return null;

            GetUserDto getUserDto = _mapper.Map<GetUserDto>(user);

            return getUserDto;
        }

        public async Task<NewUserDto> CreateUser(NewUserDto newUserDto)
        {
            //Implement validation here (check if email or username exists, if user is null)

            var password = newUserDto.Password;
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            var user = _mapper.Map<User>(newUserDto);

            await _repository.Create(user);
            newUserDto = _mapper.Map<NewUserDto>(user);

            return newUserDto;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _repository.GetById(id);
            if (user == null)
                return false;

            bool deleted = await _repository.Delete(user);

            return deleted;
        }

        //Veikia, nereikia implementacijos
        public async Task<ICollection<GetUserDto>> GetAllUsers()
        {
            var users = await _repository.GetAll();
            var usersDto = _mapper.Map<GetUserDto[]>(users);

            return usersDto;
        }

        public async Task<GetUserDto> GetUserById(int id)
        {
            var user = await _repository.GetById(id);
            if (user == null)
                return null;
            var usersDto = _mapper.Map<GetUserDto>(user);

            return usersDto;
        }

        public async Task<UpdateUserDto> UpdateUser(int id, UpdateUserDto updateUserDto)
        {
            var oldUser = await _repository.GetById(id);
            if (oldUser == null || updateUserDto == null)
                return null;

            var newUser = _mapper.Map(updateUserDto, oldUser);
            await _repository.Update(newUser);
            var updatedUser = _mapper.Map<UpdateUserDto>(newUser);

            return updatedUser;
        }
    }
}
