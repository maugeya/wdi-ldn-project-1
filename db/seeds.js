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
    image: 'audre-lorde.jpg',
    name: 'Audre Lorde',
    reason: 'In my late 20s I read a collection of Audre Lorde\'s poems. A sharp contrast to the poems we learnt in school, her\'s spoke to me in a way that caught my interest by talking about issues that I had faced. She identified as a ‘black lesbian feminist mother warrior poet’ and was out spoken in her views. She brought awareness and challenged society against homophobia, classism, racism, sexism and ageism. Some of her poems are over half a century old but are still relatable to today.',
    recommend: 'Collected Poems of Audre Lorde, Sister Outsider(A collection of essays and speeches)',
    createdBy: users[0]
  },{
    image: 'bridget-minamore.png',
    name: 'Briget Minamore',
    reason: 'I read Bridget\'s pamphlet \'Titanic\' last year and was hooked by her funny and direct writing styles. I love the way she used songtitles throughout. She manages to capture the feelings of love and the hot mess in a way that anyone can relate to.',
    recommend: 'Titanic',
    createdBy: users[0]
  },{
    image: 'siana-bangura.jpg',
    name: 'Siana Bangura',
    reason: 'I first heard of Siana after she spoke out about a racist incident that had happened to her on a train. She is open about her vulnerabilities and in particular a poem called Coconut spoke to me in a way that a it has to a lot of others. I have been lucky enough to have attended one of Siana\'s workshops where we spoke as a group about anger as an emotion, how it can have different conotations depending on gender or race, and how to practise our own wellbeing for mental health. I definitely recommend attending a workshop if you want to feel empowered!',
    recommend: 'Elephant',
    createdBy: users[0]
  },{
    image: 'maya-angelou-2.jpg',
    name: 'Maya Angelou',
    reason: 'To me, Ms Angelou\'s work is untimely. I repeatedly go back and read her books and poems over and over. I think she was the only black female poet I studied in English as a kid. It made me aware that at my age, I had never read poetry or books by anyone of colour and kicked me into an effort to seek the voices out that I wanted to hear. She was an activist and was not afraid to speak her mind.',
    recommend: 'I know why the caged bird sings, Just Give Me a Cool Drink of Water \'fore I Diiie',
    createdBy: users[0]
  },{
    image: 'lucille-clifton.jpg',
    name: 'Lucille Clifton',
    reason: 'I still listen to her poem won\'t you celebrate with me on a regular basis. Her work lifted me through some difficult stages of life and I can still get a boost of strength from them whenever I read.',
    recommend: 'Blessing the Boats: New and selected poems',
    createdBy: users[0]
  },{
    image: 'rita-dove.png',
    name: 'Rita Dove',
    reason: 'Rita Dove creates poetry thats a real mix of personal and political issues using her unique poetic style to creat a multi-layered meaning in her work. She was the youngest and first African American to be appointed Poet Laureate Consultant by the Library of Congress.',
    recommend: 'Thomas and Beulah',
    createdBy: users[0]
  },{
    image: 'aylsia-harris.jpg',
    name: 'Alysia Harris',
    reason: 'I saw Alysia Harris perform her poem \'That Girl\' on youtube. I was drawn in by her style, being able to perform in a way that feels like a conversation with the audience.',
    recommend: 'No books so far but check out \'Death Poem\'',
    createdBy: users[0]
  },{
    image: 'mahogany-browne.jpg',
    name: 'Mahogany L Browne',
    reason: 'Another person who I love for her raw language. She has already released a small collection of poems and continues within her career as a poet, journalist, writer, producer and performer.',
    recommend: ' Dear Twitter: Love Letters Hashed Out On-line',
    createdBy: users[0]
  }

  ]);

  })
  .then((poets) => console.log(`${poets.length} poets created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
