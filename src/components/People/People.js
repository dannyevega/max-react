import React, { PureComponent } from 'react';
import Person from './Person/Person';

// since were only returning JSX in the function body, we can omit the curly brackets and return () statement -- just use parantheses
class People extends PureComponent {
  constructor(props){
    super(props);
    console.log('[People.js] Inside constructor');
  }

  // OLD - SHOULD NOT BE USED
  // componentWillMount(){
  //   console.log('[People.js] Inside componentWillMount()');
  // }

  componentDidMount(){
    console.log('[People.js] Inside componentDidMount()');
  }

  // OLD - SHOULD NOT BE USED
  // componentWillReceiveProps(nextProps) {
  //   console.log('[UPDATE: People.js] Inside componentWillReceiveProps()', nextProps);
  // }

  // needs to return true or false -- tells React whether to continue or not
  // works below because we created a new copy of people object in App.js -- its not the same object (people) so its not deeply checked, only reference

  // were doing a lot of checks below to check if we actually need to update or not -- React made this easier for us -- PureComponent is exactly the same as normal component except it has shouldComponentUpdate built in and checks for us -- it will go thru all the properties in the props and compare them to their old version

  // dont use PureComponents everywhere -- only when you know updates might not be required

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[UPDATE: People.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextProps.people !== this.props.people || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked;
  // }

  // OLD - SHOULD NOT BE USED
  // componentWillUpdate(nextProps, nextState){
  //   console.log('[UPDATE: People.js] Inside componentWillUpdate()', nextProps, nextState);
  // }

  componentDidUpdate(){
    console.log('[UPDATE: People.js] Inside componentDidUpdate()');
  }

  render () {
    console.log('[People.js] Inside render()');
    return (
      this.props.people.map((person, index) => {
        return <Person
          name={person.name}
          age={person.age} 
          key={person.id}
          position={index}
          changed={(event) => this.props.changed(event, person.id)}
          clicked={() => this.props.clicked(person.id)}
          authenticated={this.props.isAuthenticated}/>
      })
    )
  }
}

export default People;