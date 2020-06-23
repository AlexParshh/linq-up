import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  displayMarkers = () => {
    return this.props.coords.map((address, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: address.lat,
            lng: address.lng,
          }}
        />
      );
    });
  };

  render() {



    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={{
          width: "50%",
          height: "50%",
        }}
        initialCenter={{ lat: this.props.currentLocation[0], lng: this.props.currentLocation[1] }}
      >
        {this.displayMarkers()}
        <Marker key="midpoint" id="midpoint" position={{
            lat: this.props.midpoint[0],
            lng: this.props.midpoint[1],
          }}
          icon= {{url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}}></Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAF6LzDWnCO0yQ3_xVfXMYicN6MqUFl4q0",
})(MapContainer);
