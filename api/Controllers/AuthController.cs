using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ticketBurgasAPI.Data;
using ticketBurgasAPI.Dto;
using ticketBurgasAPI.Models;
using ticketBurgasAPI.Utils;
using Microsoft.AspNetCore.Authorization;

namespace ticketBurgasAPI.Controllers
{
    [Route("/auth")]
    public class AuthController : Controller
    {
        private readonly TicketBurgasDbContext context;
        private readonly IConfiguration config;
        private readonly string userNotFoundMessage = "Потребителят не може да бъде намерен";
        private readonly string emailIsUsedMessage = "Този имейл адрес е зает";
        private readonly string wrongEmailOrPasswordMessage = "Грешен имейл адрес или парола";
        private readonly string badRequestMessage = "Невалидни данни";
        private Jwt jwt;
        private RegexValidation regex;

        public AuthController(TicketBurgasDbContext _context, IConfiguration _config)
        {
            context = _context;
            config = _config;
            jwt = new Jwt(_config);
            regex = new RegexValidation();
        }

        [Authorize]
        [HttpPost("refresh")]
        public async Task<ActionResult> RefreshToken()
        {
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<JsonContent>> UserLogin([FromBody] UserLoginDto data)
        {
            if (data.Email == null || data.Password == null || !regex.Email.IsMatch(data.Email) || !regex.Password.IsMatch(data.Password))
                return BadRequest(badRequestMessage);

            User? user = await context.Users.Where(user => user.Email == data.Email).FirstOrDefaultAsync();

            if (user == null)
                return NotFound(userNotFoundMessage);

            if (!BCrypt.Net.BCrypt.Verify(data.Password, user.Password))
                return Unauthorized(wrongEmailOrPasswordMessage);

            HttpContext.Response.Headers.Add("Authorization", jwt.CreateToken(user));
            return Ok();
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> UserRegister([FromBody] UserRegisterDto data)
        {
            if (data.FirstName == null || data.LastName == null || data.Email == null || data.Password == null ||
                !regex.Name.IsMatch($"{data.FirstName} {data.LastName}") ||
                !regex.Email.IsMatch(data.Email) || !regex.Password.IsMatch(data.Password))
            {
                return BadRequest(badRequestMessage);
            }

            User? user = await context.Users.Where(user => user.Email == data.Email).FirstOrDefaultAsync();

            if (user != null)
                return BadRequest(emailIsUsedMessage);

            user = new User
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                Email = data.Email,
                Deactivated = false,
                Password = BCrypt.Net.BCrypt.HashPassword(data.Password)
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            HttpContext.Response.Headers.Add("Authorization", jwt.CreateToken(user));
            return Ok();
        }

        [HttpPost("password-reset")]
        public async Task<ActionResult> UserChangePasswordRequest([FromBody] string Email)
        {
            return Ok();
        }
    }
}
