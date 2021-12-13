var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const { body, validationResult, cookie } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("./db/db");
require("dotenv").config();

var app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTURL,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.status(200).send("ok");
});

app.get(
  "/user",
  cookie("token").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const Users = db.Mongoose.model("users", db.UsersSchema, "users");
      const payload = jwt.verify(req.cookies.token, process.env.SECRET);
      Users.findById(payload.id).then((UserInfo) => {
        res.json({ id: UserInfo.id, username: UserInfo.username });
      });
    }
  }
);

app.delete(
  "/exercicios",
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const Exercicios = db.Mongoose.model("exercicios", db.ExerciciosSchema, "exercicios");
      Exercicios.findById(req.query.id).remove().then((Exercicios) => {
        res.json(Exercicios);
      });
    }
  }
);

app.get(
  "/exercicios",
  cookie("token").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const Exercicios = db.Mongoose.model("exercicios", db.ExerciciosSchema, "exercicios");
      Exercicios.find().then((Exercicios) => {
        res.json(Exercicios);
      });
    }
  }
);

app.put(
  "/exercicios",
  body("id").exists({ checkFalsy: true }),
  body("nome").exists({ checkFalsy: true }),
  body("descricao").exists({ checkFalsy: true }),
  body("musculoAlvo").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    const Exercicios = db.Mongoose.model(
      "exercicios",
      db.ExerciciosSchema,
      "exercicios"
    );
    Exercicios.findOneAndUpdate(data.id, {nome: data.nome, descricao: data.descricao, musculoAlvo: data.musculoAlvo}).then((Exercicios) => {
      res.json(Exercicios);
    }).then(err => {
      console.log(err);
      res.status(500);
    });
  }
);

app.post(
  "/login",
  body("user").exists({ checkFalsy: true }),
  body("password").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const { user, password } = req.body;
      const Users = db.Mongoose.model("users", db.UsersSchema, "users");
      Users.findOne({ username: user })
        .then((result) => {
          if (!result) {
            res.status(403).send({ errorMessage: "User doesn't exist." });
          } else {
            const passOk = bcrypt.compareSync(password, result.password);
            if (passOk) {
              jwt.sign(
                { id: result._id, username: result._username },
                process.env.SECRET,
                (err, token) => {
                  if (err) {
                    res
                      .status(500)
                      .send({ errorMessage: "Error generating user token." });
                  } else {
                    res.cookie("token", token);

                    res
                      .status(200)
                      .json({ id: result._id, username: result.username });
                    next();
                  }
                }
              );
            } else {
              res
                .status(403)
                .send({ errorMessage: "Wrong username or password." });
            }
          }
        })
        .catch((err) => {
          res.status(500).send({ errorMessage: "Error on login." });
        });
    }
  }
);

app.post(
  "/exercicios",
  body("nome").exists({ checkFalsy: true }),
  body("descricao").exists({ checkFalsy: true }),
  body("musculoAlvo").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { nome, descricao, musculoAlvo } = req.body;
    const Exercicios = db.Mongoose.model(
      "exercicios",
      db.ExerciciosSchema,
      "exercicios"
    );
    const newExercicio = new Exercicios({
      nome: nome,
      descricao: descricao,
      musculoAlvo: musculoAlvo,
    });
    newExercicio
      .save()
      .then((result) => {
        res.status(200).send("ok");
      })
      .catch((err) => {
        res.status(500).json(err.code);
      });
  }
);

app.post(
  "/register",
  body("user").exists({ checkFalsy: true }),
  body("password").exists({ checkFalsy: true }),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { user, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const Users = db.Mongoose.model("users", db.UsersSchema, "users");
    const newUser = new Users({ username: user, password: hashedPassword });
    newUser
      .save()
      .then((result) => {
        jwt.sign(
          { id: result._id, username: result._username },
          process.env.SECRET,
          (err, token) => {
            if (err) {
              res
                .status(500)
                .send({ errorMessage: "Error generating user token" });
            } else {
              res.cookie("token", token);

              res
                .status(200)
                .json({ id: result._id, username: result.username });
              next();
            }
          }
        );
      })
      .catch((err) => {
        res.status(500).json(err.code);
      });
  }
);

app.listen(4000);
