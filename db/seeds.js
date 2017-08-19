const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');


mongoose.connect(dbURI);

const Artist = require('../models/artist');
const User = require('../models/user');

Artist.collection.drop();
User.collection.drop();

User
  .create([{
    email: 'ange@gmail.com',
    image: 'http://i.imgur.com/v7SUrLZ.jpg',
    username: 'Ange M',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    email: 'guest@email.com',
    image: 'guest.jpg',
    username: 'Guest',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);

    return Artist
  .create([{
    image: 'audre-lorde.jpg',
    name: 'Audre Lorde',
    reason: 'In my late 20s I read a collection of Audre Lorde\'s poems. A sharp contrast to the poems we learnt in school, her\'s spoke to me in a way that caught my interest by talking about issues that I had faced. She identified as a ‘black lesbian feminist mother warrior artist’ and was out spoken in her views. She brought awareness and challenged society against homophobia, classism, racism, sexism and ageism. Some of her poems are over half a century old but are still relatable to today.',
    category: 'poet',
    recommend: 'Collected Poems of Audre Lorde, Sister Outsider(A collection of essays and speeches)',
    createdBy: users[0]
  },{
    image: 'bridget-minamore.png',
    name: 'Briget Minamore',
    reason: 'I read Bridget\'s pamphlet \'Titanic\' last year and was hooked by her funny and direct writing styles. I love the way she used songtitles throughout. She manages to capture the feelings of love and the hot mess in a way that anyone can relate to.',
    category: 'poet',
    recommend: 'Titanic',
    createdBy: users[0]
  },{
    image: 'siana-bangura.jpg',
    name: 'Siana Bangura',
    reason: 'I first heard of Siana after she spoke out about a racist incident that had happened to her on a train. She is open about her vulnerabilities and in particular a poem called Coconut spoke to me in a way that a it has to a lot of others. I have been lucky enough to have attended one of Siana\'s workshops where we spoke as a group about anger as an emotion, how it can have different conotations depending on gender or race, and how to practise our own wellbeing for mental health. I definitely recommend attending a workshop if you want to feel empowered!',
    category: 'poet',
    recommend: 'Elephant',
    createdBy: users[0]
  },{
    image: 'maya-angelou-2.jpg',
    name: 'Maya Angelou',
    reason: 'To me, Ms Angelou\'s work is untimely. I repeatedly go back and read her books and poems over and over. I think she was the only black female artist I studied in English as a kid. It made me aware that at my age, I had never read artistry or books by anyone of colour and kicked me into an effort to seek the voices out that I wanted to hear. She was an activist and was not afraid to speak her mind.',
    category: 'poet',
    recommend: 'I know why the caged bird sings, Just Give Me a Cool Drink of Water \'fore I Diiie',
    createdBy: users[0]
  },{
    image: 'lucille-clifton.jpg',
    name: 'Lucille Clifton',
    reason: 'I still listen to her poem won\'t you celebrate with me on a regular basis. Her work lifted me through some difficult stages of life and I can still get a boost of strength from them whenever I read.',
    category: 'poet',
    recommend: 'Blessing the Boats: New and selected poems',
    createdBy: users[0]
  },{
    image: 'rita-dove.png',
    name: 'Rita Dove',
    reason: 'Rita Dove creates artistry thats a real mix of personal and political issues using her unique artistic style to creat a multi-layered meaning in her work. She was the youngest and first African American to be appointed artist Laureate Consultant by the Library of Congress.',
    category: 'poet',
    recommend: 'Thomas and Beulah',
    createdBy: users[0]
  },{
    image: 'aylsia-harris.jpg',
    name: 'Alysia Harris',
    reason: 'I saw Alysia Harris perform her poem \'That Girl\' on youtube. I was drawn in by her style, being able to perform in a way that feels like a conversation with the audience.',
    category: 'poet',
    recommend: 'No books so far but check out \'Death Poem\'',
    createdBy: users[0]
  },{
    image: 'mahogany-browne.jpg',
    name: 'Mahogany L Browne',
    reason: 'Another person who I love for her raw language. She has already released a small collection of poems and continues within her career as a artist, journalist, writer, producer and performer.',
    category: 'poet',
    recommend: 'Dear Twitter: Love Letters Hashed Out On-line',
    createdBy: users[0]
  }, {
    image: 'tiffany-haddish.jpg',
    name: 'Tiffany Haddish',
    reason: 'I\'ve seen a lot of Tiffany\'s standup on YouTube at the \'Laughter Factory\'. She is definitely someone who speaks her mind and is also an excellent comedian. She held her own on \'Girls Trip\' and improvised some of her own lines, go and see it!',
    category: 'actress',
    recommend: 'Girls Trip',
    createdBy: users[1]
  }, {
    image: 'janelle-monae.jpg',
    name: 'Janelle Monae',
    reason: 'Janelle kills it both in the music industry and in film. I\'ve been a fan for a long time. She also has a strong Twitter presence and isn\'t afraid to speak out for what she believes in.',
    category: 'actress, musician',
    recommend: 'Moonlight (Film), Hidden Figures (Film), The Electric Lady (Album)',
    createdBy: users[0]
  }, {
    image: 'taraji-p-henson.jpg',
    name: 'Taraji P Henson',
    reason: 'She cracks me up everytime I see her on screen, she kills it on TV and on films.',
    category: 'actress',
    recommend: 'Hidden Figures (Film), Empire (TV)',
    createdBy: users[1]
  }, {
    image: 'beyonce.jpg',
    name: 'Beyonce Knowles-Carter',
    reason: 'There are many reasons to love Beyonce, I have been a fan since I was 12 and she was in Destiny\'s child. Over the years her music has developed and her last album \'Lemonade\' is the peak of her presence as an artist that is pushing Intersectional Feminism into the mainstream so that others can understand why black women are using the term. She has repeated released amazing album one after the next and I for one have been heavily influenced by her through as I grew older.',
    category: 'actress, musician',
    recommend: 'Lemonade (Visual Album), Cadillac Records (Film), Dream Girls (Film), Beyonce (Album)',
    createdBy: users[0]
  }, {
    image: 'solange-knowles.jpg',
    name: 'Solange Knowles',
    reason: 'Solange\'s albums have always been influenced by her feelings no race, sexuality and gender. Her latest album kicked it up a notch and really pushed her to the forefront of the music industry to be as visible as her sister Beyonce. In my opinion, Solange has always been able to hold her own and have always been a fan of her music',
    category: 'musician',
    recommend: 'A Seat At The Table, Sol-Angels and The Hadley St. Dreams',
    createdBy: users[0]
  }, {
    image: 'toni-morrison.gif',
    name: 'Toni Morrison',
    reason: 'I\'ve read Toni\'s books since I was young and she influenced my view of reading at an age where I felt most alone. I was always able to escape in my teenage years by sticking my head into one of her books.',
    category: 'author',
    recommend: 'Beloved, The Bluest Eye, Home',
    createdBy: users[1]
  }, {
    image: 'oprah-winfrey.jpeg',
    name: 'Oprah Winfrey',
    reason: 'There\'s not much to say about Oprah that hasn\'t already been said. Having a successful talk show as an African American woman from 1986-2011, she owns her own network (OWN) and continues to put out new show\'s showing experiences of black lives. When it comes to acting she\'s also had a strong presence in playing difficult roles that have gone down in history.',
    category: 'actress',
    recommend: 'The Color Purple, The Butler, Selma, The Princess and The Frog',
    createdBy: users[0]
  }, {
    image: 'laverne-cox.jpg',
    name: 'Lavern Cox',
    reason: 'I love everything I\'ve seen her in. She takes on roles that are important to show the lives of black women that are the most oppressed. Check out the documentary \'Free CeCe\'',
    category: 'actress',
    recommend: 'Orange Is The New Black, Rocky Horror Picture Show, Free CeCe',
    createdBy: users[1]
  }

  ]);

  })
  .then((artists) => console.log(`${artists.length} artists created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
