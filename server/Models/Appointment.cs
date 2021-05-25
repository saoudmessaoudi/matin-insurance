using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Appointment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        
        public int status { get; set; }

        public string client_id { get; set; }

        public string client_name { get; set; }

        public string client_email { get; set; }

        public string type { get; set; }

        public string phone {get; set;}

        public DateTime date { get; set; }

        public override string ToString() {
            return "\n\n" + 
                "Client Name: " + client_name + "\n"+
                "Client Email: " + client_email + "\n"+
                "Phone number: " + phone + "\n" + 
                "Type of service: " + type + "\n"+
                "Date: " + date + "\n";
        }

    }
}