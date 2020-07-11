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
        <div>
          <div className="buttonholder"><h4><span className="badge badge-info">Point of Interest</span></h4></div>
          <input style={{width:"400px", margin:"5px"}} className="form-control" type="test" placeholder="Leave Blank If None" onChange={(e)=>this.props.onSetPOI(e.target.value)}></input>
        </div>
        <div>
          <div className="buttonholder"><h4><span className="badge badge-info">Point of Interest Radius</span></h4></div>
          <input
            style={{width:"400px",margin:"5px"}}
            type="range"
            min="0"
            max="1000"
            value={this.state.sliderValue}
            onChange={(e)=>this.sliderChange(e.target.value)}
          ></input>
        </div>
      </div>
    );
  }
}

export default PlacePicker;
