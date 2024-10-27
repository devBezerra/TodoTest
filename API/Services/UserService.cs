using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Data;

namespace API.Services
{
    public class UserService(AppDbContext context, IConfiguration configuration)
    {
        private readonly AppDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        public async Task<bool> RegisterUser(string name, string password, string confirmPassword)
        {
            if (password != confirmPassword)
                return false;

            var passwordHash = ComputeHash(password);

            var user = new User { Name = name, Password = passwordHash };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string> Authenticate(string name, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Name == name);
            if (user == null || user.Password != ComputeHash(password))
                return null;

            return GenerateJwtToken(user);
        }

        private static string ComputeHash(string password)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Name)
            };

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
