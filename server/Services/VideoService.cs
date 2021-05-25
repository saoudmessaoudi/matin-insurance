using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class VideoService
    {
        private readonly IMongoCollection<Video> _Videos;

        public VideoService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Videos = database.GetCollection<Video>("Videos");
        }
 
        public Video Create(Video Video)
        {
            _Videos.InsertOne(Video);
            return Video;
        }

        public List<Video> Get() =>
            _Videos.Find(sub => true).ToList();

        public Video Get(string id) =>
            _Videos.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Video Video) =>
            _Videos.ReplaceOne(sub => sub.Id == id, Video);

        public void Delete(string id) =>
            _Videos.DeleteOne(sub => sub.Id == id);
    }
}