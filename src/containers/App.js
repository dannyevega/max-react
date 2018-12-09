import React, { PureComponent } from 'react';
import People from '../components/People/People';
import Cockpit from '../Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import classes from './App.css';

class App extends PureComponent {
  constructor(props){
    super(props);
    console.log('[App.js] Inside constructor()');
  }

  // will work in modern setups, might still see this.state in other projects
  state = {
    people: [
      {name: 'Ron', age: 22, id: 0},
      {name: 'Susan', age: 41, id: 1},
      {name: 'Alex', age: 19, id: 2}
    ],
    showPeople: false,
    toggleClickCounter: 0,
    authenticated: false
  }

  // OLD - SHOULD NOT BE USED
  // componentWillMount(){
  //   console.log('[App.js] Inside componentWillMount()');
  // }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[UPDATE: App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.people !== this.state.people || nextState.showPeople !== this.state.showPeople;
  // }

  // OLD - SHOULD NOT BE USED
  // componentWillUpdate(nextProps, nextState){
  //   console.log('[UPDATE: App.js] Inside componentWillUpdate()', nextProps, nextState);
  // }

  componentDidUpdate(){
    console.log('[UPDATE: App.js] Inside componentDidUpdate()');
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log('[UPDATE: App.js] Inside getDerivedStateFromProps()', nextProps, prevState);
    return prevState;
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

  toggleLogin = () => {
    const isAuthenticated = this.state.authenticated;
    this.setState({ authenticated: !isAuthenticated });
  }

  togglePeopleHandler = () => {
    const peopleVisible = this.state.showPeople;
    this.setState((prevState) => {
      return {
        showPeople: !peopleVisible,
        toggleClickCounter: prevState.toggleClickCounter + 1
      }
    });
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

  showPeople = () => {
    this.setState({ showPeople: true });
  }

  render() {
    console.log('[App.js] Inside render()');
    const { people, showPeople, authenticated } = this.state;
    let peopleIsVisible = null;


    if (showPeople) {
      peopleIsVisible = <People 
            people={people}
            changed={this.handleChange}
            clicked={this.deletePersonHandler}
            isAuthenticated={authenticated}/>
    }

    return (
      <WithClass classes={classes.App}>
        <button onClick={this.showPeople}>Show People</button>
        <Cockpit 
          people={people}
          showPeople={showPeople}
          clicked={this.togglePeopleHandler}
          login={this.toggleLogin}
        />
        {peopleIsVisible}
      </WithClass>
    );
  }
}

export default App;
