import React, { Component, StrictMode } from "react";
import PersonList from './PersonList';


class Application extends Component {
    state = { 
        time: null,
        people: [],

     }
    render() { 
        return ( 
            <div>
                <h1>Linq</h1>
                <PersonList></PersonList>

                
            </div>
         );
    }
}
 
export default Application;