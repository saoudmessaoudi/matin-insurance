using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace server.Models
{
    public class ChangeAvatarRequest
    {
        [Required]
        public string id { get; set; }

        [Required]
        public IFormFile FormFile { get; set; }
    }
}