using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ticketBurgasAPI.Data;
using ticketBurgasAPI.Dto;
using ticketBurgasAPI.Models;
using ticketBurgasAPI.Utils;

namespace ticketBurgasAPI.Controllers
{
    [Authorize]
    [Route("/user")]
    public class UserController : Controller
    {
        private readonly TicketBurgasDbContext context;
        private readonly IConfiguration config;
        private readonly string userNotFoundMessage = "Потребителят не може да бъде намерен";
        private readonly string badRequestMessage = "Невалидни данни";
        private Jwt jwt;
        private RegexValidation regex;

        public UserController(TicketBurgasDbContext _context, IConfiguration _config)
        {
            context = _context;
            config = _config;
            jwt = new Jwt(_config);
            regex = new RegexValidation();
        }

        [HttpGet("fetch")]
        public async Task<ActionResult<UserDto>> UserFetch()
        {
            var userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();

            if (user == null)
                return NotFound(userNotFoundMessage);

            return Ok(new UserDto
            {
                id = user.Id,
                email = user.Email,
                fullName = $"{user.FirstName} {user.LastName}"
            });
        }

        [HttpPost("update/name")]
        public async Task<ActionResult> UserUpdateNames([FromBody] UserChangeNamesDto data)
        {
            if (data.FirstName == null || data.LastName == null || !regex.Name.IsMatch($"{data.FirstName} {data.LastName}"))
                return BadRequest(badRequestMessage);

            var id = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));

            User? user = await context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user == null)
                return NotFound(userNotFoundMessage);

            if (!BCrypt.Net.BCrypt.Verify(data.CurrentPassword, user.Password))
                return BadRequest(badRequestMessage);

            user.FirstName = data.FirstName;
            user.LastName = data.LastName;
            context.Update(user);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("update/password")]
        public async Task<ActionResult> UserUpdatePassword([FromBody] UserChangePasswordDto data)
        {
            if (data.CurrentPassword == null || data.NewPassword == null || data.ConfirmNewPassword == null ||
                !regex.Password.IsMatch(data.CurrentPassword) || !regex.Password.IsMatch(data.NewPassword) ||
                !regex.Password.IsMatch(data.ConfirmNewPassword) || !data.NewPassword.Equals(data.ConfirmNewPassword))
            {
                return BadRequest(badRequestMessage);
            }

            var id = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound(userNotFoundMessage);

            if (!BCrypt.Net.BCrypt.Verify(data.CurrentPassword, user.Password))
                return BadRequest(badRequestMessage);

            user.Password = BCrypt.Net.BCrypt.HashPassword(data.NewPassword);
            context.Update(user);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("deactivate")]
        public async Task<ActionResult> DeactivateUserAccount()
        {
            var id = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return Ok();
        }
    }
}
