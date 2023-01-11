using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ticketBurgasAPI.Models;

namespace ticketBurgasAPI.Utils
{
    public class Jwt
    {
        private readonly IConfiguration config;
        public static User? user = new User();

        public Jwt(IConfiguration _config)
        {
            config = _config;
        }

        private JwtSecurityToken? DecriptJwt(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token,
                    new TokenValidationParameters()
                    {
                        ValidateLifetime = false,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidIssuer = config.GetSection("AppSettings:Issuer").Value,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value)),
                    },
                    out SecurityToken validatedToken
                );

                return (JwtSecurityToken)validatedToken;
            }
            catch
            {
                return null;
            }
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.SerialNumber, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                issuer: config.GetSection("AppSettings:Issuer").Value,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string RefreshToken(string token, User user)
        {
            return "";
        }



        //public bool ValidateToken(string token)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    var jwt = DecriptJwt(token);

        //    if (jwt == null)
        //        return false;

        //    DateTime tokenExpiresIn = new DateTime(long.Parse(jwt.Claims.First(x => x.Type == "expiresIn").ToString().Split(": ")[1]));
        //    return tokenExpiresIn > DateTime.Now;
        //}

        //public bool ValidateRoles(string token, TicketBurgasDbContext context)
        //{
        //    var jwt = DecriptJwt(token);

        //    if (jwt == null)
        //        return false;

        //    try
        //    {
        //        var userId = int.Parse(jwt.Claims.First(x => x.Type == "id").Value);
        //        user = context.Users.Where(u => u.Id == userId).First();

        //        if (user == null)
        //            return false;

        //        return user.IsAdmin == true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }
}
