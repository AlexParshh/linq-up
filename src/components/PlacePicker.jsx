import React, { Component } from "react";

class PlacePicker extends Component {

    state = {
        sliderValue: "300"
    }

    sliderChange = (e) => {

        this.setState({sliderValue:e})
        this.props.onSetRadius(e)

    }


  render() {
    return (
      <div>
        <span>
          <h4>Point Of Interest</h4>
          <input type="test" placeholder="Leave Blank = no POI" onChange={(e)=>this.props.onSetPOI(e.target.value)}></input>
        </span>
        <span>
          <h4>Radius</h4>
          <input
            type="range"
            min="0"
            max="1000"
            value={this.state.sliderValue}
            onChange={(e)=>this.sliderChange(e.target.value)}
          ></input>
        </span>
      </div>
    );
  }
}

export default PlacePicker;
