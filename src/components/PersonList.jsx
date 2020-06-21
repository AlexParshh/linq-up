import React, { Component } from "react";


class PersonList extends Component {

  render() {
    return (
      <div>
        <button onClick={this.props.onAddPerson}>
          Add Person
        </button>
        <button onClick={this.props.onDeletePerson}>
          Delete Person
        </button>

        {this.props.people}
      </div>
    );
  }
}

export default PersonList;
