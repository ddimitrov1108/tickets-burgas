using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Globalization;
using System.Security.Claims;
using System.Text.Json.Nodes;
using ticketBurgasAPI.Data;
using ticketBurgasAPI.Dto;
using ticketBurgasAPI.Models;
using ticketBurgasAPI.Utils;

namespace ticketBurgasAPI.Controllers
{
    [Authorize]
    [Route("/tickets")]
    public class BusTicketsController : Controller
    {
        private readonly TicketBurgasDbContext context;
        private readonly IConfiguration config;
        private readonly CultureInfo dateCultureComparator = CultureInfo.GetCultureInfo("en-US");
        private Jwt jwt;

        public BusTicketsController(TicketBurgasDbContext _context, IConfiguration _config)
        {
            context = _context;
            config = _config;
            jwt = new Jwt(_config);
        }

        private string generateBarCode()
        {
            string barCode = "";
            Random ran = new Random();
            string b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const int barCodeLength = 12;

            for (int i = 0; i < barCodeLength; i++)
                barCode += b.ElementAt(ran.Next(b.Length));

            return barCode;
        }

        [HttpGet("fetch")]
        public async Task<ActionResult> FetchTickets()
        {
            var userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
            DateTime now = DateTime.Now;

            if (user == null)
                return NotFound();

            var tickets = context.BusTickets
                .Where(ticket => ticket.Uid == user.Id)
                .OrderByDescending(tickets => tickets.DateOfIssue)
                .Join(context.BusTicketDetails,
                    ticket => ticket.Tdid,
                    ticketDetails => ticketDetails.Id,
                    (ticket, ticketDetails) => new TicketDto
                    {
                        barCode = ticket.BarCode,
                        travelTime = ticketDetails.TravelTime,
                        issuer = ticketDetails.Issuer,
                        dateOfIssue = ticket.DateOfIssue,
                        dateOfExpire = ticket.DateOfExpire,
                        isActive = ticket.DateOfExpire > now,
                    });

            return Ok(tickets);
        }

        [HttpGet("active")]
        public async Task<ActionResult<bool>> HasActiveTicket()
        {
            var userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            int hasActiveTickets = await context.BusTickets.Where(ticket => ticket.Uid == user.Id && DateTime.Compare(DateTime.Now, ticket.DateOfExpire) <= 0).CountAsync();
            return Ok(hasActiveTickets);
        }

        [HttpPost("buy/{ticketId}")]
        public async Task<ActionResult> BuyTicket([FromRoute] int ticketId)
        {
            var userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.SerialNumber));
            User? user = await context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            var travelTime = await context.BusTicketDetails
                .Where(ticketDetails => ticketDetails.Id == ticketId)
                .Select(ticketDetails => ticketDetails.TravelTime)
                .FirstOrDefaultAsync();

            if (travelTime <= 0)
                return BadRequest();

            BusTicket newTicket = new BusTicket();
            newTicket.BarCode = generateBarCode();
            newTicket.Uid = user.Id;
            newTicket.Tdid = ticketId;
            newTicket.DateOfIssue = DateTime.Now;
            newTicket.DateOfExpire = DateTime.Now.AddMinutes((double) travelTime);

            context.BusTickets.Add(newTicket);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
