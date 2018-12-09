// functional component
import React, { Component } from 'react';
import WithClass from '../../../hoc/WithClass';
import classes from './Person.css';

// since this is a functional component, we can use 'props' -- normally in a component, this would be 'this.props'

// As your application grows, you should want to use functional components more than not -- they are only responsible for rendering something dynamically on the DOM -- it takes in props and displays them -- should NEVER change state

class Person extends Component {
  constructor(props){
    super(props);
    this.inputElement = React.createRef();
    console.log('[Person.js] Inside constructor');
  }

  // OLD - SHOULD NOT BE USED
  // componentWillMount(){
  //   console.log('[Person.js] Inside componentWillMount()');
  // }

  componentDidMount(){
    console.log('[Person.js] Inside componentDidMount()');
    if(this.props.position === 0){
      this.inputElement.current.focus();
    }
  }  

  render () {
    console.log('[Person.js] Inside render()');
    return (
      <WithClass classes={classes.Person}>
        {this.props.authenticated ? <p>I'm authenticated!</p> : null}
        <p onClick={this.props.clicked}>Hello, I'm {this.props.name} out here and I'm {this.props.age} fam!</p>
        <input 
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
          ref={this.inputElement}
        />
      </WithClass>
    )
  }
}

export default Person;