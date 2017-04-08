/**
 * Created by antonorlov on 29/01/2017.
 */
let chai = require('chai'),
    app = require('../../app'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose'),
    chaiAsPromised = require('chai-as-promised');

// Models
let Cog = require('../../models/cog');
let Repo = require('../../models/repo');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Count', () => {
    beforeEach(() => {
        return Repo.remove({})
            .then(() => {
                return Cog.remove({});
            })
            .then(() => {
                return null;
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
            .then(() => {
                return null;
            })
            .catch((err) => {
                throw err;
            });
    });

    describe('GET /count/', () => {
        it('it should return cogs and repos count', () => {
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
                'hidden': false,
                'name': 'dota',
            });
            return cog.save()
                .then(() => {
                    let repo = new Repo({
                        'name': 'ORELS-Cogs',
                        'author': {
                            'username': 'orels1',
                            'url': 'https://github.com/orels1',
                        },
                        'links': {
                            '_self': '/api/v1/repos/orels1/ORELS-Cogs',
                            '_update': '/api/v1/repos/orels1/ORELS-Cogs/fetch',
                            '_cogs': '/api/v1/cogs/orels1/ORELS-Cogs',
                            'self': '/cogs/orels1/ORELS-Cogs',
                            'github': {
                                'self': 'https://github.com/orels1/ORELS-Cogs',
                            },
                        },
                    });
                    return repo.save();
                })
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/misc/count`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('count');
                    res.body.results.count.should.have.property('repos');
                    res.body.results.count.repos.should.be.equal(1);
                    res.body.results.count.should.have.property('cogs');
                    res.body.results.count.cogs.should.be.equal(1);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /count/cogs', () => {
        it('it should return cogs count', () => {
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
                'hidden': false,
                'name': 'dota',
            });
            return cog.save()
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/misc/count/cogs`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('count');
                    res.body.results.count.should.be.equal(1);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /count/repos', () => {
        it('it should return repos count', () => {
            let repo = new Repo({
                'name': 'ORELS-Cogs',
                'author': {
                    'username': 'orels1',
                    'url': 'https://github.com/orels1',
                },
                'links': {
                    '_self': '/api/v1/repos/orels1/ORELS-Cogs',
                    '_update': '/api/v1/repos/orels1/ORELS-Cogs/fetch',
                    '_cogs': '/api/v1/cogs/orels1/ORELS-Cogs',
                    'self': '/cogs/orels1/ORELS-Cogs',
                    'github': {
                        'self': 'https://github.com/orels1/ORELS-Cogs',
                    },
                },
            });
            return repo.save()
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/misc/count/repos`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('count');
                    res.body.results.count.should.be.equal(1);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
