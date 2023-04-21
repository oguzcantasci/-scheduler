import { useState, useEffect } from "react";
import axios from "axios";

//Custom hook that returns an object containing the state and functions that update the state for the application data
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day })); //Function that sets the day

  //Function that books an interview and updates the state accordingly by making a put request to the server and updating the state with the new appointment
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const updateSpots = (dayName, appointments) => {
    //Find the day object for the given day name
    const day = state.days.find(d => d.name === dayName);

    //Calculate the number of available spots by counting the number of appointments that don't have an interview booked
    const spots = day.appointments.reduce(
      (count, id) => (!appointments[id].interview ? count + 1 : count),
      0
    );

    //Create a new days array with the updated spots value for the given day
    const days = state.days.map(d => {
      if (d.name === dayName) {
        return { ...d, spots };
      }
      return d;
    });

    //Update the state with the new days array
    setState(prev => ({ ...prev, days }));
  };

  //Function that books an interview and updates the state accordingly by making a put request to the server and updating the state with the new appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the server with the new interview data
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        //Update the state with the new appointments object and recalculate the number of available spots for the current day
        setState(prev => ({ ...prev, appointments }));
        updateSpots(state.day, appointments);
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Update the server to delete the interview data
    return axios.delete(`/api/appointments/${id}`).then(() => {
      //Update the state with the new appointments object and recalculate the number of available spots for the current day
      setState(prev => ({ ...prev, appointments }));
      updateSpots(state.day, appointments);
    });
  };

  return { state, setDay, bookInterview, cancelInterview }; //Return the state and functions that update the state
}