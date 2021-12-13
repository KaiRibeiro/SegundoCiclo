const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const usersSchema = new mongoose.Schema({
    username: {type: String, unique:true},
    password: {type: String},
});

module.exports = { Mongoose: mongoose, UsersSchema: usersSchema };
