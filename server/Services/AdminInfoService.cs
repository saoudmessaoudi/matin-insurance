using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using MongoDB.Bson;
using System;

namespace server.Services
{

    public class AdminInfoService
    {
        private readonly IMongoCollection<AdminInfo> _AdminInfos;

        public AdminInfoService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _AdminInfos = database.GetCollection<AdminInfo>("AdminInfo");
        }

        public AdminInfo Get() =>
            _AdminInfos.Find(sub=>sub.key == "data").SingleOrDefault();

        public void Update(AdminInfo AdminInfo) {
            _AdminInfos.ReplaceOne(sub=>sub.key == "data", AdminInfo);
        }
            
        public void Delete() =>
            _AdminInfos.DeleteOne(sub=>sub.key == "data");
    }
}