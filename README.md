![musical affairs logo](https://github.com/montoya1256/musical-affairs/blob/main/WireFrames/musical-affairs.png?raw=true)

# Welcome to Musical Affairs!
[Musical-Affairs](https://musical-affairs.herokuapp.com/) is an app where users can create an account to be able to store all of their favorite artist. With the help of the lastFm API, users are able to search for almost any artist and add them to their favorites bar.

**Technologies: React, Redux, Flask, SQLAlchemy, CSS3**

**APIs: LastFM API**


# Landing Page
![Landing Page](https://github.com/montoya1256/musical-affairs/blob/main/WireFrames/Musical-Affairs-landing.png)

When users first click on the link to the site, they are brought to a simple landing page where users can login or signup. Using Bcrypt, users can feel safe that their password wont be compromised. 

# Main Page - Favorites Carousel
![favorites](https://github.com/montoya1256/musical-affairs/blob/main/WireFrames/Musical-Affairs-favorites.png)

This section of the main page is where users can view all of the artist that they have fovorited. This simple, yet effeective carousel was made possible using the react slick carousel library. This makes it easy for users to scroll through the list of artist that they have favorited in an easy manner. In this same carosuel, users have the option to unfavorite the artist, and also view others whom have favorited the same artist. 

# Main Page - Random
![Random](https://github.com/montoya1256/musical-affairs/blob/main/WireFrames/Musical-Affairs-random.png)

Scrolling down on the main page you are brought to a component of the site that displays a random artist. As a user, you can like or dislike this artist which will either move them to the favorites carousel or just do nothing and show another picture of a random artist. 

# Search
![Search Feature](https://github.com/montoya1256/musical-affairs/blob/main/WireFrames/musical-affairs-search.png)

One of my proudest features of this site is this search page. Users are able to search for an artist and favorite that artist as well to have them appear in the carousel. My favorite part of this is the "Artist you may also like" Feature. Using the API, Users can search for an artist and also get artist that are similar to them. This is great beacuse users can possibly favorite up to 6 artist with the search of only one artist. 
