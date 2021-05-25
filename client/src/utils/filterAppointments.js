export default function filterAppointments (appointments, max){
    if(!max) max=5
    var waitingAppointments = [];
    appointments.map(appointment => {
        if(max>0) {
            if (appointment.status === 0) {
                waitingAppointments.push(appointment);
                max--;
            }
        }

    })

    return waitingAppointments;
  }