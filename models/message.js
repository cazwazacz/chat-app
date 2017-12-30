var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  name: String,
  body: String
});

module.exports = mongoose.model("Message", messageSchema, "messages");
