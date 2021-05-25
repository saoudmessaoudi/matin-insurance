using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using System;

namespace server.Services
{

    public class CommentService
    {
        private readonly IMongoCollection<Comment> _Comments;
        private readonly IMongoCollection<Stats> _Stats;

        public CommentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Comments = database.GetCollection<Comment>("Comments");
            _Stats = database.GetCollection<Stats>("Stats");
        }
 
        public Comment Create(Comment Comment)
        {
            _Comments.InsertOne(Comment);
            Stats stat = _Stats.Find(sub=>sub.type == "comments").SingleOrDefault();
            if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) < 0){
                stat.last_update = DateTime.Now;
            }
            stat.value++;
            _Stats.ReplaceOne(sub => sub.type == "comments", stat);
            EmailService.Send("NEW COMMENT", "A NEW COMMENT REQUIRES APPROVAL: " + Comment, new string[]{"saoudmessaoudi@hotmail.fr"});
            return Comment;
        }

        public List<Comment> Get() {
                var comments = _Comments.Find(sub => true).Sort("{date: -1}").ToList();
                return  comments  ;
        }

        public Comment Get(string id) =>
            _Comments.Find(sub=>sub.Id == id).SingleOrDefault();

        public List<Comment> GetByVideo(string id) =>
            _Comments.Find(sub=>sub.video_id == id).Sort("{date: -1}").ToList();

        public void Update(string id, Comment Comment) {
            if(Comment.status != 0){
                Stats stat = _Stats.Find(sub=>sub.type == "comments").SingleOrDefault();
                stat.value--;
                if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                    stat.last_update = DateTime.Now;
                }
                _Stats.ReplaceOne(sub => sub.type == "comments", stat);
            }
            _Comments.ReplaceOne(sub => sub.Id == id, Comment);
        }

        public void Delete(string id) {
            Comment comment = Get(id);
            if(comment.status == 0){
                Stats stat = _Stats.Find(sub=>sub.type == "comments").SingleOrDefault();
                stat.value--;
                if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                    stat.last_update = DateTime.Now;
                }
                _Stats.ReplaceOne(sub => sub.type == "comments", stat);
            }
            _Comments.DeleteOne(sub => sub.Id == id);
        }
    }
}