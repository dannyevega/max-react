// functional component
import React from 'react';
import './Person.css';

// since this is a functional component, we can use 'props' -- normally in a component, this would be 'this.props'

// As your application grows, you should want to use functional components more than not -- they are only responsible for rendering something dynamically on the DOM -- it takes in props and displays them -- should NEVER change state
const Person = (props) => {
  return (
    <div className="Person">
      <p onClick={props.click}>Hello, I'm {props.name} out here and I'm {props.age} fam!</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
}

export default Person;