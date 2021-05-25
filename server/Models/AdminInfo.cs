using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class AdminInfo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string key { get; set; }
        public string address { get; set; }
        public string phone {get; set;}
        public string city {get; set;}
        public string country {get; set;}
        public string postal_code {get; set;}

    }
    
}