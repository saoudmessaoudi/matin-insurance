using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class AppointmentTimes
    {
        public AppointmentTimes(DateTime date){
            this.date = date;
        }
        public DateTime date { get; set; }

    }
}