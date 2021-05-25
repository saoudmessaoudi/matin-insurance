using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ChangeEmailRequest
    {
        [Required]
        public string id { get; set; }

        [Required]
        public string email { get; set; }
    }
}