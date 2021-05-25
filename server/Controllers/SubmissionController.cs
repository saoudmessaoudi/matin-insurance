using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace SubmissionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly SubmissionService _SubmissionService;

        public SubmissionController(SubmissionService SubmissionService)
        {
            _SubmissionService = SubmissionService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Submission>> Get() =>
            _SubmissionService.Get();

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetSubmission")]
        public ActionResult<Submission> Get(string id)
        {
            var Submission = _SubmissionService.Get(id);

            if (Submission == null)
            {
                return NotFound();
            }

            return Submission;
        }
        
        [HttpPost]
        public ActionResult<Submission> Create(Submission Submission)
        {
            _SubmissionService.Create(Submission);

            return CreatedAtRoute("GetSubmission", new { id = Submission.Id.ToString() }, Submission);
        }

        
        [Authorize]
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Submission SubmissionIn)
        {
            var Submission = _SubmissionService.Get(id);

            if (Submission == null)
            {
                return NotFound();
            }

            _SubmissionService.Update(id, SubmissionIn);

            return Ok(Submission);
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public ActionResult<Submission> Delete(string id)
        {
            var Submission = _SubmissionService.Get(id);

            if (Submission == null)
            {
                return NotFound();
            }

            _SubmissionService.Delete(Submission.Id);

            return Submission;
        }
    }
}