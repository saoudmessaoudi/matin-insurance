using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Submission
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string Id { get; set; }

        public string client_id {get; set;}
        public string name {get; set;}
        public string email {get; set;}
        public string phone {get; set;}
        public string answer1 {get; set;}
        public string answer2 {get; set;}
        public string answer3 {get; set;}
        public string answer4 {get; set;}


    }
}