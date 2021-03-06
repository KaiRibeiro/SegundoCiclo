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
const exerciciosSchema = new mongoose.Schema({
  nome: {type: String},
  descricao: {type: String},
  musculoAlvo: {type: String},
});

module.exports = { Mongoose: mongoose, UsersSchema: usersSchema, ExerciciosSchema: exerciciosSchema };
