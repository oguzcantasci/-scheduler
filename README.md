# Interview Scheduler

## Introduction

Interview Scheduler is here! A modern, React-based scheduler app that enables the user to book, edit and cancel interviews.

<img width="1713" alt="Screen Shot 2023-03-22 at 19 45 04" src="https://user-images.githubusercontent.com/36883798/227063502-7b2c5a8c-0f64-45ba-8da7-fb968c0db1ac.png">

<img width="1713" alt="Screen Shot 2023-03-22 at 19 45 13" src="https://user-images.githubusercontent.com/36883798/227063631-4f705559-3a15-408a-b00b-8844956f9385.png">

## How To Use
### Book an Interview
- Click on any available spot on the calendar. 
- Type in the name of the interviewee's name and select an interviewer.
- If no spots are available, feel free to choose another day from the list!

![BOOK GIF](https://raw.githubusercontent.com/oguzcantasci/scheduler/master/docs/Book.gif)

### Edit an Interview
- Hover over the appointment you wish to edit
- Click the edit button
- Make changes
- Save!

![EDIT GIF](https://raw.githubusercontent.com/oguzcantasci/scheduler/master/docs/Edit.gif)

### Delete an Interview
- Hover over the appointment you wish to delete
- Click the delete button
- Confirm!

![DELETE GIF](https://raw.githubusercontent.com/oguzcantasci/scheduler/master/docs/Delete.gif)

## Stack
Interview Scheduler is a web application that uses modern React programming techniques like functional components and hooks. It consists of a front-end built using HTML, SCSS, and React, and a back-end that uses Node, Express, and PostgreSQL.

### Dependencies
Dependencies installed that are required to use the Interview Scheduler is as follows:

Install dependencies with `npm install`.

- react 16.9.0 or above
- react-dom 16.9.0 or above
- react-scripts 3.4.4 or above
- axios 1.3.4 or above
- classnames
- express
- node.js
- postgreSQL

### Testing
A thorough testing of Interview Scheduler was done with the following technologies. 

Install dependencies with `npm install`.

- Storybook (unit testing)
- Jest (unit and integration testing)
- Cypress (end-to-end testing)

Following devDependencies are required for development purposes:

- babel/core 7.4.3 or above
- babel-loader 8.1.0 or above
- sass 1.53.0 or above
- storybook 5.0.10 or above
- testing-library/jest-dom 4.0.0 or above
- testing-library/react 8.0.7 or above
- testing-library/react-hooks 8.0.1 or above
- prop-types 15.8.1 or above
- react-test-renderer 16.14.0 or above

## Running Jest Test Framework
```sh
npm test
```
## Running Storybook Visual Testbed
```sh
npm run storybook
```
## Local Setup
To set up Interview Scheduler locally, follow these steps:

1) Install all dependencies with `npm install`.
2) Download and install scheduler-api by following the instructions on its repo.
3) Start the API server while in the "scheduler-api" directory using ` npm start `
4) Start the Webpack development server while in the "scheduler" directory using ` npm start ` 
5) The app will be accesible at http://localhost:8000/.