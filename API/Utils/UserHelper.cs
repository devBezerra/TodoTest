using System.Security.Claims;

namespace API.Utils
{
    public static class UserHelper
    {
        public static int GetCurrentUserId(ClaimsPrincipal user)
        {
            var userIdClaim = (user.Claims.FirstOrDefault(c => c.Type == "id")?.Value) ?? throw new Exception("User Id não encontrado.");
            return int.Parse(userIdClaim);
        }
    }
}