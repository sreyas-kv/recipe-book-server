// 'use strict';
// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello world from login');
// });

// router.post('/', (req, res) => {
//     res.send("Hello world Post");
// });

// module.exports = router;


'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world from login');
});

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(localAuth, bodyParser.json());
// The user provides a username and password to login
router.post('/',(req, res) => {
  const authToken = createAuthToken(req.user.serialise());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  // console.log(req.body);
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;
