import React from "react";

import "components/Appointment/styles.scss";
import Confirm from "./Confirm";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";

  const save = (name, interviewer) => {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  const onDelete = () => {
    transition(CONFIRMING);
  };

  const edit = () => {
    transition(EDIT);
  };


  const deleteAppointment = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  };
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CONFIRMING && (
        <Confirm
          message="Are you sure you would like to delete this appointment?"
          onCancel={() => {
            back();
          }}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === SAVING && <Status message ='Saving' />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETING && <Status message ='Deleting' />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}

        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={edit}
        />
      )}
    </article>
  )
}