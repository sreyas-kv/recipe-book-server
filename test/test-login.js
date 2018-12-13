const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const { DATABASE_TEST_URL } = require("../config");
const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);

describe('Pairprogramming', function() {
    before(function() {
        return runServer(DATABASE_TEST_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should display login.html page on GET request', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.be.a('object');
            });
    });

    it('should Login with POST request', function() {
        const loginDetails = { githubUsername: 'sreyas-kv', password: 'sreyas-kv123' };
        return chai.request(app)
            .post('/')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.a('object');
            });
    });

    it('should show error for incorrect username password on POST request', function() {
        const loginDetails = { githubUsername: 'sreyas-v', password: 'sreyakv123' };
        return chai.request(app)
            .post('/')
            .send(loginDetails)
            .then(function(res) {
                expect(res).to.be.a('Object');
            });
    });


});