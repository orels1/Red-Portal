/**
 * Created by antonorlov on 28/01/2017.
 */
let chai = require('chai'),
    app = require('../app'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose'),
    chaiAsPromised = require('chai-as-promised');

// Models
let Cog = require('../models/cog');
let Vote = require('../models/vote');
let Repo = require('../models/repo');

let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const apiUrl = '/api/v1';

describe('Cogs', () => {
    after(() => {
        return Cog.remove({})
            .then(() => {
                return null;
            })
            .catch((err) => {
                throw err;
            });
    });

    describe('GET /cogs', () => {
        before(() => {
            return Cog.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('should get all the cogs', () => {
            return chai.request(app)
                .get(`${apiUrl}/cogs`)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.list.should.be.an('array');
                    res.body.results.list.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /cogs/:author/:repoName', () => {
        before(() => {
            return Cog.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .get(`${apiUrl}/cogs/test/test`)
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should get Cogs by given author and repo', () => {
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
                .then((saved) => {
                    return chai.request(app).get(`${apiUrl}/cogs/${saved.author.username}/${saved.repo.name}`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.list.should.be.an('array');
                    res.body.results.list.should.have.lengthOf(1);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /cogs/:author/:repoName/:cogName', () => {
        before(() => {
            return Cog.remove({})
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .get(`${apiUrl}/cogs/test/test/test`)
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should get Cog by given author, repo and name', () => {
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
                .then((saved) => {
                    return chai.request(app).get(`${apiUrl}/cogs/${saved.author.username}/${saved.repo.name}/${saved.name}`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.author.should.have.property('name');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_repo');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('repo');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.links.github.should.have.property('repo');
                    res.body.results.links.github.should.have.property('_update');
                    res.body.results.should.have.property('repo');
                    res.body.results.repo.should.have.property('type');
                    res.body.results.repo.should.have.property('name');
                    res.body.results.should.have.property('description');
                    res.body.results.should.have.property('short');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                    res.body.results.should.have.property('updated_at');
                    res.body.results.should.have.property('votes');
                    res.body.results.should.have.property('voted');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('PUT /cogs/:author/:repoName/parse', () => {
        before(() => {
            return Cog.remove({})
                .then(() => {
                    return Repo.findOne({
                        'name': 'ORELS-Cogs',
                    })
                    .exec();
                })
                .then((repo) => {
                    if (!repo) {
                        return chai.request(app)
                            .post(`${apiUrl}/repos`)
                            .set('Service-Token', process.env.serviceToken)
                            .send({
                                'url': 'https://github.com/orels1/ORELS-Cogs',
                                'type': 'approved',
                            });
                    }

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
                    return cog.save();
                })
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should start parsing cogs for given repo', () => {
            return chai.request(app)
                .put(`${apiUrl}/cogs/orels1/ORELS-Cogs/parse`)
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

    describe('GET /cogs/:author/:repoName/:cogName/vote', () => {
        beforeEach(() => {
            return Cog.remove({})
                .then(() => {
                    return Vote.remove({});
                })
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
                    return Vote.remove({});
                })
                .then(() => {
                    return null;
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 404', () => {
            return chai.request(app)
                .get(`${apiUrl}/cogs/test/test/test/vote?choice=1`)
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(404);
                    err.response.body.error.should.equal('EntryNotFound');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should vote + 1 for a cog', () => {
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
                        .get(`${apiUrl}/cogs/orels1/ORELS-Cogs/dota/vote?choice=1`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.author.should.have.property('name');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_repo');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('repo');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.links.github.should.have.property('repo');
                    res.body.results.links.github.should.have.property('_update');
                    res.body.results.should.have.property('repo');
                    res.body.results.repo.should.have.property('type');
                    res.body.results.repo.should.have.property('name');
                    res.body.results.should.have.property('description');
                    res.body.results.should.have.property('short');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                    res.body.results.should.have.property('updated_at');
                    res.body.results.should.have.property('votes');
                    res.body.results.votes.should.equal(1);
                    res.body.results.should.have.property('voted');
                    res.body.results.voted.should.be.true;

                    return Vote.findOne({
                        'username': res.body.results.author.username,
                        'repo': res.body.results.repo.name,
                        'cog': res.body.results.name,
                    })
                    .exec();
                })
                .then((vote) => {
                    vote.IPs.should.be.an('array');
                    vote.IPs.should.have.lengthOf(1);
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('it should return 400', () => {
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
                    let vote = new Vote({
                        'username': 'orels1',
                        'repo': 'ORELS-Cogs',
                        'cog': 'dota',
                        'IPs': ['::ffff:127.0.0.1'],
                    });
                    return vote.save();
                })
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/cogs/orels1/ORELS-Cogs/dota/vote?choice=1`);
                })
                .then((res) => {
                    throw new Error('Error expected');
                })
                .catch((err) => {
                    err.should.have.status(400);
                    err.response.body.error.should.equal('AlreadyVoted');
                    err.response.body.should.have.property('error_details');
                });
        });

        it('it should vote - 1 for a cog', () => {
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
                'votes': 1,
            });
            return cog.save()
                .then(() => {
                    let vote = new Vote({
                        'username': 'orels1',
                        'repo': 'ORELS-Cogs',
                        'cog': 'dota',
                        'IPs': ['::ffff:127.0.0.1'],
                    });
                    return vote.save();
                })
                .then(() => {
                    return chai.request(app)
                        .get(`${apiUrl}/cogs/orels1/ORELS-Cogs/dota/vote?choice=0`);
                })
                .then((res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.false;
                    res.body.results.should.have.property('name');
                    res.body.results.should.have.property('author');
                    res.body.results.author.should.have.property('url');
                    res.body.results.author.should.have.property('username');
                    res.body.results.author.should.have.property('name');
                    res.body.results.should.have.property('links');
                    res.body.results.links.should.have.property('_self');
                    res.body.results.links.should.have.property('_update');
                    res.body.results.links.should.have.property('_repo');
                    res.body.results.links.should.have.property('self');
                    res.body.results.links.should.have.property('repo');
                    res.body.results.links.should.have.property('github');
                    res.body.results.links.github.should.have.property('self');
                    res.body.results.links.github.should.have.property('repo');
                    res.body.results.links.github.should.have.property('_update');
                    res.body.results.should.have.property('repo');
                    res.body.results.repo.should.have.property('type');
                    res.body.results.repo.should.have.property('name');
                    res.body.results.should.have.property('description');
                    res.body.results.should.have.property('short');
                    res.body.results.should.have.property('tags');
                    res.body.results.tags.should.be.an('array');
                    res.body.results.tags.should.have.lengthOf(0);
                    res.body.results.should.have.property('updated_at');
                    res.body.results.should.have.property('votes');
                    res.body.results.votes.should.equal(0);
                    res.body.results.should.have.property('voted');
                    res.body.results.voted.should.be.false;

                    return Vote.findOne({
                        'username': res.body.results.author.username,
                        'repo': res.body.results.repo.name,
                        'cog': res.body.results.name,
                    })
                        .exec();
                })
                .then((vote) => {
                    vote.IPs.should.be.an('array');
                    vote.IPs.should.have.lengthOf(0);
                })
                .catch((err) => {
                    throw err;
                });
        });
    });
});
