using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class StatsService
    {
        private readonly IMongoCollection<Stats> _Stats;

        public StatsService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Stats = database.GetCollection<Stats>("Stats");
        }
 
        public Stats Create(Stats Stats)
        {
            _Stats.InsertOne(Stats);
            return Stats;
        }

        public List<Stats> Get() =>
            _Stats.Find(sub => true).ToList();

        public Stats Get(string id) =>
            _Stats.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Stats Stats) =>
            _Stats.ReplaceOne(sub => sub.Id == id, Stats);

        public void Delete(string id) =>
            _Stats.DeleteOne(sub => sub.Id == id);
    }
}