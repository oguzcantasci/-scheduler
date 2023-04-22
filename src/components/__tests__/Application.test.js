import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryAllByTestId, queryByAltText, getByTestId } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // *Render the Application.
    const { container, debug } = render(<Application />);

    // *Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // *Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // *Check confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete this appointment?")
    ).toBeInTheDocument();

    // *Click the "Confirm".
    fireEvent.click(queryByText(appointment, "Confirm"));

    // *Check "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // *Wait until "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // *Check that the DayListItem "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // *Render the Application.
    const { container, debug } = render(<Application />);

    // *Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // *Click the "Edit" button on the booked appointment.
    const appointment = queryAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // *Check that the form is shown.
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();

    // *Change the name and interviewer.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // *Click the "Save" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Save"));

    // *Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // *Wait until the element with the "Edit" button is displayed.
    waitForElement(() => getByAltText(appointment, "Edit"));

    // *Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // *Render the Application.
    const { container, debug } = render(<Application />);


    // *Wait until the text "Archie Cohen" is displayed.
    try {
      await waitForElement(() => getByText(container, "Archie Cohen"));
    } catch (err) {
      console.log(err);
    }

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // *Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));


    // *Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });


    // *Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));


    // *Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // *Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // *Check that the error element is displayed
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // *Render the application
    const { container, debug } = render(<Application />);
    // *Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // *Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // *Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete this appointment?")).toBeInTheDocument();

    // *Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // *Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // *Wait until the element with the text "Error" is displayed.
    await waitForElement(() => getByText(appointment, "Error"));

    // *Click the "Close" button on the error.
    fireEvent.click(getByAltText(appointment, "Close"));

    // *Check that the element with the text "Archie Cohen" is displayed.
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});