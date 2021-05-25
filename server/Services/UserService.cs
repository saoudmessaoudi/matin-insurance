using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using server.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Http;

namespace server.Services
{
    public class UserService 
    {
        private readonly IMongoCollection<User> _Users;
        private readonly IMongoCollection<Stats> _Stats;
        private readonly AppSettings _appSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IDatabaseSettings settings, IOptions<AppSettings> appSettings, IHttpContextAccessor httpContextAccessor)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
        
            _Users = database.GetCollection<User>("Users");
            _Stats = database.GetCollection<Stats>("Stats");
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _Users.Find(x => x.email == model.email).SingleOrDefault();
            if (user == null) return null;


            bool verified = BC.Verify(model.password, user.password);
            if (!verified) return null;


            var token = generateJwtToken(user);

            return new AuthenticateResponse(token);
        }

        public string ChangePass(ChangePassRequest model)
        {
            var user = _Users.Find(x => x.Id == model.id).SingleOrDefault();
            if (user == null) return null;


            bool verified = BC.Verify(model.old, user.password);
            if (!verified) return null;

            String salt = BC.GenerateSalt(10);
            user.password = BC.HashPassword(model.password, salt);

            _Users.ReplaceOne(sub => sub.Id == model.id, user);


            return generateJwtToken(user);
        }

        public string ChangePassByToken(ChangePassByTokenModel model)
        {
            if(model.token == "") return null;
            var user = _Users.Find(x => x.changePassToken == model.token).SingleOrDefault();
            if (user == null) return null;

            String salt = BC.GenerateSalt(10);
            user.password = BC.HashPassword(model.password, salt);
            user.changePassToken = "";

            _Users.ReplaceOne(sub => sub.changePassToken == model.token, user);

            return generateJwtToken(user);
        }

        public string ChangeEmail(ChangeEmailRequest model)
        {
            var user = _Users.Find(x => x.Id == model.id).SingleOrDefault();
            if (user == null) return null;


            user.email = model.email;

            _Users.ReplaceOne(sub => sub.Id == model.id, user);


            return generateJwtToken(user);
        }

        public string ChangeName(ChangeNameRequest model)
        {
            var user = _Users.Find(x => x.Id == model.id).SingleOrDefault();
            if (user == null) return null;


            user.name = model.name;

            _Users.ReplaceOne(sub => sub.Id == model.id, user);


            return generateJwtToken(user);
        }
        public string ChangeAvatar(string id, string avatar){
            var user = _Users.Find(x => x.Id == id).SingleOrDefault();
            if (user == null) return null;


            user.profile_img = avatar;

            _Users.ReplaceOne(sub => sub.Id == id, user);

            return generateJwtToken(user);
        }

        public AuthenticateResponse SignUp(User newUser)
        {
            String salt = BC.GenerateSalt(10);
            newUser.password = BC.HashPassword(newUser.password, salt);            
            try{
                _Users.InsertOne(newUser);
                Stats stat = _Stats.Find(sub=>sub.type == "visitors").SingleOrDefault();
                if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                    stat.previous = stat.value;
                    stat.last_update = DateTime.Now;
                }
                stat.value++;
                _Stats.ReplaceOne(sub => sub.type == "visitors", stat);
            }catch(Exception e){
                return null;
            }

            var token = generateJwtToken(newUser);

            return new AuthenticateResponse(token);
        }

        public string CheckPassId(string id)
        {
            if(id == "") return null;

            var user = _Users.Find(x => x.changePassToken == id).SingleOrDefault();
            if (user == null) return null;

            return "found";
        }

        public string GeneratePassToken(string email){
            Guid guid = Guid.NewGuid();
            string token = guid.ToString();
            var user = _Users.Find(x => x.email == email).SingleOrDefault();
            if (user == null) return null;

            user.changePassToken = token;
            string host = _httpContextAccessor.HttpContext.Request.Host.Value;
            EmailService.Send("Reset your password", "Your password reset link is: http://" + host+"/auth/forgot/restore/" + token, new string[]{user.email});

            _Users.ReplaceOne(sub => sub.email == email, user);
            return "generated";
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()),  new Claim("name", user.name.ToString()), new Claim("profile_img", user.profile_img.ToString()), new Claim("email", user.email.ToString()), new Claim("admin", user.admin.ToString()) }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User GetById(string id)
        {
            return _Users.Find(x => x.Id == id).FirstOrDefault();
        }
    }
}