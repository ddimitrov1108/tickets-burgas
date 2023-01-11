using System;
using System.Collections.Generic;

namespace ticketBurgasAPI.Models
{
    public partial class User
    {
        public User()
        {
            BusTickets = new HashSet<BusTicket>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool Deactivated { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<BusTicket> BusTickets { get; set; }
    }
}
