import React, { Component } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
require("dotenv").config();

class Person extends Component {
  state = {
    emailClassName: "form-control",
  };

  checkEmail = (email) => {
    if (email === "") {
      this.setState({ emailClassName: "form-control" });
      return;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email).toLowerCase())) {
      this.setState({ emailClassName: "form-control is-valid" });
    } else {
      this.setState({ emailClassName: "form-control is-invalid" });
    }
  };

  render() {
    return (
      <div style={{ width: "400px" }}>
        <h4 style={{ margin: "5px" }}>
          <span className="badge badge-secondary">
            Person #{this.props.value}
          </span>
        </h4>

        <form>
          <GooglePlacesAutocomplete
            inputStyle={{ width: "400px", margin: "5px" }}
            inputClassName="form-control"
            placeholder="Address"
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onSetAddress={this.props.onSetAddress}
            onSelect={({ description }) =>
              this.props.onSetAddress(description, this.props.value)
            }
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <div className="list-group">
                {suggestions.map((suggestion, idx) => (
                  <button
                    style={{ width: "400px", margin: "5px" }}
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
          <input
            id={this.props.value}
            className={this.state.emailClassName}
            style={{ width: "400px", margin: "5px" }}
            type="text"
            placeholder="Email"
            onChange={(e) => {
              this.checkEmail(e.target.value);
              this.props.onSetEmail(e.target.value, this.props.value);
            }}
          ></input>
        </form>
      </div>
    );
  }
}

export default Person;
