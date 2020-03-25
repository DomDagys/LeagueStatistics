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
        private readonly ISecurityService _securityService;

        public UserService(IMapper mapper, IUserRepository repository, ISecurityService securityService)
        {
            _mapper = mapper;
            _repository = repository;
            _securityService = securityService;
        }

        public async Task<AuthenticatedUserDto> Authenticate(string username, string password)
        {
            var user = await _repository.GetByUsername(username);
            if (user == null)
                return null;

            string token;
            user = _securityService.Authenticate(user, username, password, out token);
            if (user == null)
                return null;

            AuthenticatedUserDto authUser = _mapper.Map<AuthenticatedUserDto>(user);
            authUser.Token = token;

            return authUser;
        }

        public async Task<User> CreateUser(NewUserDto newUserDto)
        {
            var userWithEmail = await _repository.GetByEmail(newUserDto.Email);
            var userWithUsername = await _repository.GetByUsername(newUserDto.Username);
            byte[] passwordHash, passwordSalt;

            try
            {
                if (userWithEmail != null)
                    throw new Exception("A user with the same email already exists.");

                if (userWithUsername != null)
                    throw new Exception("A user with the same username already exits.");

                if (newUserDto.Username.Length < 4)
                    throw new Exception("Username is too short, must be more than 4 characters.");

                if (!string.IsNullOrWhiteSpace(newUserDto.Password) && newUserDto.Password.Length < 4)
                    throw new Exception("Password is too short, must be more than 4 characters.");

                _securityService.CreatePasswordHash(newUserDto.Password, out passwordHash, out passwordSalt);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            var user = _mapper.Map<User>(newUserDto);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _repository.Create(user);
            //newUserDto = _mapper.Map<NewUserDto>(user);

            //return newUserDto;
            return user;
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
            var user = _mapper.Map(updateUserDto, oldUser);

            var userWithEmail = await _repository.GetByEmail(user.Email);

            try
            {
                if (userWithEmail != null && updateUserDto.Email != oldUser.Email)
                    throw new Exception("A user with the same email already exists.");

                if (!string.IsNullOrWhiteSpace(updateUserDto.Password) && updateUserDto.Password.Length < 4)
                    throw new Exception("Password is too short, must be more than 4 characters.");
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (!string.IsNullOrWhiteSpace(updateUserDto.Password))
            {
                byte[] passwordSalt, passwordHash;
                _securityService.CreatePasswordHash(updateUserDto.Password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            await _repository.Update(user);
            var updatedUser = _mapper.Map<UpdateUserDto>(user);

            return updatedUser;
        }

        //private async Task ValidateFields(User user, string password)
        //{
        //    var userWithEmail = await _repository.GetByEmail(user.Email);
        //    var userWithUsername = await _repository.GetByUsername(user.Username);

        //    if (userWithEmail != null && user.Email != userWithUsername.Email)
        //        throw new Exception("A user with the same email already exists.");

        //    if (userWithUsername != null && user.Username != userWithEmail.Username)
        //        throw new Exception("A user with the same username already exits.");

        //    if (user.Username.Length < 4)
        //        throw new Exception("Username is too short, must be more than 4 characters.");

        //    if (!string.IsNullOrWhiteSpace(password) && password.Length < 4)
        //        throw new Exception("Password is too short, must be more than 4 characters.");

        //    return;
        //}

    }
}
