using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;

namespace CommentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _CommentService;

        public CommentController(CommentService CommentService)
        {
            _CommentService = CommentService;
        }

        [HttpGet]
        public ActionResult<List<Comment>> Get() =>
            _CommentService.Get();

        [HttpGet("{id}", Name = "GetComment")]
        public ActionResult<Comment> Get(string id)
        {
            var Comment = _CommentService.Get(id);

            if (Comment == null)
            {
                return NotFound();
            }

            return Comment;
        }

        [HttpGet("by-video/{id}")]
        public ActionResult<List<Comment>> GetByVideo(string id)
        {
            var Comment = _CommentService.GetByVideo(id);

            if (Comment == null)
            {
                return NotFound();
            }

            return Comment;
        }
        
        //[Authorizeg]
        [HttpPost]
        public ActionResult<Comment> Create(Comment Comment)
        {
            _CommentService.Create(Comment);

            return CreatedAtRoute("GetComment", new { id = Comment.Id.ToString() }, Comment);
        }

        [Authorize]
        [HttpPut]
        public ActionResult<Comment> Update(Comment CommentIn)
        {
            var Comment = _CommentService.Get(CommentIn.Id);

            if (Comment == null)
            {
                return NotFound();
            }

            _CommentService.Update(CommentIn.Id, CommentIn);

            return CommentIn;
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Comment = _CommentService.Get(id);

            if (Comment == null)
            {
                return NotFound();
            }

            _CommentService.Delete(Comment.Id);

            return NoContent();
        }
    }
}