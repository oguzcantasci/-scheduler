export function getAppointmentsForDay (state, day) {

  const dayObject = state.days.find((dayObject) => dayObject.name === day);
  if (!dayObject) {
    return [];
  }

  const appointments = dayObject.appointments.map((appointment) => state.appointments[appointment]);
  return appointments;
}


