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
let Repo = require('../models/repo');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Admin', () => {
    describe('PUT /admin/batch/parse', () => {
        before(() => {
            return Cog.remove({})
                .then(() => {
                    return Repo.remove({});
                })
                .then(() => {
                    let repo = new Repo({
                        'name': 'ORELS-Cogs',
                        '_id': '587d7a9d13893158907d1729',
                        'links': {
                            '_self': '/api/v1/repos/orels1/ORELS-Cogs',
                            'self': 'cogs/orels1/ORELS-Cogs/',
                            'github': {
                                'self': 'https://github.com/orels1/ORELS-Cogs',
                            },
                        },
                        'type': 'unapproved',
                        'parsed': false,
                        'cogs': [],
                        'author': {
                            'url': 'https://github.com/orels1',
                            'username': 'orels1',
                        },
                    });
                    return repo.save();
                })
                .then(() => {
                    let cog = new Cog({
                        'links': {
                            'github': {
                                '_update': 'https://api.github.com/repos/orels1/ORELS-Cogs/contents/dota/info.json?ref=master',
                                'repo': 'https://github.com/orels1/ORELS-Cogs',
                                'self': 'https://github.com/orels1/ORELS-Cogs/blob/master/dota/dota.py',
                            },
                            'repo': '/cogs/orels1/ORELS-Cogs/',
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
                    return cog.save();
                })
                .catch((err) => {
                    throw err;
                });
        });

        after(() => {
            return Repo.remove({})
                .then(() => {
                    return Cog.remove({});
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should start parsing all repos and cogs', () => {
            return chai.request(app)
                .put(`${apiUrl}/admin/batch/parse`)
                .set('Service-Token', process.env.serviceToken)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.equal('Parsing started');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
