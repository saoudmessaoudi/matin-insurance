export default function userAppointments(appointments, userID){

    var userAppointments = [];
    var userAppointmentsWaiting = [];
    var userAppointmentsAccepted = [];
    var userAppointmentsCanceled = [];

    appointments.map(appointment => {
        
            if (appointment.client_id === userID) {
                if(appointment.status === 0)
                userAppointmentsWaiting.push(appointment);
                if(appointment.status === 1)
                userAppointmentsAccepted.push(appointment);
                if(appointment.status === 2)
                userAppointmentsCanceled.push(appointment);

            }

        
            userAppointments = userAppointmentsAccepted.concat(userAppointmentsWaiting, userAppointmentsCanceled);

    })

    return userAppointments;
  }