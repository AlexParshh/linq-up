import React, { Component, StrictMode } from "react";
import PersonList from './PersonList';
import Person from './Person';


class Application extends Component {
    state = { 

        people: [
            <Person key="1" value="1"></Person>,
            <Person key="2" value="2"></Person>,
            <Person key="3" value="3"></Person>,
          ],

     }


    handleAddPerson = () => {

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
                <h1>Linq</h1>
                <PersonList
                people = {this.state.people} 
                onAddPerson = {()=>this.handleAddPerson()}
                onDeletePerson = {()=>this.handleDeletePerson()}></PersonList>

                <button>Calculate</button>
                
            </div>
         );
    }
}
 
export default Application;