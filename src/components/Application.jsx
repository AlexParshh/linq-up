import React, { Component, StrictMode } from "react";
import PersonList from './PersonList';
import Person from './Person';


class Application extends Component {

    
    state = { 

        people: [
            <Person key="1" value="1" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
            <Person key="2" value="2" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
            <Person key="3" value="3" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
          ],
        addresses: [
            "","",""
        ]
        
     }

    handleSetAddress = (e,v) => {
        let newAddresses = this.state.addresses.slice();
        newAddresses[v-1] = e;
        this.setState({addresses:newAddresses});

    }

    handleAddPerson = () => {
        let newAddresses = [...this.state.addresses,""];
        this.setState({addresses:newAddresses});
        this.setState({
          people: [
            ...this.state.people,
            <Person
              key={this.state.people.length + 1}
              value={this.state.people.length + 1}
              onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}
            ></Person>,
          ],
        });
      };

    handleDeletePerson = () => {
        let newAddresses = this.state.addresses.slice(0,-1);
        this.setState({addresses:newAddresses});
        let people = this.state.people.slice(0, -1);
        this.setState({
          people: people,
        });
      };

    propChecker = () => {
        let b = this.state.people
        console.log(b[0]);

    }

    render() { 
        return ( 
            <div>
                <h1>Linq</h1>
                <PersonList
                people = {this.state.people} 
                onAddPerson = {()=>this.handleAddPerson()}
                onDeletePerson = {()=>this.handleDeletePerson()}></PersonList>

                <button onClick={this.propChecker}>Calculate</button>
                
            </div>
         );
    }
}
 
export default Application;