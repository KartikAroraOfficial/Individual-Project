const express = require('express');
const fs = require('fs')
const helmet = require("helmet");
const https = require('https')
var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'uiop'
};
var app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.highcharts.com/highcharts.js","https://maps.googleapis.com", "https://code.jquery.com", "https://cdnjs.cloudflare.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'", "https://65.1.1.230:5000", "mongodb+srv://kartik4835be21:T3KsyseeDjtUnvEM@cluster0.5fl0zch.mongodb.net/Ind-project"],
      frameAncestors: ["'none'"],
      "Cross-Origin-Embedder-Policy": "require-corp",
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'","https://maxcdn.bootstrapcdn.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://maxcdn.bootstrapcdn.com","https://stackpath.bootstrapcdn.com","https://fonts.gstatic.com", "https://fonts.googleapis.com", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  }
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

var server = https.createServer(sslOptions, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  });

  app.get('/', function (req, res) {
    res.sendFile(`${base}/welcome.html`);
  });

  app.get('/addD', function (req, res) {
    res.sendFile(`${base}/addD.html`);
  });
  app.get('/monitor', function (req, res) {
    res.sendFile(`${base}/monitor.html`);
  });

  app.get('/light_pref', function (req, res) {
    res.sendFile(`${base}/light_pref.html`);
  });

  app.get('/RemD', function (req, res) {
    res.sendFile(`${base}/RemD.html`);
  });

  app.get('/lighting', function (req, res) {
    res.sendFile(`${base}/lighting.html`);
  });

  app.get('/aircon', function (req, res) {
    res.sendFile(`${base}/aircon.html`);
  });

  app.get('/security', function (req, res) {
    res.sendFile(`${base}/security.html`);
  });




