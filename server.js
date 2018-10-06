require('newrelic');
const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var compression = require('compression');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount/2; i++) {
      cluster.fork()
  }
} else {
  var server = express();
  // server.use(compression())
  // server.use(bodyParser.json());
  // server.use(express.urlencoded({extended: true}));
  server.use(express.static(path.join(__dirname, './'), { maxAge: '30 days' }));
  server.use(cors());

  // Albums & Player
  server.get('/artists/albums/:artistID', (req, res) => {
    res.redirect('http://52.15.129.193' + req.url);
  });

  // Related Artists
  server.get('/relatedArtists/artist/:id', (req, res) => {
    res.redirect('http://localhost:3002' + req.url);
  });

  // Popular Songs
  server.get('/artist/:id', (req, res) => {
    res.redirect('http://18.224.17.253' + req.url);
  });

  // Header
  server.get('/artists/:artistID', (req, res) => {
    res.redirect('http://35.172.133.115' + req.url);
  });

  server.listen(3000, console.log('Listening on:', 3000));
}

cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!')
  cluster.fork()
})