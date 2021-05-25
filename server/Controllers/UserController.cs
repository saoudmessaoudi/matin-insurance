using server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using server.Services;
using System;
using System.IO;

namespace UsersApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _UserService;

        public UserController(UserService UserService)
        {
            _UserService = UserService;
        }

    
        [HttpPost]
        public ActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _UserService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("change-name")]
        public ActionResult ChangeName(ChangeNameRequest model)
        {
            var response = _UserService.ChangeName(model);

            if (response == null)
                return BadRequest("Something went wrong..." );

            return Ok(response);
        }


        [HttpPost("change-pass")]
        public ActionResult ChangePass(ChangePassRequest model)
        {
            var response = _UserService.ChangePass(model);

            if (response == null)
                return BadRequest("Old password wrong" );

            return Ok(response);
        }

        [HttpPost("change-pass-forgot")]
        public ActionResult ChangePassForgot(ChangePassByTokenModel model)
        {
            var response = _UserService.ChangePassByToken(model);

            if (response == null)
                return BadRequest("We couldn't process your request" );

            return Ok(response);
        }

        [HttpPost("change-email")]
        public ActionResult ChangeEmail(ChangeEmailRequest model)
        {
            var response = _UserService.ChangeEmail(model);

            if (response == null)
                return BadRequest("Something went wrong" );

            return Ok(response);
        }

        [HttpPost("change-avatar")]
        public ActionResult ChangeAvatar([FromForm] ChangeAvatarRequest model)
        {
            try {
                string ext = Path.GetExtension(model.FormFile.FileName);
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/profile-pics", model.id+ext);
                

                using (Stream stream = new FileStream(path, FileMode.Create)){
                    model.FormFile.CopyTo(stream);
                }
                var response = _UserService.ChangeAvatar(model.id, model.id+ext);

                if (response == null)
                    return BadRequest("Something went wrong" );

                return Ok(response);
            }catch{
                return BadRequest("Something went wrong" );
            }
            
        }
        

        [HttpPost("signup")]
        public ActionResult Signup(User user)
        {
            var response = _UserService.SignUp(user);

            if (response == null)
                return BadRequest(new { message = "Email already exists" });

            return Ok(response);
        }

        [HttpGet("generate-pass-token/{email}")]
        public ActionResult GeneratePassToken(string email)
        {
            var response = _UserService.GeneratePassToken(email);

            if (response == null)
                return NotFound(new { message = "Invalid email" });

            return Ok(response);
        }

        [HttpGet("check-pass-id/{id}")]
        public ActionResult CheckPassId(string id)
        {
            Console.WriteLine(id);
            var response = _UserService.CheckPassId(id);

            if (response == null)
                return NotFound(new { message = "Invalid ID" });

            return Ok(response);
        }
     
    }
}