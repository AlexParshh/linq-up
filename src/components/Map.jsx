import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow, Circle } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  displayMarkers = () => {
    return this.props.coords.map((address, index) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={index}
          id={index}
          name={this.props.addresses[index]}
          position={{
            lat: address.lat,
            lng: address.lng,
          }}
        />
      );
    });
  };

  onMarkerClick = (props, marker) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

}


onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

shouldComponentUpdate(nextProps) {

  //prevents useless rerenders when user fidgets with radius slider

  if (nextProps.radius !== this.props.radius) {
    return false;
  } else {
    return true;
  }

}



  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={{
          width: "40%",
          height: "50%",
        }}
        initialCenter={{
          lat: this.props.currentLocation[0],
          lng: this.props.currentLocation[1],
        }}
      >
        {this.displayMarkers()}
        <Marker
          onClick={this.onMarkerClick}
          key="midpoint"
          id="midpoint"
          name="midpoint"
          position={{
            lat: this.props.midpoint[0],
            lng: this.props.midpoint[1],
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          }
          }
        ></Marker>

        <Circle
        radius={parseInt(this.props.radius)}
        center={{
          lat: this.props.midpoint[0],
          lng: this.props.midpoint[1],
        }}
        strokeColor='transparent'
        strokeOpacity={0}
        strokeWeight={5}
        fillColor='#FF0000'
        fillOpacity={0.2}
        visible={this.props.POI === "" ? false: true}
        
        ></Circle>

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAF6LzDWnCO0yQ3_xVfXMYicN6MqUFl4q0",
})(MapContainer);
