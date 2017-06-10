const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const router= require('./config/routes');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose.Promise = require('bluebird');
const app = express();

const { port } = require('./config/environment');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.get('/', (req, res) => res.render('index'));

app.use(router);
app.listen(port, () => console.log(`Express is listening on port ${port}`));
