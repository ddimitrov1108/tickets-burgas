using System.Text.RegularExpressions;

namespace ticketBurgasAPI.Utils
{
    public class RegexValidation
    {
        public readonly Regex Name = new Regex(@"^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");
        public readonly Regex Email = new Regex(@"^(?!.*@[^,]*,)");
        public readonly Regex Password = new Regex(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");
    }
}
