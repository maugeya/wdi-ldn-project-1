const port = process.env.PORT || 3000;

const dbURI = process.env.MONGOD_URI || 'mongodb://localhost/wdi-ldn-project-1';

module.exports = { port, dbURI };
