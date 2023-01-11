using System;
using System.Collections.Generic;

namespace ticketBurgasAPI.Models
{
    public partial class BusTicket
    {
        public string BarCode { get; set; } = null!;
        public int Uid { get; set; }
        public int Tdid { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime DateOfExpire { get; set; }

        public virtual BusTicketDetail Td { get; set; } = null!;
        public virtual User UidNavigation { get; set; } = null!;
    }
}
