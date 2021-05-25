using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ChangePassRequest
    {
        [Required]
        public string id { get; set; }

        [Required]
        public string old { get; set; }

        [Required]
        public string password { get; set; }
    }
}