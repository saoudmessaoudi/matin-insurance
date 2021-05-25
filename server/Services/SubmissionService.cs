using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{

    public class SubmissionService
    {
        private readonly IMongoCollection<Submission> _Submission;

        public SubmissionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Submission = database.GetCollection<Submission>("Submission");
        }
 
        public Submission Create(Submission Submission)
        {
            _Submission.InsertOne(Submission);
            return Submission;
        }

        public List<Submission> Get() =>
            _Submission.Find(sub => true).ToList();

        public Submission Get(string id) =>
            _Submission.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Submission Submission) =>
            _Submission.ReplaceOne(sub => sub.Id == id, Submission);

        public void Delete(string id) =>
            _Submission.DeleteOne(sub => sub.Id == id);
    }
}