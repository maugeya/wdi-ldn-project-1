# Black Girl Magic creative.
### A database of excellence!


### Installation and setup
* Download or clone repo.
* ``` yarn install ``` to install dependencies.
* ``` gulp ``` to compile the source code and open in the browser.

> **Note:** You'll need to have ```mongodb``` installed globally and have ```mongod``` running on ```port 27017 ```

### About the app
The second project for the WDI course at GA was to be completed using NoSQL and a model of our choice. I chose black women in the creative industry as a model after the \#Blackgirlmagic concept and movement, as a chance to me a database that other young black women can visit and learn see the wealth of women already known for the impact their having in society. Also as a database, a user can input their own suggestions of women to add.

A user has to register either directly through the app or via the Facebook's Oauth facility. Once registered, a profile is created and the user has access to add new women to the list. 

![Registration](http://i.imgur.com/Wxat3Ay.png)

The user is prompted to add a name, picture file and 'reason' for why they have added her to the database. 

At the stage where a user clicks on the show page for an entry, the Youtube API kicks in and uses the entry's name to perform a search of videos with the name given. A selection of up to 4 videos is appended to the the show page content, giving the user more insite into the detils on the artist clicked.

![Show page](http://i.imgur.com/cbUB8hv.png)

I have also used an Wikipedia API, which will only print a link if the woman selected has a page on wikipedia, giving the user even more information if they are interested in what they see!

All users, registered or not can gain access to the main index and the show pages, but only registered users are able to add women to the collection and comment on them.
![Index content page](http://i.imgur.com/CpO5zsZ.png)

Only the user who created the post or the comment, has access to edit or delete. 


### Technologies used
* HTML 5
* SCSS
* Bootstrap v4
* Javascript ES6
* jQuery 3.10
* Gulp
* Yarn
* Git & github
* Node.JS
* Amazon Web Services
* Facebook OAuth
* Youtube API
* Wikipedia API


### Challenges faced

Using the Youtube API was a bit difficult. In particular it was difficult to get my head around the documentation, which was peppered with mentions of Google OAuth but no sign of the API! In the end I was able to concentrate directly on the Youtube API and it wasn't as bad as I had feared!

The Wikipedia API docs are very useful. Other issues included, bringing down my expectations of what I wanted to complete in the project. I wanted to get functionality done and API's completely working so that I could add extra models in the future when I have more time to work on the project.

### Future Improvements

I want to expand the index of entries that are in the db to including all women from different categories rather than just artistry.

I would also like to have a selection of pictures for all that are on the site that can be randomly picked so that it is not always the same picture appearing all the time. 

