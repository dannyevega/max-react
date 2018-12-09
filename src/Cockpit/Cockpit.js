import React from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
  let assignedClasses = [];
  let btnClass = classes.Button;

  if (props.showPeople) {
    btnClass += ` ${classes.Red}`;
  }

  if (props.people.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.people.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  // use of <> & </> here for wrapping adjacent JSX elements - React 16.2 and above allows this, no need for a div
  return (
    <>
      <h1>React Life</h1>
      <p className={assignedClasses.join(' ')}>It's twerking.</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle People</button>
      <button onClick={props.login}>Log In</button>
    </>
  )
}

export default Cockpit;