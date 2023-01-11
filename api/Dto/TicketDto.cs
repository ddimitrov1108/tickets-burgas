namespace ticketBurgasAPI.Dto
{
    public class TicketDto
    {
        public string? barCode { get; set; }
        public int travelTime { get; set; } = 0;
        public string? issuer { get; set; }
        public bool isActive { get; set; } = false;
        public DateTime dateOfIssue { get; set; } = DateTime.Now;
        public DateTime dateOfExpire { get; set; } = DateTime.Now;
    }
}
