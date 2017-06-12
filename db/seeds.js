const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const databaseURL = 'mongodb://localhost/wdi-ldn-project-1';
mongoose.connect(databaseURL);

const Poet = require('../models/poet');
const User = require('../models/user');

Poet.collection.drop();
User.collection.drop();

User
  .create([{
    email: 'ange@gmail.com',
    image: 'http://i.imgur.com/v7SUrLZ.jpg',
    username: 'Ange M',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);

    return Poet
  .create([{
    image: 'http://thefeministwire.com/wp-content/uploads/2014/02/51_PORT_1.jpg',
    name: 'Audre Lorde',
    reason: 'In my late 20s I read a collection of Audre Lorde\'s poems. A sharp contrast to the poems we learnt in school, her\'s spoke to me in a way that caught my interest by talking about issues that I had faced. She identified as a ‘black lesbian feminist mother warrior poet’ and was out spoken in her views. She brought awareness and challenged society against homophobia, classism, racism, sexism and ageism. Some of her poems are over half a century old but are still relatable to today.',
    recommend: 'Collected Poems of Audre Lorde, Sister Outsider(A collection of essays and speeches)',
    createdBy: users[0]
  },{
    image: 'https://static1.squarespace.com/static/52028652e4b0e0889c2751b6/t/52488f20e4b05a24380e3294/1380486949138/PoetryForUsProfile+copy.png',
    name: 'Briget Minamore',
    reason: 'I read Bridget\'s pamphlet \'Titanic\' last year and was hooked by her funny and direct writing styles. I love the way she used songtitles throughout. She manages to capture the feelings of love and the hot mess in a way that anyone can relate to.',
    recommend: 'Titanic',
    createdBy: users[0]
  },{
    image: 'http://dreamnation.co.uk/wp-content/uploads/2016/05/Siana09.jpg',
    name: 'Siana Bangura',
    reason: 'I first heard of Siana after she spoke out about a racist incident that had happened to her on a train. She is open about her vulnerabilities and in particular a poem called Coconut was the most relatable to me. I have been lucky enough to have attended one of Siana\'s workshops where we spoke as a group about anger as an emotion, how it can have different conotations depending on gender or race, and how to practise our own wellbeing for mental health. I definitely recommend attending a workshop if you want to feel empowered!',
    recommend: 'Elephant',
    createdBy: users[0]
  }]);

  })
  .then((poets) => console.log(`${poets.length} poets created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
