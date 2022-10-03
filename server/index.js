const { Server, Socket } = require('socket.io');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dayjs = require('dayjs');

const Joi = require('joi');
const { createValidator } = require('express-joi-validation');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const http = require('http');
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:3000'
  },
  transports: ['websocket', 'polling']
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQL DB SETUP
const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

// SOCKETS
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// API VALIDATOR SCHEMA HANDLERS
const validator = createValidator({
  // This options forces validation to pass any errors the express
  // error handler instead of generating a 400 error
  passError: true
});

const querySchema = Joi.object({
  // Same schema as front-end for consistency
  name: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(3).max(300).required()
  // alpha num was tried but it was not allowing space in validation
});

// API HANDLERS
// validator.body is for POST
// validator.query is for GET
app.post('/createComment', validator.body(querySchema), function (request, response, next) {
  // Reaching here means, validator schema was successfully validated
  const { body } = request;
  // Do input validation + input security sanitization
  comment
    .createComment(body)
    .then(result => {
      io.emit('message', { ...body, created: dayjs().format('YYYY-MM-DD HH:mm:ss') });
      response.send(result);
    })
    .catch(next);
});

app.get('/getComment', function (request, response) {
  const { body } = request;
  const { id } = body;

  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function (request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

// make API key / secret specific, or else anyone can nuke my db
app.delete('/deleteComments', function (request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

httpServer.listen(3002, () => {
  console.log('listening on *:3002');
});

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});

// Joi middleware handler
// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    return res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
  }
});
