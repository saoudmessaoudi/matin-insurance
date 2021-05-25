using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ChangeNameRequest
    {
        [Required]
        public string id { get; set; }

        [Required]
        public string name { get; set; }

    }
}