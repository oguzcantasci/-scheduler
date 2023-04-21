import React from "react";
import DayListItem from "./DayListItem";

//DayList component that takes in props and returns a list of DayListItem components
export default function DayList(props) {
  const days = props.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  ));
  return <ul>{days}</ul>;
}