using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ChangePassByTokenModel
    {
        [Required]
        public string token { get; set; }

        [Required]
        public string password { get; set; }
    }
}