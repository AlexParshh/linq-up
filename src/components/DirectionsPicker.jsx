import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./icons.css";
import DateTimePicker from "react-datetime-picker";

class DirectionsPicker extends Component {
  state = {
    checked: null,
    date: new Date(),
  };

  render() {
    const radios = [
      { name: "directions_bike", value: "1" },
      { name: "directions_bus", value: "2" },
      { name: "directions_car", value: "3" },
      { name: "directions_walk", value: "4" },
    ];

    return (
      <div>
        <h4>Directions specifications</h4>

        <div>
          <DateTimePicker
            onChange={(date) => {
              this.setState({ date });
              this.props.onSetDate(date);
            }}
            value={this.state.date}
            disableClock={true}
            //disableCalendar={true}
            yearPlaceholder="yyyy"
            monthPlaceholder="mm"
            dayPlaceholder="dd"
            hourPlaceholder="hh"
            minutePlaceholder="mm"
            clearIcon={null}
          ></DateTimePicker>
        </div>

        <div>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radio.value === this.state.checked}
                onChange={(e) => {
                  this.props.onSetTransport(radio.name.split("_")[1]);
                  this.setState({ checked: e.currentTarget.value });
                }}
              >
                <i class="material-icons">{radio.name}</i>
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default DirectionsPicker;
