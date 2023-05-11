const mongoose = require('mongoose');
const fs = require('fs')
const helmet = require("helmet");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const https = require('https')

var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'qwerty'
};

mongoose.connect('mongodb+srv://vishal4855be21:g8Syw62NPqqVS5p2@cluster0.bvvimlw.mongodb.net/myFirstDatabase', {useNewUrlParser: true, useUnifiedTopology: true });

const Device = require('./models/device'); 
const Lighting = require('./models/lighting');
const Security = require('./models/security'); 
const AirConditioning = require('./models/acond');
const FRoomPlan = require('./models/froomplan');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Building',
      version: '1.0.0',
      description: 'API documentation generated using Swagger',
    },
  },
  apis: ['./api.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: 'https://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.highcharts.com/highcharts.js","https://maps.googleapis.com", "https://code.jquery.com", "https://cdnjs.cloudflare.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'", "https://localhost:3000", "mongodb+srv://your-mongodb-url"],
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

app.get('/test', (req, res) => {
  res.send('The API is working!');
});

var server = https.createServer(sslOptions, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  });

  /**
 * @swagger
 * /api/getRooms:
 *   get:
 *     summary: Get Rooms from a floor
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

//ALL ROOMS CORRESPONDING TO EACH FLOOR ARE RETRIEVED
app.get('/api/getRooms', async (req, res) => {
  try {
    const floor = req.query.floor;
    const floorRoom = await FRoomPlan.findOne({ floor: floor }).exec();
    const rooms = floorRoom.rooms;
    res.json(rooms);
  } catch (err) {
    console.error(err);
  }
});
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

//TO REMOVE A DEVICE
app.delete('/api/remove', async (req, res) => {

  try {
    const type = req.body.type;
    const floor = req.body.floor;
    const room = req.body.room;
    const device = req.body.device;

    if (type === '1') {
      await Lighting.findOneAndRemove({ floor: floor, room: room, name: device });
      console.log('Device removed successfully');
    } else if (type === '2') {
      await AirConditioning.findOneAndRemove({ floor: floor, room: room, name: device });
    } else if (type === '3') {
      await Security.findOneAndRemove({ floor: floor, room: room, name: device });
    }
    console.log("Removal successful");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
  
});

//TO GET ALL THE LIGHTING DEVICES
app.get('/api/lighting', async (req, res) => {
  try {
    const lightingData = await Lighting.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//TO GET ALL THE SECURITY DEVICES
app.get('/api/security', async (req, res) => {
  try {
    const lightingData = await Security.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//TO GET ALL THE AIR CONDITIONING DEVICES
app.get('/api/aircon', async (req, res) => {
  try {
    const lightingData = await AirConditioning.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//GETTING DEVICE(s)
app.get('/api/removeDev', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;

    let devices = [];

    if (type === '1') {
      devices = await Lighting.find({ floor: floor, room: room });
    } else if (type === '2') {
      devices = await AirConditioning.find({floor: floor, room: room });
    } else if (type === '3') {
      devices = await Security.find({floor: floor, room: room });
    }

    console.log('Devices (floor, room, type:)', devices);

    //a json object with all the retrieved devices is sent
    res.json(devices);

  } catch (err) {
    console.error(err);
  }

});

//RETRIEVING SENSOR DATA
app.get('/api/Data', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;
    const name = req.query.name;

    let data = [];

    if (type === '1') {
      data = await Lighting.find({ floor: floor, room: room, name: name});
    } else if (type === '2') {
      data = await AirConditioning.find({floor: floor, room: room, name: name });
    } else if (type === '3') {
      data = await Security.find({floor: floor, room: room, name: name });
    }

    const sensorData = data.map((item) => item.sensorData).flat();

    res.json(sensorData);

  } catch (err) {
    console.error(err);
  }
});

//TO ADD A LIGHTING DEVICE
app.post('/api/lighting', async (req, res) => {
  const { name, floor, room } = req.body;

  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);
  const device = await AirConditioning.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Lighting({
    name,
    floor,
    room,
    status: false,
    sensorData: [1,10, 8, 90] //default sensor data added at the time of new device obj creation
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }
});

//TO ADD A SECURITY DEVICE
app.post('/api/security', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);

  const device = await Security.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Security({
    name,
    floor,
    room,
    status: false,
    sensorData: [34, 5, 0, 8] //default sensor data
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }
  
});

//TO ADD AN AIR CONDITIONING DEVICE
app.post('/api/AirConditioning', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);

  const device = await AirConditioning.findOne({ name: name, floor:floor, room: room });
  if (!device) {
    const newDevice = new AirConditioning({
    name,
    floor,
    room,
    status: false,
    sensorData: [5,6,7,8,0] //defualt sensor data
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }

});

//TO ADD FLOOR SAMPLE DATA, RUNS once

//deivces get and post requests for,, reference

app.get('/devices', (req, res) => {
  Device.find({})
    .then(devices => {
      res.send(devices);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post('/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});
