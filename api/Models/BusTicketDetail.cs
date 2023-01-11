using System;
using System.Collections.Generic;

namespace ticketBurgasAPI.Models
{
    public partial class BusTicketDetail
    {
        public BusTicketDetail()
        {
            BusTickets = new HashSet<BusTicket>();
        }

        public int Id { get; set; }
        public int TravelTime { get; set; }
        public double Cost { get; set; }
        public string Issuer { get; set; } = null!;

        public virtual ICollection<BusTicket> BusTickets { get; set; }
    }
}
