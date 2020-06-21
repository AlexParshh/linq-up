import React, { Component, StrictMode } from "react";
import PersonList from './PersonList';
import Person from './Person';
import fetch from "cross-fetch";


class Application extends Component {

    
    state = { 

        apiKey: "",

        people: [
            <Person key="1" value="1" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
            <Person key="2" value="2" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
            <Person key="3" value="3" onSetAddress = {(e,v) =>this.handleSetAddress(e,v)}></Person>,
          ],
        addresses: [
            "","",""
        ],

        coords: [],

        
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

    
    stringParser = a => {

        let b = a.split(" ");
        let newString = "";

        for (let i =0; i<b.length;i++){
            newString += b[i] + "%20";
        }

        return newString.slice(0,-3);
    }





    async getCoords(link) {

        const res = await fetch(link);
        const data = await res.json();

        return data['results'][0].geometry.location;
    }


    convertToCoords = async () => {

        const all = this.state.addresses;
        const url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        const apiKey = this.state.apiKey;

        let fullUrl;

        let newCoords = [];
        let a;

        for (let i = 0; i<all.length;i++) {
            fullUrl = url+all[i]+apiKey;
            a = (await this.getCoords(fullUrl));
            newCoords.push(a);
        }

        this.setState({coords:newCoords});

    }

    render() { 
        return ( 
            <div>
                <h1>Linq</h1>
                <PersonList
                people = {this.state.people} 
                onAddPerson = {()=>this.handleAddPerson()}
                onDeletePerson = {()=>this.handleDeletePerson()}></PersonList>

                <div><button onClick={this.convertToCoords}>Calculate</button></div>
                
            </div>
         );
    }
}
 
export default Application;