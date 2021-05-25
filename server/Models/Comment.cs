using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string Id { get; set; }

        public string user_id { get; set; }

        public string user_name { get; set; }

        public string user_avatar { get; set; }

        public string comment_text { get; set; }
        
        public string video_id { get; set; }

        public string video_title { get; set; }

        public int status { get; set; }

        public DateTime date { get; set; }

        public override string ToString() {
            return "\n\n" + 
                "Client Name: " + user_name + "\n"+
                "Comment: \"" + comment_text + "\"\n"+
                "Video: " + video_title + "\n";
        }

    }
}