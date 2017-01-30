/**
 * Created by antonorlov on 30/01/2017.
 */
let chai = require('chai'),
    app = require('../../app'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose'),
    chaiAsPromised = require('chai-as-promised');

// Models
let Cog = require('../../models/cog');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Tags', () => {
    before(() => {
        return Cog.remove({})
            .catch((err) => {
                throw err;
            });
    });

    describe('GET /top', () => {
        before(() => {
            return Cog.insertMany([
                {
                    'tags': ['gaming', 'fun', 'api'],
                },
                {
                    'tags': ['gaming', 'api'],
                },
                {
                    'tags': ['fun', 'api'],
                },
                {
                    'tags': ['fun', 'api'],
                },
                {
                    'tags': ['fun', 'api', 'stats'],
                },
            ])
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return tags in descending order', () => {
            return chai.request(app)
                .get(`${apiUrl}/misc/tags/top`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('list');
                    res.body.results.list.should.be.an('array');
                    res.body.results.list.should.have.lengthOf(4);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
