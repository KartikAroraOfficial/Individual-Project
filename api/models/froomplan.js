const mongoose = require('mongoose');

module.exports = mongoose.model('FRoomPlan', new mongoose.Schema({
  floor:String,
  rooms: Array
}, { collection : 'fr' }));