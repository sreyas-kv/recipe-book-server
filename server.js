'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const router = express.Router();
const app = express();

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());

//Mongoose Promise
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');

const { localStrategy, jwtStrategy } = require('./routes/auth/strategies')

//Enabling Morgan
app.use(require('morgan')('common'));


//Setting the routes
const recipes = require('./routes/recipes');
const login = require('./routes/auth/login');
// const refresh = require('./routes/auth/login');
const signup = require('./routes/auth/signup');
const rating = require('./routes/rating');

//CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});




passport.use(localStrategy);
passport.use(jwtStrategy);


app.use('/recipes', recipes);
app.use('/login', login);
// app.use('/refresh', refresh);
app.use('/signup', signup);
app.use('/rating', rating);

const jwtAuth = passport.authenticate('jwt', { session: false });

//Protected endpoint which needs a valid JWT to access it
app.get('/protected', jwtAuth, (req, res) => {
    return res.json({
        data: 'recipe-book'
    });
});


//Catch all endpoint if client makes request to non existent end point
app.use('*', function (req, res) {
    res.status(404).json({ message: 'Route Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run

//connect db on server start
let server;
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            databaseUrl,
            err => {
                if (err) {
                    return reject(err);
                }
                server = app
                    .listen(port, () => {
                        console.log(`This Server is listening to port ${port}`);
                        resolve();
                    })
                    .on('error', error => {
                        mongoose.disconnect();
                        reject(err);
                    });
            }
        )
    })
}

//Closing the server
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}


// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
