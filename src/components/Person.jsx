import React, { Component } from "react";

class Person extends Component {
  render() {
    return (
      <div>
        <h4>Person #{this.props.value}</h4>
        <form>
          <label htmlFor="">Address</label>
          <input
            type="text"
            onChange={(e) =>
              this.props.onSetAddress(e.target.value, this.props.value)
            }
          />
          <br />
        </form>
      </div>
    );
  }
}

export default Person;
