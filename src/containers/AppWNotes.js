import React, { Component } from 'react';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import './App.css';

class App extends Component {
  state = {
    people: [
      {name: 'Ron', age: 22, id: 0},
      {name: 'Susan', age: 41, id: 1},
      {name: 'Alex', age: 19, id: 2}
    ],
    showPeople: false
  }

  handleChange = (event, id) => {
    const { people } = this.state;

    // finding the index of the person which input we want to update
    const personIndex = people.findIndex(person => {
      return person.id === id;
    });

    // you should NEVER do this below - this will be mutating our state and directly changing the JS object itself
    // JS objects are reference types - we only get a pointer and mutating the way below will change the whole object
    // const person = this.state.people[personIndex];

    // since we DONT ever want to manipulate our state and our state are JS objects, we make a new JS object
    // Use spread operator to distribute all properties of the object we get into this new object were creating
    const person = {...people[personIndex]};

    // Older alternative version to above spread operator:
    // const person = Object.assign({}, people[personIndex]);

    person.name = event.target.value; // can update name here since we created a new person object above

    // were always working with copies here -- never mutating state

    const persons = [...people];
    persons[personIndex] = person;

    this.setState({people: persons});
      
  }

  togglePeopleHandler = () => {
    const peopleVisible = this.state.showPeople;
    this.setState({ showPeople: !peopleVisible });
  }

  deletePersonHandler = (personId) => {
    // const persons = [...this.state.people];
    // persons.splice(personId, 1);
    // this.setState({people: persons});
    const { people } = this.state;
    let filteredPeople = people.filter(person => {
      return (person.id !== personId)
    });
    this.setState({people: filteredPeople});
  }

  render() {
    const { people, showPeople } = this.state;

    // Installing Radium here allows us to use the :hover and all pseudo-selectors
    const styles = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid black',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let peopleIsVisible = null;

    let classes = [];
    if (people.length <= 2) {
      classes.push('red');
    }
    if (people.length <= 1) {
      classes.push('bold');
    }

    if (showPeople) {
      peopleIsVisible = (
        <div>
          {people.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={(event) => this.handleChange(event, person.id)}
              click={() => this.deletePersonHandler(person.id)}/>
          })}
        </div>
      );
      styles.backgroundColor = 'red';
      styles[':hover'] = {
        backgroundColor: 'pink'
      }
    }

    return (
      // StyleRoot is provided and needed by Radium in order to render media queries and keyframes etc -- not needed for pseudo selectors
      <StyleRoot>
        <div className="App">
          <h1>React Life</h1>
          <p className={classes.join(' ')}>It's twerking.</p>
          <button 
            style={styles} 
            onClick={this.togglePeopleHandler}>Toggle People</button>
          {peopleIsVisible}
        </div>        
      </StyleRoot>
    );
  }
}

export default Radium(App);
