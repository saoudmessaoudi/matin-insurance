using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;
using System.Text.Json;

namespace AdminInfosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminInfoController : ControllerBase
    {
        private readonly AdminInfoService _AdminInfoService;

        public AdminInfoController(AdminInfoService AdminInfoService)
        {
            _AdminInfoService = AdminInfoService;
        }

        [HttpGet]
        public ActionResult<AdminInfo> Get()
        {
            var AdminInfo = _AdminInfoService.Get();

            if (AdminInfo == null)
            {
                return NotFound();
            }

            return AdminInfo;
        }

        [Authorize]
        [HttpPut]
        public ActionResult<AdminInfo> Update(AdminInfo body)
        {

            var AdminInfo = _AdminInfoService.Get();

            if (AdminInfo == null)
            {
                return NotFound();
            }

            _AdminInfoService.Update(body);

            return body;
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Delete()
        {
            var AdminInfo = _AdminInfoService.Get();

            if (AdminInfo == null)
            {
                return NotFound();
            }

            _AdminInfoService.Delete();

            return NoContent();
        }
    }
}