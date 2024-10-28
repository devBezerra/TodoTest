using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Models;
using API.Utils;
using API.Filters;

namespace API.Controllers
{
    [AuthGuard]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserService userService) : ControllerBase
    {
        private readonly UserService _userService = userService;

        [HttpGet("{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            int userId = UserHelper.GetCurrentUserId(User);
            User user = await _userService.FindById(userId);
            if (user == null)
            {
                return NotFound(new { Message = $"Usuário com {id} não encontrado." });
            }
            return Ok(user);
        }
    }
}
