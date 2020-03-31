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
        [Produces(typeof(AuthenticatedUserDto))]
        [Route("auth")] 
        public async Task<IActionResult> Authenticate(LoginUserDto userDto)
        {
            var authUser = await _userService.Authenticate(userDto.Username, userDto.Password);

            if (authUser == null)
                return BadRequest(new { message = "Username or password was incorrect" });

            return Ok(authUser);
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

            if (userByID == null)
                return NotFound(new { message = "User with the given id was not found"});

            return Ok(userByID);
        }

        // POST: api/User
        [HttpPost]
        //[Produces(typeof(NewUserDto))]
        [Produces(typeof(User))]
        public async Task<IActionResult> Post(NewUserDto newUserDto)
        {
            User createdUser;

            try
            {
                createdUser = await _userService.CreateUser(newUserDto);

                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        [Produces(typeof(UpdateUserDto))]
        public async Task<IActionResult> Put(int id, [FromBody] string userJson)
        {
            var userDto = Newtonsoft.Json.JsonConvert.DeserializeObject<UpdateUserDto>(userJson);

            UpdateUserDto updatedUser;
            try
            {
                updatedUser = await _userService.UpdateUser(id, userDto);
                if (updatedUser == null)
                    throw new Exception("User with the given id was not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(updatedUser);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isDeleted = await _userService.DeleteUser(id);

            if (!isDeleted)
                return NotFound(new { message = "User with the given id was not found" });

            return Ok();
        }
    }
}
