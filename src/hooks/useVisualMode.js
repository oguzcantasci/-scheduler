import { useState } from 'react';

//useVisualMode custom hook that takes in initialMode and returns an object with mode, transition, and back functions
export default function useVisualMode(initialMode) {
  //mode state is set to initialMode and history state is set to an array with initialMode
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //transition function that takes in a mode and a boolean value for replace and sets the mode state to the given mode and updates the history state accordingly
  function transition(mode, replace = false) {
    if (replace) {
      const newHistory = [...history.slice(0, -1), mode];
      setHistory(newHistory);
    } else {
      setHistory([...history, mode]);
    }
    setMode(mode);
  }

  //back function that sets the mode state to the previous mode in the history state
  function back() {
    //Only go back if there is more than one mode in the history state
    if (history.length > 1) {
      const newHistory = [...history.slice(0, -1)];
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  return { mode, transition, back }; //Return an object with mode, transition, and back functions
}