// functional component
import React from 'react';
import Radium from 'radium';
import './Person.css';

// since this is a functional component, we can use 'props' -- normally in a component, this would be 'this.props'

// As your application grows, you should want to use functional components more than not -- they are only responsible for rendering something dynamically on the DOM -- it takes in props and displays them -- should NEVER change state

// Radium lets us use media queries for specific components or dynamic content rendering
const Person = (props) => {
  const styles = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  }
  return (
    <div className="Person" style={styles}>
      <p onClick={props.click}>Hello, I'm {props.name} out here and I'm {props.age} fam!</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
}

export default Radium(Person);