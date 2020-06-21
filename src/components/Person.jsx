import React, { Component } from "react";



class Person extends Component {
    state = {  }
    render() { 
        return ( 

                <div>
                    <h4>Person #{this.props.value}</h4>
                    <form>
                        <label htmlFor="">Address</label>
                        <input type="text"/>
                        <br/>
                    </form>
                </div>
            );
    }
}
 
export default Person;