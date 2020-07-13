import React, { Component } from "react";
import {
  Map,
  Marker,
  GoogleApiWrapper,
  InfoWindow,
  Circle,
} from "google-maps-react";
require("dotenv").config();

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentPhoto: "",
    circleLat: this.props.circleLat,
    circleLng: this.props.circleLng,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.circleLat !== this.state.circleLat) {
      this.setState({circleLat: this.props.circleLat,circleLng:this.props.circleLng})
    }
  }

  displayMarkers = () => {
    return this.props.coords.map((address, index) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={index}
          id={index}
          name={<h4>{this.props.addresses[index]}</h4>}
          pos={{
            lat: address.lat,
            lng: address.lng,
          }}
          position={{
            lat: address.lat,
            lng: address.lng,
          }}
        />
      );
    });
  };

  displayPlacesMarkers = () => {
    let coordsPlaces = [];
    let placesNames = [];
    let ratings = [];
    let photos = [];

    for (let i = 0; i < this.props.nearbyPlaces.length; i++) {
      coordsPlaces.push(this.props.nearbyPlaces[i].geometry.location);
      placesNames.push(this.props.nearbyPlaces[i].name);
      ratings.push(this.props.nearbyPlaces[i].rating);

      //if this.props.nearbyPlaces.photos[0]


      //handles no photo error
      if (this.props.nearbyPlaces[i].photos) {
        photos.push(
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=200&photoreference=" +
            this.props.nearbyPlaces[i].photos[0].photo_reference +
            "&key=" +
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        );
      } else {
        photos.push("https://static.thenounproject.com/png/1339059-200.png");
      }
    }

    return coordsPlaces.map((address, index) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          photo={photos[index]}
          key={"p" + index}
          id={"place"}
          rating={ratings[index]}
          name={<h4>{placesNames[index]}</h4>}
          cleanName={placesNames[index]}
          position={{
            lat: address.lat,
            lng: address.lng,
          }}
          pos={{
            lat: address.lat,
            lng: address.lng,
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png",
          }}
        />
      );
    });
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    this.props.onSetMeetupPoint(this.state.activeMarker.pos);

    if (this.state.activeMarker.cleanName) {
      this.props.onSetMeetName(this.state.activeMarker.cleanName);
    }
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
      });
      this.props.onSetMeetupPoint({
        lat: this.props.midpoint[0],
        lng: this.props.midpoint[1],
      });
      this.props.onSetMeetName("");
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
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={{
            width: "65.8%",
            height: "97%",
          }}
          initialCenter={{
            lat: this.props.currentLocation[0],
            lng: this.props.currentLocation[1],
          }}
        >
          {this.displayMarkers()}
          {this.displayPlacesMarkers()}
          <Marker
            onClick={this.onMarkerClick}
            key="midpoint"
            id="midpoint"
            name={
              !this.props.coords ? (
                <h4>Midpoint</h4>
              ) : (
                <div>
                  <h4>Midpoint</h4>
                  <h4>{this.props.midpoint[0]}</h4>
                  <h4>{this.props.midpoint[1]}</h4>
                </div>
              )
            }
            position={{
              lat: this.props.midpoint[0],
              lng: this.props.midpoint[1],
            }}
            pos={{
              lat: this.props.midpoint[0],
              lng: this.props.midpoint[1],
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          ></Marker>

          <Circle
            radius={parseInt(this.props.radius) * 1.7}
            center={{
              lat: this.state.circleLat,
              lng: this.state.circleLng,
            }}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor="#FF0000"
            fillOpacity={0.2}
            visible={Boolean(this.props.nearbyPlaces)}
          ></Circle>

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              {this.state.selectedPlace.name}
              {this.state.activeMarker.id === "place" ? (
                <div>
                  <img src={this.state.activeMarker.photo} alt="Image Unavailable"></img>
                  <h4>Rating: {this.state.activeMarker.rating}</h4>
                </div>
              ) : (
                ""
              )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);


