export function getAppointmentsForDay (state, day) {

  const dayObject = state.days.find((dayObject) => dayObject.name === day);
  if (!dayObject) {
    return [];
  }

  const appointments = dayObject.appointments.map((appointment) => state.appointments[appointment]);
  return appointments;
}

export function getInterviewersForDay (state, day) {
  
    const dayObject = state.days.find((dayObject) => dayObject.name === day);
    if (!dayObject) {
      return [];
    }
  
    const interviewers = dayObject.interviewers.map((interviewer) => state.interviewers[interviewer]);
    return interviewers;
}

export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}


