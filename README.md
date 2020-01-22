# Nathan's Gym Tracker Site

I was finding it quite time consuming telling everyone that I went to the gym most mornings, and what is the point in going unless to tell everyone, so I've created this website which will allow people to see if I was at the gym on the current day.

The front end is built with React, with two AWS Lambdas reading and writing the information to a DynamoDB. 

The first lambda, gymScraper.py, is a python script that signs into the PureGym website, gets the most recent time I was at the gym, and saves it to the database. The seconds one is a Node.js file that simply provides the latest info when a request is made to it.

## Possible Future Additions

* A feature that sends an email/text *(no opt out)* notifications to people when I arrive at the gym would be great.
* This only works for PureGym visits, so when I go to Lifestyle Fitness at the weekends, the site will think I didn't go at all! Maybe some sort of geo-location trigger on my phone could work.

## Examples

### Gym Confirmed

![Confirmed](screenshots/AtTheGym.gif)

### Gym Unconfirmed

![Unconfirmed](screenshots/NoGym.gif)