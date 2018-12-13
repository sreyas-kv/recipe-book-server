const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { DATABASE_TEST_URL } = require("../config");

const { app, runServer, closeServer } = require('../server');

chai.use(chaiHttp);

describe('RecipeBook', function() {
    before(function() {
        return runServer(DATABASE_TEST_URL);
    });

    after(function() {
        return closeServer();
    });

    it("should display recipes on GET", function() {
        return chai
            .request(app)
            .get('/recipes')
            .then(function(res) {
                expect(res).to.be.a('object');
            });
    });

    it('should create recipe succssfully on POST request', function() {
        const createRecipe = { recipeName: 'Egg Omlet', ingeridents: ['egg', 'salt', 'peper'], cookingTime: '10 mins', directions: ['Beat the eggs', 'Fry the eggs'] };
        return chai.request(app)
            .post('/recipes')
            .send(createRecipe)
            .then(function(res) {
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
            });
    });

});