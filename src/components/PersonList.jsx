import React, { Component } from "react";




class PersonList extends Component {
  render() {
    return (
      <div>

            <div className="buttonholder">
            <h4>
              <span className="badge badge-info">Participants</span>
            </h4>
          </div>

        <div className="buttonholder">
        <button className="btn btn-outline-success" onClick={this.props.onAddPerson}>Add Person</button>
        <button className="btn btn-outline-danger" onClick={this.props.onDeletePerson}>Delete Person</button>
        </div>
       
        <div className="holder">{this.props.people}</div>
      </div>
    );
  }
}

export default PersonList;
