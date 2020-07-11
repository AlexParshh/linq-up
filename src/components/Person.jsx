import React, { Component } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";



class Person extends Component {
  render() {
    
    

    return (
      <div style={{width:"400px"}}>
        <h4 style={{margin:"5px"}}><span className="badge badge-secondary">Person #{this.props.value}</span></h4>



        <form>
          <GooglePlacesAutocomplete
            inputStyle={{width:"400px", margin:"5px"}}
            inputClassName="form-control"
            placeholder="Address"
            apiKey={"AIzaSyAF6LzDWnCO0yQ3_xVfXMYicN6MqUFl4q0"}
            onSetAddress={this.props.onSetAddress}
            onSelect={({ description }) =>
              this.props.onSetAddress(description, this.props.value)
            }
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <div className="list-group">
                {suggestions.map((suggestion,idx) => (
                  <button
                    style={{width:"400px", margin:"5px"}}
                    type="button"
                    key={idx}
                    className="list-group-item list-group-item-action"
                    onClick={(event) => onSelectSuggestion(suggestion, event)}
                  >
                    {suggestion.description}
                  </button>
                ))}
              </div>
            )}
          ></GooglePlacesAutocomplete>
          <input className="form-control" style={{width:"400px",margin:"5px"}}type="text" placeholder="Email" onChange={(e) => this.props.onSetEmail(e.target.value,this.props.value)}></input>
        </form>
      </div>
    );
  }
}

export default Person;
