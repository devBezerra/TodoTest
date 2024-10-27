using Microsoft.AspNetCore.Mvc;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserService userService) : ControllerBase
    {
        private readonly UserService _userService = userService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto request)
        {
            if (await _userService.RegisterUser(request.Name, request.Password, request.ConfirmPassword))
                return Ok(new { Message = "Usuário registrado com sucesso!" });
            return BadRequest(new { Message = "Senhas não coincidem." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var token = await _userService.Authenticate(request.Name, request.Password);
            if (token == null)
                return Unauthorized(new { Message = "Credenciais Invalidas" });

            return Ok(new { Token = token });
        }
    }

    public class RegisterUserDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class LoginDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

}
