## Rather | A new form of Social Media

*Rather is an attempt to revolutionize the way people interact online. A long time ago, some very smart people made Facebook to help themselves and their friends connect with one another and thus create a more connected world; Facebook users had many other uses in mind. One of the uses was as a platform to talk about and share their opinions with the world. Rather is an attempt to further this use case by providing people with **a platform where they can anonymously express their ideas and see how other people feel about them**. Such a platform would enable people to not only share views, but also stress test their opinions with those of others.*

### Developer: Harsh Rana
#### Link: https://a4-hr23232323.herokuapp.com/
- - - 
## A walk through the User Experience design
Rather utilizes a very minimal user interface to create a platform which puts the focus on the content and not on the platform itself. One of the features that I implemented to create this effect was a very simplistic home screen which incorporated a "new question section" and a running list of questions posted by other users of the application, with a visualization of how opinions were split about certain topics. This screen can be seen below:

![Home Screen](https://github.com/hr23232323/a4-webapp/blob/master/a4-img/home.PNG "Home screen showing features as mentioned above")

<br><br>

Another feature that I implemented was a simple way of showcasing the split between opinions when it came down to people voting and this can be seen below:

![Voting Screen](https://github.com/hr23232323/a4-webapp/blob/master/a4-img/vote.PNG "Voting screen showing the split between opinions")

## Technical Achievements
- **Visualizing the difference of opinions**: Instead of showcasing difference in opinions between users by just showing a percent sign or number of votes, I utilized client side javascript (`scripts3.js`) to visualize the results and make the split have more meaning. This was done by using inline CSS on the client side JS, before injecting HTML into the webpage. 
- **User authorizations from scratch without any libraries**: Even though the user authentication system isn't super robust/safe, I implimented the entire route (new user, login, error when using a similar username etc.) all from scratch without any authentication libraries.
- **Automatic in-page feed refresh**: In order to create a real time effect of refreshing the feed while not refreshing every "x seconds" of create a bad user interface where the screen "blinks" very often, I implemented an in-page refresh method (`scripts.js line 32`) which reloads the feed whenever a user scrolls all the way to the top (similar to instagram, snapchat etc.). This also enabled multiple users to use the app at the same time, getting "real-time" questions from one another.
- **User database + sessions for persistence**: I used sessions to create persisting experiences. This enabled the same user to close out of the browser and resume (without logging in) if they had previously signed in. Additionally, users could also have multiple tabs open at once.

## Design/Evaluation Achievements
- **Visualizing the difference of opinions**: This was a design achievement which was done to increase user experience. This enabled a minimal design which was free of wasted text and created a visual feel of opinions.
- **Smooth entrance of feed**: I utilized an external JS library (scroll-entrance.js) to enable the feed to "smoothly appear" instead of appearing out of nowhere. This was done to create a better user experience similar to what websites like gmail and facebook use.
- **Use of Bulma CSS framework for styling form elements and other visual aspects**: I used an external CSS framework (Bulma) to personalize many different elements of the web application. This enabled me to create better forms (login, signup, new question) and buttons.
