using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Stats
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string Id { get; set; }

        public string type {get; set;}

        public string title {get; set;}

        public string description {get; set;}

        public string size {get; set;}

        public string color {get; set;}

        public int value {get; set;}

        public int previous {get; set;}

        public string comparison {get; set;}

        public string icon {get; set;}

        public DateTime last_update {get; set;}

    }
}