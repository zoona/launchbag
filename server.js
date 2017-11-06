const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');

const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors());
app.options('*', cors());
  
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

var io = require('socket.io')(server);
app.set('socketio', io);

// socket io
io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('disconnect', function() {
      console.log('User disconnected');
    });

    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });

  });

server.listen(port, () => console.log(`Running on localhost:${port}`));