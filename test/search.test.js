/**
 * Created by antonorlov on 29/01/2017.
 */
let chai = require('chai'),
    app = require('../app'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose'),
    chaiAsPromised = require('chai-as-promised');

// Models
let Cog = require('../models/cog');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Search', () => {
    beforeEach(() => {
        return Cog.remove({})
            .then(() => {
                return null;
            })
            .catch((err) => {
                throw err;
            });
    });


    after(() => {
        return Cog.remove({})
            .then(() => {
                return null;
            })
            .catch((err) => {
                throw err;
            });
    });

    describe('GET /cogs/:term', () => {
        it('it shold return 404', () => {
            return chai.request(app)
                .get(`${apiUrl}/search/cogs/dota`)
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should get Cogs matching name', () => {
            let cog = new Cog({
                'links': {
                    'github': {
                        '_update': 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master',
                        'repo': 'https://github.com/orels1/ORELS-Cogs',
                        'self': 'https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py',
                    },
                    'repo': 'cogs/orels1/ORELS-Cogs/',
                    'self': '/cogs/orels1/ORELS-Cogs/dota/',
                    '_update': '/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch',
                    '_repo': '/api/v1/repos/orels1/ORELS-Cogs',
                    '_self': '/api/v1/cogs/orels1/ORELS-Cogs/dota',
                },
                'description': 'Requires tabulate, dota2py and beautfulSoup\n',
                'short': 'test',
                'author': {
                    'url': 'https://github.com/orels1',
                    'name': 'orels',
                    'username': 'orels1',
                },
                'repo': {
                    'type': 'unapproved',
                    'name': 'ORELS-Cogs',
                },
                'name': 'dota',
            });
            return cog.save()
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/search/cogs/dota`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('list');
                    res.body.results.list.should.have.lengthOf(1);
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should get Cogs matching tag', () => {
            let cog = new Cog({
                'links': {
                    'github': {
                        '_update': 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master',
                        'repo': 'https://github.com/orels1/ORELS-Cogs',
                        'self': 'https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py',
                    },
                    'repo': 'cogs/orels1/ORELS-Cogs/',
                    'self': '/cogs/orels1/ORELS-Cogs/dota/',
                    '_update': '/api/v1/cogs/orels1/ORELS-Cogs/dota/fetch',
                    '_repo': '/api/v1/repos/orels1/ORELS-Cogs',
                    '_self': '/api/v1/cogs/orels1/ORELS-Cogs/dota',
                },
                'description': 'Requires tabulate, dota2py and beautfulSoup\n',
                'short': 'test',
                'author': {
                    'url': 'https://github.com/orels1',
                    'name': 'orels',
                    'username': 'orels1',
                },
                'repo': {
                    'type': 'unapproved',
                    'name': 'ORELS-Cogs',
                },
                'name': 'dota',
                'tags': ['gaming', 'api'],
            });
            return cog.save()
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/search/cogs/gaming`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('list');
                    res.body.results.list.should.have.lengthOf(1);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
