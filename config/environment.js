const port = process.env.PORT || 3000;

const env = process.env.NODE_ENV || 'development';

const dbURI = process.env.MONGOD_URI || 'mongodb://localhost/wdi-ldn-project-1';

const sessionSecret = process.env.SESSION_SECRET || 'ssh it\'s a secret';


module.exports = { port, env, dbURI, sessionSecret };
