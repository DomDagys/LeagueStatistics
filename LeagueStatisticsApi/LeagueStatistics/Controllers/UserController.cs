using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using LeagueStatistics.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LeagueStatistics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost]
        [Route("auth")] 
        public async Task<IActionResult> Authenticate(LoginUserDto userDto)
        {
            var authUser = await _userService.Authenticate(userDto.Username, userDto.Password);

            if (authUser == null)
                return BadRequest(new { message = "Username or password was incorrect" });

            return Ok(new
            {
                authUser.Id,
                authUser.Username,
                authUser.Email,
                authUser.Token
            });
        }

        // GET: api/User
        [HttpGet]
        [Produces(typeof(GetUserDto[]))]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUsers();

            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        [Authorize]
        [Produces(typeof(GetUserDto))]
        public async Task<IActionResult> Get(int id)
        {
            var userByID = await _userService.GetUserById(id);

            return Ok(userByID);
        }

        // POST: api/User
        [HttpPost]
        //[Produces(typeof(NewUserDto))]
        [Produces(typeof(User))]
        public async Task<IActionResult> Post(NewUserDto newUserDto)
        {
            var createdUser = await _userService.CreateUser(newUserDto);

            return Ok(createdUser);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        [Produces(typeof(UpdateUserDto))]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateUserDto userDto)
        {
            var updatedUser = await _userService.UpdateUser(id, userDto);

            return Ok(updatedUser);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletedUser = await _userService.DeleteUser(id);

            return Ok(deletedUser);
        }
    }
}
