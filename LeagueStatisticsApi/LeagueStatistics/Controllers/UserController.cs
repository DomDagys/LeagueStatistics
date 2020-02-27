using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LeagueStatistics.Database.Models;
using LeagueStatistics.Dtos.UserDtos;
using LeagueStatistics.Services.Interfaces;
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
        public async Task<IActionResult> Authenticate(AuthUserDto userDto)
        {
            var user = await _userService.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password was incorrect" });

            return Ok(new
            {
                user.Id,
                user.Username,
                Token = "dariaus-fakejwt-token-labaiprase"
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
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }

        // POST: api/User
        [HttpPost]
        [Produces(typeof(NewUserDto))]
        public async Task<IActionResult> Post(NewUserDto newUserDto)
        {
            var createdUser = await _userService.CreateUser(newUserDto);

            return Ok(createdUser);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
        }
    }
}
