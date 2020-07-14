# Linq up

## Motivations and Description ##

The motivations for building this app were simple, to eradicate all the hassles associated with meeting up, whether it be with a group of friends planning a night out, or for a cyclists looking to go for a ride.

Linq up solves these problems by calculating a weighted geographical midpoint based on everyone person's address; no more arguing over what is fair for everyone. This app then searches around the radius of that midpoint, for whatever type of attraction the user would like to specify, such as a pharmacy, restaurant or grocery store. 

Linq up also resolves the issue of having people arrive too early, or too late. It does this by allowing the user to specify a meet up time, and then sends a reminder to each person's email exactly when they have to leave from their address to arrive right on time.

## How it was made ##

Linq up was built using the ReactJS library as the frontend and with a nodeJS backend to handle all the various api GET & POST requests. This app was hosted on Herokuapp. For styling, Bootstrap and CSS were used.

## How it works ## 

Linq up primarily uses the Google Maps API. Below are all the API's used:

* The Geolocation API is used to convert each address to geographical coordinates.
* The Maps API is used to render the map itself.
* The Google Places Autocomplete API is used to recommend address results.
* The Google Places Search API is used to find relevant nearby places around the midpoint.
* The Google Places Photos API is used to fetch images of each nearby place.
* The Google Directions API is used to get the travel times of each person to the midpoint based on transportation type and other factors such as traffic.
* The SendGrid API is used to send reminder emails to every single person on when they should leave aswell as directions to the meetup point.

## Usage ##

Google Chrome is optimal for this app. When accessing the link, be sure to use https:// before the link and allow the app to use your current location. Otherwise it will not work.

In order to use Linq up, input at least 2 addresses and press the "Calculate" button, this will return the geographical midpoint, which will be displayed on the map.

To get nearby places of that midpoint, configure a radius size and input a point of interest keyword such as "restaurant" or "grocery store". All the nearby places will be displayed within the selected radius of the midpoint.

To setup an email reminder on where to meet up aswell as leave times for each person, select a marker on the map and then press the "Linq up" button which will appear after the "Calculate" button was initially pressed. The "Linq up" button will only appear if each address has an email, and a meet up time has been selected, as well as transport type which determines the leave time for each person.

TLDR: Pick a POI, Radius, Transport Type, Meet up Time, add at least 2 addresses and emails. Press "Calculate", select a meet up point by clicking a marker on the map. Then press "Linq up" and confirm the meeting details.

## Try it out ##

https://linqup.herokuapp.com

## Photos ##

![picture alt](https://i.gyazo.com/a2cdb38fcb6f4232a183022726a9da44.png)
![picture alt](https://i.gyazo.com/a2cdb38fcb6f4232a183022726a9da44.png)
![picture alt](https://cdn.discordapp.com/attachments/422579332033282059/732471173429854238/Screenshot_20200714-013839_Gmail.jpg)




