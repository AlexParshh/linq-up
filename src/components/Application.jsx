import React, { Component } from "react";
import PersonList from "./PersonList";
import Person from "./Person";
import fetch from "cross-fetch";
import MapContainer from "./Map";
import PlacePicker from "./PlacePicker";
import DirectionsPicker from "./DirectionsPicker";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'
import Axios from 'axios';
const moment = require('moment');

class Application extends Component {
  state = {
    people: [
      <Person
        key="1"
        value="1"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
        onSetEmail={(e, v) => this.handleSetEmail(e, v)}
      ></Person>,
      <Person
        key="2"
        value="2"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
        onSetEmail={(e, v) => this.handleSetEmail(e, v)}
      ></Person>,
      <Person
        key="3"
        value="3"
        onSetAddress={(e, v) => this.handleSetAddress(e, v)}
        onSetEmail={(e, v) => this.handleSetEmail(e, v)}
      ></Person>,
    ],
    addresses: ["", "", ""],

    coords: [],

    midPoint: "",

    currentLocation: [],

    POI: "",

    radius: "300",

    nearbyPlaces: {},

    transportOption: null,

    date: new Date(),

    meetupPoint: null,

    travelTimes: [],

    leaveTimes: [],

    emails: ["","",""],


  };

  handleSetEmail = (e, v) => {
    let newEmails = this.state.emails.slice();
    newEmails[v - 1] = e;
    this.setState({emails:newEmails})
  }

  componentDidMount() {
    this.setCurrentLocation();
  }

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
    let newEmails = [...this.state.emails,""];
    let newAddresses = [...this.state.addresses, ""];
    this.setState({ addresses: newAddresses,
    leaveTimes: [],
    meetupPoint: null,
    travelTimes: [],
    nearbyPlaces: {},
    emails:newEmails,

   });
    this.setState({
      people: [
        ...this.state.people,
        <Person
          key={this.state.people.length + 1}
          value={this.state.people.length + 1}
          onSetAddress={(e, v) => this.handleSetAddress(e, v)}
          onSetEmail={(e, v) => this.handleSetEmail(e, v)}
        ></Person>,
      ],
    });
  };

  handleDeletePerson = () => {
    let newcoords = this.state.coords.slice(0, -1);
    this.setState({ coords: newcoords,
      leaveTimes: [],
      meetupPoint: null,
      travelTimes: [],
      nearbyPlaces: {} });

    this.resetMidPoint();
    let newEmails = this.state.emails.slice(0, -1);
    let newAddresses = this.state.addresses.slice(0, -1);
    this.setState({ addresses: newAddresses,
    emails:newEmails });
    let people = this.state.people.slice(0, -1);
    this.setState({people});
  };

  getCoords = async (address) => {

    let bod = {address:address}
    const res = await Axios.post('http://localhost:4000/geolocate', bod)

    if (res.status!== 200) throw Error(res.body.message);

    return res.data;
  }

  convertToCoords = async () => {
    const all = this.state.addresses;

    let newCoords = [];
    let a;

    for (let i = 0; i < all.length; i++) {

      a = await this.getCoords(all[i]);
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

    this.findNearbyPlaces();
  };

  findNearbyPlaces = async () => {

    if (this.state.POI === "") {
      //if no Point of interest selected
      let newMeetupPoint = {lat:this.state.midPoint[0],lng:this.state.midPoint[1]};
      this.setState({meetupPoint:newMeetupPoint});
      return
    }

    const content = {midPoint:this.state.midPoint,radius:this.state.radius,POI:this.state.POI}

    const res = await Axios.post('http://localhost:4000/nearbyplaces', content)


    if (res.status!== 200) throw Error(res);

    if (res.data.status === "ZERO_RESULTS") {
      return
    } else {
      this.setState({nearbyPlaces: res.data.results});
    }


  }



  resetMidPoint = () => {
    this.setState({ midPoint: [] });
  };

  setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lattt = position.coords.latitude;
        const longgg = position.coords.longitude;

        let newcoords = [lattt, longgg];

        this.setState({ currentLocation: newcoords });
      });
    }
  };


  handleSetPOI = (e) => {
    this.setState({ POI: e });
    if (e === "") {
      this.setState({nearbyPlaces:{}})
    }
  };

  getPlaces = () => {

    if (this.state.POI === "") {
      return null;
    } 

  }

  handleSetRadius = (e) => {

    this.setState({radius:e});
  }

  handleSetTransport = (e) => {
    let l;
    if (e ==="bike") {
      l = "bicycling"
    } else if (e==="car") {
      l="driving"
    } else if (e==="walk") {
      l="walking"
    } else {
      l = "transit"
    }
 

    this.setState({transportOption:l})
  }

  handleSetDate = (date) => {
    this.setState({date})
  }

  handleSetMeetupPoint = (loc) => {
    this.setState({meetupPoint:loc})
  }

  async getTime(link) {
    const res = await fetch(link);
    const data = await res.json();

    return data.routes[0].legs[0].duration
  }


  getTravelTimes = async () => {

    if (this.state.meetupPoint === null) {
      let newMeetupPoint = {lat:this.state.midPoint[0],lng:this.state.midPoint[1]};
      this.setState({meetupPoint:newMeetupPoint});
    } 
    
    if (this.state.midPoint === "error" || this.state.addresses.length === 0) {
      return
    }


    let targetLat=this.state.meetupPoint.lat
    let targetLon=this.state.meetupPoint.lng


    let travelTimes = [];

    let originLat, originLon, time, travelMode, content;

    if (this.state.transportOption === null) {
      //defaults to driving if nothing was selected
      travelMode = "driving"
    } else {
      travelMode = this.state.transportOption;
    }

    
    for (let i =0;i<this.state.coords.length;i++){

      originLat = this.state.coords[i].lat
      originLon = this.state.coords[i].lng

      content = {targetLat:targetLat, targetLon:targetLon, originLat:originLat, originLon:originLon, travelMode:travelMode };

      time = await Axios.post('http://localhost:4000/traveltime',content)

      travelTimes.push(time.data.routes[0].legs[0].duration)
    }


    this.setState({travelTimes})

    this.getLeaveTimes()

  }
  
  getLeaveTimes = () => {

    let travelTimes = this.state.travelTimes;
    let arrivalTime = moment(this.state.date);
    let leaveTimes = [];

    let current;

    for (let i =0; i<travelTimes.length;i++) {
      current = arrivalTime.clone().subtract(travelTimes[i].value, "seconds");
      current = current.format("LLL")
      leaveTimes.push(current)

    }

   

    this.setState({leaveTimes})

  }


  sendEmails = () => {

    let emails = this.state.emails;
    let leaveTimes = this.state.leaveTimes;
    let coords = this.state.coords;
    let meetupPoint = this.state.meetupPoint;

    let text,email,content;

    for (let i = 0; i<leaveTimes.length;i++) {
      text = "This is a reminder to linq up!\nIn order to arrive at the linq up point, please depart at the following time:\n";
      text+=(leaveTimes[i]+"\n");
      text+="The directions to your destination can be found using this link\n";
      text+=("https://www.google.com/maps/dir/"+coords[i].lat+","+coords[i].lng+"/"+meetupPoint.lat+","+meetupPoint.lng+"/")
      
      email = emails[i]

      content = {to:email,text:text}
      Axios.post('http://localhost:4000/sendemail', content)

    }

  }




  render() {

    
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Linq up</h1>
          </div>


        <div>
          <PlacePicker 
          onSetRadius={(e) => this.handleSetRadius(e)}
          onSetPOI={(e) => this.handleSetPOI(e)}></PlacePicker>
        </div>

        <div>
          <DirectionsPicker
          onSetTransport={(e) => this.handleSetTransport(e)}
          onSetDate = {(date) => this.handleSetDate(date)}
          ></DirectionsPicker>
        </div>
        
        <div>
          <PersonList
            people={this.state.people}
            onAddPerson={() => this.handleAddPerson()}
            onDeletePerson={() => this.handleDeletePerson()}
          ></PersonList>
        </div>

        <div className="buttonholder">
          <button className="btn btn-outline-secondary" onClick={this.calculator}>Calculate</button>
        </div>

        <div className="buttonholder"><button className="btn btn-outline-warning" onClick={this.getTravelTimes}>Linq up!</button></div>

        <div><button onClick={this.sendEmails}>SEND EMAIL</button></div>

        <div>
          <MapContainer
            POI={this.state.POI}
            addresses={this.state.addresses}
            currentLocation={this.state.currentLocation}
            coords={this.state.coords}
            midpoint={this.state.midPoint}
            radius={this.state.radius}
            nearbyPlaces={this.state.nearbyPlaces}
            onSetMeetupPoint={(loc) => this.handleSetMeetupPoint(loc)}
          ></MapContainer>
        </div>

      </div>
    );
  }
}

export default Application;