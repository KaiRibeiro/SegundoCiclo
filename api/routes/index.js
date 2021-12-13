var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require("../db/db");

router.get('/', function(req, res, next) {
  res.status(200).send('ok');
});

router.post('/register', cors({
  credentials:true,
  origin: process.env.FRONTURL
}), body('user').exists({checkFalsy: true}), body('password').exists({checkFalsy: true}), function(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const {user, password} = req.body;
  const hashedPassword=bcrypt.hashSync(password, 10);
  const Users = db.Mongoose.model('users', db.UsersSchema, 'users');
  const newUser = new Users({username:user, password:hashedPassword});
  newUser.save().then((result) => {
    res.status(200).send('User registered successfully');
  })
});

module.exports = router;
