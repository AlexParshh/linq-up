import React, { Component } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./person.css"

class Person extends Component {
  render() {
    

    return (
      <div>
        <h4>Person #{this.props.value}</h4>
        <form>
          
          <GooglePlacesAutocomplete
            onSetAddress={this.props.onSetAddress}
            onSelect={({ description }) =>
              this.props.onSetAddress(description, this.props.value)
            }
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <div className="suggestions-container">
                {suggestions.map((suggestion) => (
                  <div
                    
                    className="suggestion"
                    onClick={(event) => onSelectSuggestion(suggestion, event)}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          />
          <input type="text" placeholder="email" onChange={(e) => this.props.onSetEmail(e.target.value,this.props.value)}></input>
        </form>
      </div>
    );
  }
}

export default Person;
