const express = require("express");
const router = express.Router();
let User = require('../models/users');

router.route('/register').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const newUser = new User({
        email,
        password
    });

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/login').post((req, res) => {
    User.find({email: req.body.email, password: req.body.password})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

module.exports = router;