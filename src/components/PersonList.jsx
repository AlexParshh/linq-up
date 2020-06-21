import React, { Component } from "react";
import Person from "./Person";

class PersonList extends Component {
  state = {
    people: [
      <Person key="1" value="1"></Person>,
      <Person key="2" value="2"></Person>,
      <Person key="3" value="3"></Person>,
    ],
  };

  handleAddPerson = () => {
    console.log(this.state.people.length);
    this.setState({
      people: [
        ...this.state.people,
        <Person
          key={this.state.people.length + 1}
          value={this.state.people.length + 1}
        ></Person>,
      ],
    });
  };

  handleDeletePerson = () => {
    let people = this.state.people.slice(0, -1);
    this.setState({
      people: people,
    });
  };

  render() {
    return (
      <div>
        <button size="lg" onClick={this.handleAddPerson}>
          Add Person
        </button>
        <button size="lg" onClick={this.handleDeletePerson}>
          Delete Person
        </button>

        {this.state.people}
      </div>
    );
  }
}

export default PersonList;
