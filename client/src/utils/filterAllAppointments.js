export default function filterAllAppointments (appointments){
  
    var allAppointments = [];
    var appointmentsAccepted = [];
    var appointmentsWaiting = [];
    var appointmentsCanceled = [];
    appointments.map(appointment => {

        if (appointment.status === 0) {
                appointmentsWaiting.push(appointment);
            }
        if (appointment.status === 1) {
                appointmentsAccepted.push(appointment);
            }
        if (appointment.status === 2) {
                appointmentsCanceled.push(appointment);
            }
        
            allAppointments = appointmentsWaiting.concat(appointmentsAccepted, appointmentsCanceled);

    })
    console.log(allAppointments);
    return allAppointments;
  }