import React, { Component, StrictMode } from "react";
import PersonList from "./PersonList";
import Person from "./Person";
import fetch from "cross-fetch";
import MapContainer from "./Map";




class Application extends Component {
  state = {
    apiKey: "&key=AIzaSyAF6LzDWnCO0yQ3_xVfXMYicN6MqUFl4q0",

    people: [
      <Person
        key="1"
        value="1"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
      ></Person>,
      <Person
        key="2"
        value="2"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
      ></Person>,
      <Person
        key="3"
        value="3"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
      ></Person>,
    ],
    addresses: ["", "", ""],

    coords: [],

    midPoint: "",

    currentLocation: [],
  };


  handleSetAddress = (e, v) => {
    let newAddresses = this.state.addresses.slice();
    newAddresses[v - 1] = e;
    this.setState({ addresses: newAddresses });
  };

  emptyChecker = () => {
    const a = this.state.addresses;

    for (let i of a) {
      if (i === "") {
        return true;
      }
    }

    return false;
  };

  handleAddPerson = () => {
    this.resetMidPoint();
    let newAddresses = [...this.state.addresses, ""];
    this.setState({ addresses: newAddresses });
    this.setState({
      people: [
        ...this.state.people,
        <Person
          key={this.state.people.length + 1}
          value={this.state.people.length + 1}
          onSetAddress={(e, v) => this.handleSetAddress(e, v)}
        ></Person>,
      ],
    });
  };

  handleDeletePerson = () => {
    this.resetMidPoint();
    let newAddresses = this.state.addresses.slice(0, -1);
    this.setState({ addresses: newAddresses });
    let people = this.state.people.slice(0, -1);
    this.setState({
      people: people,
    });
  };

  stringParser = (a) => {
    let b = a.split(" ");
    let newString = "";

    for (let i = 0; i < b.length; i++) {
      newString += b[i] + "%20";
    }

    return newString.slice(0, -3);
  };

  async getCoords(link) {
    const res = await fetch(link);
    const data = await res.json();

    return data["results"][0].geometry.location;
  }

  convertToCoords = async () => {
    const all = this.state.addresses;
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    const apiKey = this.state.apiKey;

    let fullUrl;

    let newCoords = [];
    let a;

    for (let i = 0; i < all.length; i++) {
      fullUrl = url + all[i] + apiKey;
      a = await this.getCoords(fullUrl);
      newCoords.push(a);
    }

    this.setState({ coords: newCoords });
  };

  findMidPoint = (coordsList) => {
    if (coordsList.length === 2) {
      let lat1 = coordsList[0].lat * (Math.PI / 180);
      let lat2 = coordsList[1].lat * (Math.PI / 180);
      let lon1 = coordsList[0].lng * (Math.PI / 180);
      let lon2 = coordsList[1].lng * (Math.PI / 180);

      let bx = Math.cos(lat2) * Math.cos(lon2 - lon1);
      let by = Math.cos(lat2) * Math.sin(lon2 - lon1);

      let latMid = Math.atan2(
        Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((Math.cos(lat1) + bx) ** 2) + by ** 2
      );
      let lonMid = lon1 + Math.atan2(by, Math.cos(lat1) + bx);

      return [latMid * (180 / Math.PI), lonMid * (180 / Math.PI)];
    }

    //Two or more addresses

    const formatter = (x) => {
      //Converting from degrees to radians
      let lat1 = x.lat * (Math.PI / 180);
      let lon1 = x.lng * (Math.PI / 180);
      //Converting to cartesian coords

      let x1 = Math.cos(lat1) * Math.cos(lon1);
      let y1 = Math.cos(lat1) * Math.sin(lon1);
      let z1 = Math.sin(lat1);

      return [x1, y1, z1];
    };

    let formatted = [];

    for (let i of coordsList) {
      formatted.push(formatter(i));
    }

    let tmp;
    let newResult = [];

    for (let i = 0; i < formatted.length; i++) {
      tmp = 0;
      for (let j of formatted) {
        tmp += j[i];
      }

      newResult.push(tmp / formatted.length);
    }

    //newResult is now in format[x,y,z]

    let lon = Math.atan2(newResult[1], newResult[0]);
    let hyp = Math.sqrt(newResult[0] ** 2 + newResult[1] ** 2);
    let lat = Math.atan2(newResult[2], hyp);

    //converting back to degrees
    lat = lat * (180 / Math.PI);
    lon = lon * (180 / Math.PI);

    return [lat, lon];
  };

  calculator = async () => {
    //check if empty addresses
    if (this.emptyChecker()) {
      this.setState({ midPoint: "error" });
      return null;
    }

    if (this.state.addresses.length < 2) {
      this.setState({ midPoint: "error" });
      return null;
    }
    await this.convertToCoords();
    let midPoint = await this.findMidPoint(this.state.coords);
    this.setState({ midPoint: midPoint });

    return this.state.midPoint;
  };

  resetMidPoint = () => {
    this.setState({ midPoint: [] });
  };

  setCurrentLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        const lattt = position.coords.latitude;
        const longgg = position.coords.longitude;

        let newcoords = [lattt,longgg];

        this.setState({currentLocation:newcoords});
      }


      )

    }

  }

  render() {
    
    return (
      <div>
        {this.setCurrentLocation()}
        <h1>Linq</h1>
        <PersonList
          people={this.state.people}
          onAddPerson={() => this.handleAddPerson()}
          onDeletePerson={() => this.handleDeletePerson()}
        ></PersonList>

        <div>
          <button onClick={this.calculator}>Calculate</button>
        </div>
        <br />
        <div>{this.state.midPoint}</div>

        <div>
          <MapContainer
            currentLocation={this.state.currentLocation}
            coords={this.state.coords}
            midpoint={this.state.midPoint}
          ></MapContainer>
        </div>
      </div>
    );
  }
}

export default Application;
