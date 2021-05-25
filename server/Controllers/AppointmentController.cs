using server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Services;
using System.Text.Json;

namespace AppointmentsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _AppointmentService;

        public AppointmentController(AppointmentService AppointmentService)
        {
            _AppointmentService = AppointmentService;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<List<Appointment>> Get() =>
            _AppointmentService.Get();

        [HttpGet("times")]
        public ActionResult<List<AppointmentTimes>> GetTimes() =>
            _AppointmentService.GetTimes();

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetAppointment")]
        public ActionResult<Appointment> Get(string id)
        {
            var Appointment = _AppointmentService.Get(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            return Appointment;
        }

        [HttpPost]
        public ActionResult<Appointment> Create(Appointment Appointment)
        {
            _AppointmentService.Create(Appointment);

            return CreatedAtRoute("GetAppointment", new { id = Appointment.Id.ToString() }, Appointment);
        }

        [Authorize]
        [HttpPut]
        public ActionResult<Appointment> Update(Appointment body)
        {

            var Appointment = _AppointmentService.Get(body.Id);

            if (Appointment == null)
            {
                return NotFound();
            }

            _AppointmentService.Update(body.Id, body);

            return body;
        }

        [Authorize]
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Appointment = _AppointmentService.Get(id);

            if (Appointment == null)
            {
                return NotFound();
            }

            _AppointmentService.Delete(Appointment.Id);

            return NoContent();
        }
    }
}